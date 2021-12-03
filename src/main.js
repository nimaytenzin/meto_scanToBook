import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import VueFinalModal from 'vue-final-modal'
import { SetupCalendar, Calendar, DatePicker } from 'v-calendar';
import Toaster from "@meforma/vue-toaster";
import VueNumber from 'vue-number-animation'
import VueTilt from 'vue-tilt.js'
import VCalendar from 'v-calendar';
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'


import VueLoading from 'vue-loading-overlay';

createApp(App)
    .use(store)
    .use(router)
    .use(Toaster)
    .use(VueLoading)
    .use(VCalendar, {})
    .use(VueFinalModal())
    .use(SetupCalendar, {})
    .use(VueTilt)
    .use(VueNumber)
    .use(VueChartkick)
    .component('Calendar', Calendar)
    .component('DatePicker', DatePicker)
    .mount('#app')
