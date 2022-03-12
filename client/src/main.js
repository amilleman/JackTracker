import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import VueAxios from 'vue-axios';

// import _ from 'lodash';
import moment from 'moment';
Vue.prototype.moment = moment;

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './router'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//import fontawesome icons
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

//global components
import Success from '../src/components/shared/Success.vue'

Vue.component("success", Success);

Vue.filter("fromNow", value => moment(value).fromNow().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()));

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
