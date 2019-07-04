<template>
  <div style="margin-bottom:0px;">
    <div class="row" style=" justify-content:space-between; align-items:center; margin-left:10%">
      <h5>All questions</h5>
      <q-toolbar class="bg-orange text-black rounded-borders" style="width:25%; height:40px; margin-right:11%">
        <q-input dark borderless v-model="text" input-class="text-right">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
      </q-toolbar>
    </div>
    <q-page class="row" style="overflow-y:scroll; height:420px; min-height:485px !important">
      <QuestionCard v-for="(question, i) in questions" :key="i" :question="question"/>
    </q-page>
  </div>
</template>

<style>
</style>

<script>
import { mapState } from 'vuex'
import QuestionCard from '@/components/QuestionCard.vue'

export default {
  name: 'PageHome',
  components: {
    QuestionCard
  },
  data () {
    return {
      text: ''
    }
  },
  computed: {
    ...mapState(['questions'])
  }
}
</script>
