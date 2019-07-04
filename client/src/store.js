import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/assets/api/axios'
import { Notify } from 'quasar'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {},
    jobs: [],
    questions: [],
    question: {
      tags: [],
      voteDown: [],
      voteUp: []
    },
    answers: [],
    answer: {},
    existingTags: [],
    loading: true
  },
  mutations: {
    isLoggedIn (state) {
      if (localStorage.token) {
        state.isLogin = true
      } else {
        state.isLogin = false
      }
    },
    setUserData (state, user) {
      state.user = user
    },
    setJobs (state, jobs) {
      state.jobs = jobs
    },
    setQuestions (state, questions) {
      state.questions = questions
    },
    setQuestion (state, question) {
      state.question = question
      console.log(state.question)
    },
    setLoading (state) {
      state.loading = false
    },
    setAnswers (state, answers) {
      state.answers = answers
    },
    setTags (state, tags) {
      state.existingTags = tags
    },
    errorPopup (state, message) {
      Notify.create({
        color: 'red',
        position: 'top',
        textColor: 'white',
        timeout: 2000,
        message: message
      })
    }
  },
  actions: {
    login ({ commit, dispatch }, payload) {
      axios.post('/login', payload)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          commit('isLoggedIn')
          dispatch('getUserData')
        })
        .catch(err => {
          commit('errorPopup', err.response.data)
        })
    },
    register ({ commit, dispatch }, payload) {
      axios.post('/register', payload)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          Notify.create({
            color: 'green-4',
            position: 'top',
            textColor: 'white',
            timeout: 2500,
            message: `Register Success ! Login to meet up with another foxes !`
          })
        })
        .catch(err => {
          commit('errorPopup', err.response.data)
        })
    },
    getUserData ({ commit, dispatch }) {
      if (localStorage.token) {
        axios.get('/users', { headers: { token: localStorage.token } })
          .then(({ data }) => {
            commit('setUserData', data)
            Notify.create({
              color: 'green-4',
              position: 'top',
              textColor: 'white',
              timeout: 2000,
              message: `Welcome, ${data.name}`
            })
          })
          .catch(err => {
            commit('errorPopup', err.response.data)
          })
      }
    },
    getJobs ({ commit, dispatch }) {
      axios.get('/jobs')
        .then(({ data }) => {
          commit('setJobs', data)
          commit('setLoading')
        })
        .catch(err => {
          commit('errorPopup', err.response.data)
        })
    },
    getQuestions ({ commit, dispatch }) {
      axios.get('/questions')
        .then(({ data }) => {
          commit('setQuestions', data)
        })
        .catch(err => {
          commit('errorPopup', err.response.data)
        })
    },
    getQuestion ({ commit, dispatch }, id) {
      if (id) {
        axios.get(`/questions/${id}`)
          .then(({ data }) => {
            console.log('triggered')
            commit('setQuestion', data)
          })
          .catch(err => {
            commit('errorPopup', err.response.data)
          })
      }
    },
    createQuestion ({ commit, dispatch }, newQuestion) {
      axios.post('/questions', newQuestion, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          console.log(data)
          dispatch('getQuestions')
        })
        .catch(err => {
          commit('errorPopup', err.response.data)
        })
    },
    getAnswers ({ commit, dispatch }, questionId) {
      if (questionId) {
        axios.get(`/questions/${questionId}/answers`, {}, { headers: { token: localStorage.token } })
          .then(({ data }) => {
            console.log(data)
            commit('setAnswers', data)
          })
          .catch(err => {
            commit('errorPopup', err.response.data)
          })
      }
    },
    createAnswer ({ commit, dispatch }, payload) {
      axios.post(`/questions/${payload.questionId}/answers`, payload.newAnswer, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          console.log(data)
          dispatch('getAnswers', payload.questionId)
        })
        .catch(err => {
          commit('errorPopup', err.response.data)
        })
    },
    getTags ({ commit, dispatch }) {
      axios.get('/questions/tags')
        .then(({ data }) => {
          console.log(data)
          commit('setTags', data)
        })
        .catch(err => {
          commit('errorPopup', err.response.data)
        })
    }
  }
})
