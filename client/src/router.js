import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home.vue'
import AskQuestion from './views/Ask-Question.vue'
import Tags from './views/Tags.vue'
import Users from './views/Users.vue'
import Detail from './views/Detail.vue'
import UpdateQuestion from './views/Update-Question.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/ask-question',
          name: 'ask-question',
          component: AskQuestion,
          beforeEnter: (to, from, next) => {
            if (!localStorage.token) next('/')
            else next()
          }
        },
        {
          path: '/tags',
          name: 'tags',
          component: Tags
        },
        {
          path: '/users',
          name: 'users',
          component: Users,
          beforeEnter: (to, from, next) => {
            if (!localStorage.token) next('/')
            else next()
          }
        },
        {
          path: '/questions/:questionId',
          name: 'question',
          component: Detail
        },
        {
          path: '/questions/:questionId/edit',
          name: 'question-edit',
          component: UpdateQuestion
        }
      ]
    }
  ]
})
