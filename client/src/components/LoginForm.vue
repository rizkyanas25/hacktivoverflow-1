<template>
  <div>
    <div v-if="isRegister === false" class="q-pa-md" style="width: 350px">
      <p style="font-size:30px; margin-bottom:40px; margin-top:-70px">Login to <span style="font-family:HoffersScript; font-size:85px">FoxesFlow</span></p>
      <q-form
        @submit="onSubmitLogin"
        class="q-gutter-md"
      >

        <q-input
          filled
          v-model="loginUser.email"
          label="Your email"
          lazy-rules
          :rules="[
            val => val && val.length > 0 || 'Please type something',
            val => /\S+@\S+\.\S+/.test(val) || 'Not a valid email'
          ]"
        />

        <q-input v-model="loginUser.password" filled :type="isPwd ? 'password' : 'text'"
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

        <div class="row justify-between items-center">
          <q-btn label="Login" type="submit" color="orange"/>
          <a @click="isRegister = !isRegister" class="text-chocolate" style="cursor:pointer">Register</a>
        </div>
      </q-form>

    </div>

    <div v-if="isRegister === true" class="q-pa-md" style="width: 350px">
      <p style="font-size:30px; margin-bottom:40px; margin-top:-70px">Join <span style="font-family:HoffersScript; font-size:85px">FoxesFlow</span> now !</p>
      <q-form @submit="onSubmitRegister" class="q-gutter-md">
        <q-input
          filled
          v-model="newUser.name"
          label="Your name"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          v-model="newUser.email"
          label="Your email"
          hint="Enter a valid email"
          lazy-rules
          :rules="[
            val => val && val.length > 0 || 'Please type something',
            val => /\S+@\S+\.\S+/.test(val) || 'Not a valid email'
          ]"
        />

        <q-input v-model="newUser.password" filled :type="isPwd ? 'password' : 'text'"
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

        <q-toggle v-model="accept" label="I accept the terms" />
        <q-icon  @click="secondDialog = true" class="text-is-orange" name="more_horiz" style="cursor:pointer"/>

        <div class="row justify-between items-center">
          <q-btn label="Register" type="submit" color="orange"/>
          <a @click="isRegister = !isRegister" class="text-chocolate" style="cursor:pointer">Login</a>
        </div>
      </q-form>
    </div>

    <q-dialog v-model="secondDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-orange text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Terms</div>
        </q-card-section>

        <q-card-section>
          <p>
            You have to responsible to all your questions and answers.
          </p>
          <p>
            Feel free to help another users.
          </p>
          <h6 style="margin-top:-10px; margin-bottom:-10px">
            Let's Howl Together!!
          </h6>
          <small>Foxes Chief~</small>
        </q-card-section>

        <div style="text-align: right">
          <q-card-actions align="right" class="bg-orange text-white">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
export default {
  name: 'loginForm',
  data () {
    return {
      loginUser: {
        email: null,
        password: null
      },
      newUser: {
        name: null,
        email: null,
        password: null
      },
      accept: false,
      isPwd: true,
      isRegister: false,
      secondDialog: false
    }
  },
  methods: {
    onSubmitLogin () {
      console.log(this.loginUser)
      this.$store.dispatch('login', this.loginUser)
      this.$emit('closeModal')
    },
    onSubmitRegister () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'You need to accept the terms first'
        })
      } else {
        console.log(this.newUser)
        this.$store.dispatch('register', this.newUser)
        this.$emit('closeModal')
      }
    }
  }
}
</script>

<style>

</style>
