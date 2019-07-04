<template>
  <div>
    <q-chat-message
      v-if="sent === true"
      :name="job.company"
      :text="[job.title, 'Location: '+job.location]"
      sent
      bg-color="orange-3"
    >
      <a v-if="isLogin === true" target=”_blank”
      :href="job.url"
      style="color:cornsilk; text-decoration:none">Check out this job!</a>
      <a v-if="isLogin === false">But, you need to login first</a>
    </q-chat-message>
    <q-chat-message
      v-if="sent === false"
      target=”_blank”
      :href="job.url"
      :name="job.company"
      :text="[job.title, 'Location: '+job.location]"
      bg-color="orange-2"
    >
      <a v-if="isLogin === true" target=”_blank”
      :href="job.url"
      style="color:orange; text-decoration:none">Check out this job!</a>
      <a v-if="isLogin === false">But, you need to login first</a>
    </q-chat-message>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['job', 'index'],
  computed: {
    ...mapState(['isLogin']),
    sent () {
      if (this.index % 2 === 0) return true
      else return false
    }
  }
}
</script>

<style>

</style>
