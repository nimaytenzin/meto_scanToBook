import * as Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import VueFinalModal from 'vue-final-modal'
import { SetupCalendar, Calendar, DatePicker } from 'v-calendar';
import Toaster from "@meforma/vue-toaster";
import VueNumber from 'vue-number-animation'
import VCalendar from 'v-calendar';

import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

Vue.createApp(App)
    .use(store)
    .use(router)
    .use(Toaster)
    .use(VueChartkick)
    .use(VCalendar, {})
    .use(VueFinalModal())
    .use(SetupCalendar, {})
    .use(VueNumber)
    .component('Calendar', Calendar)
    .component('DatePicker', DatePicker)
    .mount('#app')
