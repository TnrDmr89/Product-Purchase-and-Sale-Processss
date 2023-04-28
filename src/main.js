import Vue from 'vue'
import App from './App.vue'
import VueResource from "vue-resource"
import { router } from './router'
import { store } from './assets/store/store';

Vue.use(VueResource);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
