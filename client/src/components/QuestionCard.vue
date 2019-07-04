<template>
  <div class="row" style="margin-bottom: 20px; margin-left:10%">
    <q-card flat bordered class="my-card row justify-center" style="width:90%">
      <div style="margin-top:10px">

        <q-card-section @click="toDetail" style="cursor:pointer">
          <h5 style="margin-top:-15px">
            {{question.title}}
          </h5>
        </q-card-section>

        <q-separator/>

        <q-card-section class="row justify-between">
          <div>
            <q-chip v-for="tag in question.tags" :key="tag" dense clickable icon="label">{{tag}}</q-chip>
          </div>
          <div>
            <q-chip class="bg-amber-2" icon="thumb_up_alt">{{question.voteUp.length - question.voteDown.length}}</q-chip>
            <q-chip class="bg-yellow-2" icon="remove_red_eyes">0</q-chip>
            <q-chip class="bg-lime-2" icon="comment">0</q-chip>
          </div>
        <q-avatar rounded>
          <img :src="question.userId.profilePic">
        </q-avatar>
        </q-card-section>
        <div class="column items-end">
          <p style="margin-top:-20px">asked by: {{question.userId.name}}</p>
          <small style="margin-top:-15px">asked: {{question.createdAt | moment("from", "now")}}</small>        
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ['question'],
  data () {
    return {

    }
  },
  methods: {
    toDetail () {
      this.$store.dispatch('getQuestion', this.question._id)
      this.$store.dispatch('getAnswers', this.question._id)
      this.$router.push(`/questions/${this.question._id}`)
    }
  }
}
</script>

<style>

</style>
