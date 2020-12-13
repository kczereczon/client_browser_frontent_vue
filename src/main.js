import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'
import moment from 'moment'

import '@vuikit/theme'

Vue.config.productionTip = false

Vue.use(Vuikit)
Vue.use(VuikitIcons)

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY')
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
