import Vue from 'vue'
import VueResourse from 'vue-resource'
import App from './App.vue'
import store from './store'
import * as docx from 'docx'

Vue.config.productionTip = false
Vue.use(VueResourse)
Vue.use(docx)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
