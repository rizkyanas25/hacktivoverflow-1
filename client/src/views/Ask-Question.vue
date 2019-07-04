<template>
  <div class="row justify-center">
    <div class="col-7">
      <div class="column items-center" style="margin-bottom:-50px">
        <h4>Ask a question ?</h4>
      </div>
      <questionForm />
    </div>
  </div>
</template>

<script>
import questionForm from '@/components/QuestionForm.vue'
export default {
  components: {
    questionForm
  }
}
</script>

<style>

</style>
