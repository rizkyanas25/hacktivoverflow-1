<template>
  <div class="row justify-center" style="margin-top:50px">
    <h5 style="margin-top:-20px">
      All tags in Foxesflow questions
    </h5>
    <div class="row" style=" justify-content:space-around; align-items:center; width:80%">
      <q-chip v-for="(tag, i) in tags" :key="i" clickable>
        <q-avatar color="orange" text-color="white">{{i}}</q-avatar>{{tag}}
      </q-chip>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['existingTags']),
    tags () {
      let tags = this.existingTags.map(tag => {
        return tag.value
      })
      return tags
    }
  }
}
</script>

<style>

</style>
