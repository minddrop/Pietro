import Vue from 'vue'
import Router from 'vue-router'
import hello from './Hello'
import home from './Home'
import slackOauth from './SlackOauth'
import notFound from './NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/hello',
      name: 'Hello',
      component: hello
    },
    {
      path: '/oauth',
      name: 'SlackOauth',
      component: slackOauth
    },
    {
      path: '*',
      name: 'NotFound',
      component: notFound
    }
  ]
})
