import Diapers from './views/Diapers.vue'
import DiaperDetails from './views/Diapers/Details.vue'
import Home from './views/Home.vue'
import Naps from './views/Naps.vue'
import Feeds from './views/Feeds.vue'
import FeedDetails from './views/Feeds/Details.vue'
import Meds from './views/Meds.vue'
import Reports from './views/Reports.vue'
import Pictures from './views/Pictures.vue'
import Vue from 'vue'

import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dirty-diapers',
    name: 'Diapers',
    component: Diapers
  },
  {
    path: '/diaper-details',
    name: 'Diapers-Details',
    component: DiaperDetails,
    props: true
  },
  {
    path: '/feeds',
    name: 'Feeds',
    component: Feeds
  },
  {
    path: '/feed-details',
    name: 'Feeds-Details',
    component: FeedDetails,
    props: true
  },
  {
    path: '/sick-jack',
    name: 'Meds',
    component: Meds
  },
  {
    path: '/sleepy-jack',
    name: 'Naps',
    component: Naps
  },
  {
    path: '/jack-reports',
    name: 'Reports',
    component: Reports
  },
  {
    path: '/cute-pictures',
    name: 'Pictures',
    component: Pictures
  }
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
  routes
})

export default router