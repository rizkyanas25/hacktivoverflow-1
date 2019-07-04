<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-orange">
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu" />

        <q-toolbar-title @click="$router.push('/')">
          <q-img
            src="https://cdn1.iconfinder.com/data/icons/animal-face/512/fox-512.png"
            style="height: 40px; max-width: 40px; margin-top:-15px"
          ></q-img>
          <span style="font-size:30px; cursor:pointer;font-size:60px; display:inline-block; margin-top: -20px; margin-bottom: -10px; font-family:HoffersScript">FoxesFlow</span>
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer style="width:250px" v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <div v-if="isLogin === true" class="column items-center" style="width:100%; margin-top:5px; margin-bottom:10px">
          <q-item>
            <q-avatar size="100px">
              <img :src="user.profilePic" style="object-fit: cover"/>
            </q-avatar>
          </q-item>

          <q-item-label header>Hello, {{user.name}}</q-item-label>

          <q-item>
           <q-btn to="/ask-question" size="sm" color="orange" icon="chat" label="Ask a question" />
          </q-item>
          <q-item>
           <q-btn @click="logout" size="sm" color="red" icon="" label="Logout" />
          </q-item>
        </div>

        <q-separator />

        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="chat_bubble" />
          </q-item-section>
          <q-item-section>
            <q-item-label>All Questions</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/tags" exact>
          <q-item-section avatar>
            <q-icon name="local_offer" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tags</q-item-label>
            <q-item-label caption>List of tags embedded</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <div v-if="isLogin === true" class="row justify-around" style="width:100%; margin-top:20px; margin-bottom:20px">
          <q-item>
            <span style="cursor:default">My Watched Tags</span>
          </q-item>

          <q-list  v-if="editTags === false" style="overflow-y:scroll; height:100px; width:85%">
            <q-chip v-for="(tag, i) in user.watchedTags" :key="i" dense clickable icon="loyalty">{{tag.value}}</q-chip>
          </q-list>
          <tags-input
            v-if="editTags"
            element-id="tags"
            v-model="user.watchedTags"
            @tag-added="onTagAdded"
            :existing-tags="existingTags"
            :typeahead="true">
          </tags-input>
          <q-item>
            <div class="column" style="width:100px; text-align:center">
              <q-btn v-if="editTags === false" @click="editTags = !editTags" style="cursor:pointer">edit</q-btn>
              <q-btn v-if="editTags" @click="saveTags" style="cursor:pointer">save</q-btn>
              <q-btn v-if="editTags" @click="editTags = !editTags" style="cursor:pointer">back</q-btn>
            </div>
          </q-item>

        </div>

        <div v-if="isLogin === false" class="column justify-around" style="width:20%; height:100px; margin-top:20px; margin-left:35%">
           <q-btn @click="dialog = true" size="md" color="orange" icon="" label="Login or Register"/>
        </div>
      </q-list>
    </q-drawer>

    <q-drawer v-model="right" side="right" bordered>
      <div style="text-align:center; margin-top:-30px;">
        <h6>Looking for a job ?</h6>
        <q-separator style="margin-top:-25px"/>
      </div>
      <div class="bg-white" style="height:400px">
        <div class="q-pa-md row justify-center">
          <div style="width: 100%; max-width: 400px">
            <div v-if="loading === true" style="text-align:center; margin-top:70px">
              <q-spinner-cube
                color="orange"
                size="5.5em"
              />
            </div>
            <JobCard v-for="(job, index) in jobs" :key="index" :job="job" :index="index" />
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white text-orange">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="row justify-center" style="margin-top:50px">
          <img src="@/assets/fox1.jpg" alt="" style="height:460px">
          <LoginForm v-on:closeModal="closeModal" />
        </q-card-section>

      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex'
import LoginForm from '@/components/LoginForm.vue'
import VoerroTagsInput from '@voerro/vue-tagsinput'
import JobCard from '@/components/JobCard.vue'
import axios from '@/assets/api/axios.js'

export default {
  name: 'LayoutDefault',
  components: {
    LoginForm,
    'tags-input': VoerroTagsInput,
    JobCard
  },
  data () {
    return {
      leftDrawerOpen: false,
      right: true,
      dialog: false,
      maximizedToggle: true,
      editTags: false
    }
  },
  methods: {
    onTagAdded(slug){
      console.log(slug.value)
    },
    logout () {
      this.$q.dialog({
        message: 'Wanna go ?',
        cancel: {
          push: true,
          color: 'negative'
        },
        ok: {
          push: true
        },
        persistent: true
      }).onOk(() => {
        console.log('>>>> Gotta go')
        this.$q.notify({
          color: 'green-4',
          position: 'top',
          textColor: 'white',
          message: `See you soon ${this.$store.state.user.name}`
        })
        localStorage.removeItem('token')
        this.$store.commit('isLoggedIn')
      }).onCancel(() => {
        console.log('>>>> Cancel')
      }).onDismiss(() => {
        console.log('I am triggered on both OK and Cancel')
      })
    },
    closeModal () {
      this.dialog = false
    },
    watchedTags () {
      console.log(this.user.watchedTags)
    },
    saveTags () {
      axios.patch('/users', {tags: this.user.watchedTags}, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          console.log(data)
          this.$q.notify({
          color: 'green-4',
          position: 'left',
          timeout: 2000,
          textColor: 'white',
          message: `Watched Tag Updated`
        })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapState(['isLogin', 'user', 'jobs', 'loading', 'existingTags'])

  },
  created () {
    this.$store.commit('isLoggedIn')
    this.$store.dispatch('getUserData')
    this.$store.dispatch('getJobs')
    this.$store.dispatch('getTags')
    this.$store.dispatch('getQuestions')
    console.log(this.$route.params)
    this.$store.dispatch('getQuestion', this.$route.params.questionId)
    this.$store.dispatch('getAnswers', this.$route.params.questionId)
  }
}
</script>
