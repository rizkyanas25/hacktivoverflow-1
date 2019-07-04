<template>
  <div>
    <p>{{answer.userId.name}} at {{answer.createdAt | moment("from", "now")}}</p>
    <div class="row justify-between">
      <q-avatar rounded>
        <img :src="answer.userId.profilePic">
      </q-avatar>
      <p style="width:75%">
        <span v-html="answer.content"></span>
      </p>
      <div class="column items-center" style="margin-top:-15px; margin-bottom:-20px">
        <q-icon @click="upVoteAnswer" name="expand_less" style="cursor: pointer; font-size:30px"/>
        <p style="font-size:20px">{{answer.voteUp.length - answer.voteDown.length}}</p>
        <q-icon @click="downVoteAnswer" name="expand_more" style="cursor: pointer; font-size:30px; margin-top:-20px"/>
      </div>
    </div>
    <q-separator style="margin-top:20px; margin-bottom:30px"/>
  </div>
</template>

<script>
import axios from '@/assets/api/axios.js'
export default {
  props: ['answer'],
  methods: {
    upVoteAnswer () {
      axios.patch(`/questions/${this.$route.params.questionId}/answers/${this.answer._id}/upvote`, {}, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          this.$store.dispatch('getAnswers', this.$route.params.questionId)
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    downVoteAnswer () {
      axios.patch(`/questions/${this.$route.params.questionId}/answers/${this.answer._id}/downvote`, {}, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          this.$store.dispatch('getAnswers', this.$route.params.questionId)
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
