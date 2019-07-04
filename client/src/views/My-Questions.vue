<template>
  <div style="margin-bottom:50px">
    <div class="row" style=" justify-content:space-between; align-items:center; margin-left:10%">
      <h5>My questions</h5>
      <q-toolbar class="bg-orange text-black rounded-borders" style="width:25%; height:40px; margin-right:11%">
        <q-input dark borderless v-model="text" input-class="text-right">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
      </q-toolbar>
    </div>
    <q-page class="row justify-center" style="overflow-y:scroll; height:500px">
      <QuestionCard v-for="i in 5" :key="i"/>
    </q-page>
  </div>
</template>

<style>
</style>

<script>
import QuestionCard from '@/components/QuestionCard.vue'
export default {
  name: 'MyQuestion',
  data () {
    return {
      text: ''
    }
  },
  components: {
    QuestionCard
  }
}
</script>
