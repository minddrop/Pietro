import Vue from 'vue'
import Router from 'vue-router'
import hello from './components/Hello'
import home from './components/Home'
import slackOauth from './components/SlackOauth'
import notFound from './components/NotFound'

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
