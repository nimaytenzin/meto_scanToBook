import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import VueFinalModal from 'vue-final-modal'
import { SetupCalendar, Calendar, DatePicker } from 'v-calendar';
import Toaster from "@meforma/vue-toaster";

import VCalendar from 'v-calendar';


createApp(App)
    .use(store)
    .use(router)
    .use(Toaster)
    .use(VCalendar, {})
    .use(VueFinalModal())
    .use(SetupCalendar, {})
    .component('Calendar', Calendar)
    .component('DatePicker', DatePicker)
    .mount('#app')
