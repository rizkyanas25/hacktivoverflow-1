<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Your name"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="email"
        label="Your email"
        hint="Enter a valid email"
        lazy-rules
        :rules="[
          val => val && val.length > 0 || 'Please type something',
          val => /\S+@\S+\.\S+/.test(val) || 'Not a valid email'
        ]"
      />

      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'"
        label="Your password *"
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Please type your password']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Register" type="submit" color="orange"/>
      </div>
    </q-form>

  </div>
</template>

<script>
export default {
  name: 'registerForm',
  data () {
    return {
      name: null,
      email: null,
      password: null,
      isPwd: true,
      accept: false
    }
  },
  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Submitted'
        })
      }
    }
  }
}
</script>

<style>

</style>
