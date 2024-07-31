import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import Carousel3d from 'vue-carousel-3d';

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Carousel3d);
Vue.use(Vuetify);

const vuetify = new Vuetify();
new Vue({
  vuetify,
  router,
  render: (h) => h(App)
}).$mount('#app')
