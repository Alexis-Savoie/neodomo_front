import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  created() {
    // Prevent blank screen in Electron builds
    this.$router.push('/')
  },
  render: h => h(App)
}).$mount('#app')


