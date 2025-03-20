import Vue from 'vue'
import App from './App.vue'
import router from './router';
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import store from './store';

Vue.config.productionTip = false
Vue.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 2000,  
})



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

