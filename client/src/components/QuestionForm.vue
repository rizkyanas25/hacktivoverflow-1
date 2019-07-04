<template>
  <div class="q-pa-md q-gutter-sm">
    <q-input v-model="title" placeholder="Title..." style="font-size:20px"/>
    <q-editor v-model="content" min-height="7rem"/>
    <tags-input element-id="tags"
      v-model="selectedTags"
      :existing-tags="existingTags"
      :typeahead="true">
    </tags-input>
    <div class="column items-center">
      <q-btn @click="ask" color="orange" icon-right="chat" label="Ask !"/>
    </div>
  </div>
</template>

<script>
import VoerroTagsInput from '@voerro/vue-tagsinput'
import { mapState } from 'vuex'
export default {
  components: {
    'tags-input': VoerroTagsInput
  },
  data () {
    return {
      title: '',
      content: '',
      selectedTags: []
    }
  },
  methods: {
    ask () {
      let newQuestion = {
        title: this.title,
        content: this.content,
        tags: this.tags
      }
      this.$store.dispatch('createQuestion', newQuestion)
        .then(() => {
          this.$store.dispatch('getTags')
          this.$router.push('/')
        })
    }
  },
  computed: {
    ...mapState(['existingTags']),
    tags () {
      let tags = this.selectedTags.map(tag => {
        return tag.value
      })
      return tags
    }
  }
}
</script>

<style>

</style>
