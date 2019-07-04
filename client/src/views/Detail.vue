<template>
  <div class="row justify-center" style="margin-top:-10px; margin-bottom:50px">
    <div style="width:70%">
      <div class="row justify-between">
        <h5 style="margin-bottom:10px; width:75%">{{question.title}}
        </h5>
        <div class="column items-center" style="margin-top:30px; margin-bottom:-20px">
          <q-icon @click="upVoteQuestion" name="expand_less" style="cursor: pointer; font-size:50px"/>
          <p style="font-size:30px">{{vote}}</p>
          <q-icon @click="downVoteQuestion" name="expand_more" style="cursor: pointer; font-size:50px; margin-top:-20px"/>
        </div>
        <div>
          <p style="margin-bottom:-7px">asked by: {{question.userId.name}}</p>
          <small>{{ question.createdAt | moment('from', 'now')}}</small>
        </div>
        
      </div>
      <q-chip v-for="(tag, i) in question.tags" :key="i" dense clickable icon="label">{{tag}}</q-chip>
      <q-separator style="margin-top:10px; margin-bottom:10px"/>
      <p><span v-html="question.content"></span></p>
      <q-separator style="margin-top:10px; margin-bottom:10px"/>

      <div v-if="check" class="row justify-between" style="width:200px">
        <q-btn @click="toEdit" outline color="orange" label="Update" />
        <q-btn @click="deleteQ" outline color="red" label="Delete" />
      </div>

      <h5 style="margin-bottom:0px">{{answers.length}} Answer<span v-if="answers.length > 1">s</span></h5>
      <q-separator style="margin-top:10px; margin-bottom:25px"/>

      <q-card v-if="answers.length === 0" class="my-card">
        <q-card-section class="bg-orange text-white">
          <div class="text-h6">There is no answer yet, submit yours!</div>
        </q-card-section>
      </q-card>

      <AnswerCard v-for="answer in answers" :key="answer._id" :answer="answer"/>

      <div v-if="isLogin === true">
        <h5 style="margin-bottom:10px">Your answer</h5>
        <q-editor v-model="content" min-height="7rem" />
        <div style="text-align:center">
          <q-btn @click="addAnswer" outline color="orange" label="Answer!" style="margin-top:20px" />
        </div>
      </div>

      <div v-if="isLogin === false">
        <h5 style="margin-bottom:10px">Your answer</h5>
        <q-editor v-model="content" disable min-height="7rem" />
        <div style="text-align:center">
          <q-btn disable="" outline color="orange" label="Login First!" style="margin-top:20px" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from '@/assets/api/axios.js'
import AnswerCard from '@/components/AnswerCard.vue'
export default {
  components: {
    AnswerCard
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    addAnswer () {
      console.log(this.content)
      this.$store.dispatch('createAnswer', { questionId: this.question._id, newAnswer: { content: this.content } })
      this.$store.dispatch('getAnswers', this.question._id)
      this.content = ''
    },
    upVoteQuestion () {
      axios.patch(`/questions/${this.question._id}/upvote`, {}, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          this.$store.dispatch('getQuestion', this.question._id)
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    downVoteQuestion () {
      axios.patch(`/questions/${this.question._id}/downvote`, {}, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          this.$store.dispatch('getQuestion', this.question._id)
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    toEdit () {
      this.$store.dispatch('getQuestion', this.question._id)
      this.$router.push(`/questions/${this.question._id}/edit`)
    },
    deleteQ () {
      this.$q.dialog({
        message: 'Would you like to delete this questions?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        console.log('>>>> OK')
        axios.delete(`/questions/${this.$route.params.questionId}`, { headers: { token: localStorage.token } })
          .then(({ data }) => {
            console.log(data)
            this.$store.dispatch('getQuestions')
            this.$store.dispatch('getTags')
            this.$router.push('/')
          })
          .catch(err => {
            console.log(err)
          })
      }).onOk(() => {
        console.log('>>>> second OK catcher')
      }).onCancel(() => {
        console.log('>>>> Cancel')
      }).onDismiss(() => {
        console.log('I am triggered on both OK and Cancel')
      })
    },
  },
  computed: {
    ...mapState(['question', 'answers', 'isLogin', 'user']),
    vote () {
      return this.question.voteUp.length - this.question.voteDown.length
    },
    check() {
      if (this.question.userId.email === this.user.email) return true
      else return false
    }
  }
}
</script>

<style>

</style>
