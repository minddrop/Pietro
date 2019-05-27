import Vue from 'vue'
import router from './components/router'
import App from './App'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
