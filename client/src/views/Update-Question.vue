<template>
  <div class="row justify-center">
    <div class="col-7">
      <div class="column items-center" style="margin-bottom:-50px">
        <h4>Edit your question</h4>
      </div>
      <div class="q-pa-md q-gutter-sm">
        <q-input v-model="question.title" placeholder="Title..." style="font-size:20px"/>
        <q-editor v-model="question.content" min-height="7rem"/>
        <tags-input element-id="tags"
          v-model="question.Tags"
          :existing-tags="existingTags"
          :typeahead="true">
        </tags-input>
        <div class="column items-center">
          <q-btn @click="update" color="orange" icon-right="chat" label="Update !"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VoerroTagsInput from '@voerro/vue-tagsinput'
import axios from '@/assets/api/axios.js'
export default {
  components: {
    'tags-input': VoerroTagsInput
  },
  computed: {
    ...mapState(['question'])
  },
  methods: {
    update () {
      axios.patch(`/questions/${this.$route.params.questionId}`, this.question, { headers: {token: localStorage.token } })
        .then(({ data }) => {
          console.log(data)
          this.$router.push('/')
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
