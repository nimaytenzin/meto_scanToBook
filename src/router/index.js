import { createRouter, createWebHistory } from 'vue-router'
import {verfiyToken} from '../services/authServices'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/login',
   
    component: () => import('../views/Login.vue')
  },{
    path:'/service-down',
    component:()=>import('../views/ServiceDown.vue')
  },
  {
    path: '/policy/privacy',
    component: () => import('../views/PrivacyPolicy.vue')
  },
  {
    path: '/policy/refund',
    component: () => import('../views/RefundPolicy.vue')
  },
  {
    path: '/busDetails/:id',
    name:'viewBusDetails',
    component: () => import('../components/ScanToBookComponents/ViewBus.vue')
  },
  {
    path: '/cancel-ticket/:bookingId',
    name:'cancelTicket',
    component: () => import('../components/ScanToBookComponents/CancelTicket.vue')
  },
  {
    path: '/book',
    name: 'Book',
    component: () => import('../views/ScanToBook.vue'),
    children: [
      {
        path: '', component: () => import('../components/ScanToBookComponents/Origin.vue')
      },
      {
        path: 'destination', component: () => import('../components/ScanToBookComponents/Destination.vue')
      },
      {
        path: 'date', component: () => import('../components/ScanToBookComponents/Date.vue')
      },
      {
        path: 'buses', component: () => import('../components/ScanToBookComponents/Buses.vue')
      },
      {
        path: 'seats', component: () => import('../components/ScanToBookComponents/Seats.vue')
      },
      {
        path: 'bookings', component: () => import('../components/ScanToBookComponents/Bookings.vue')
      },
      {
        path: 'loadPayment', component: () => import('../components/ScanToBookComponents/LoadPayment.vue')
      },
      {
        path: 'eticket/:bookingId', component: () => import('../components/ScanToBookComponents/ETicket.vue')
      },
      {
        path: 'failticket/:bookingId',component:()=>  import('../components/ScanToBookComponents/FailTicket.vue')
      },
      {
        path: 'cancelticket',component:()=>  import('../components/ScanToBookComponents/CancelPayment.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    children: [
      {
        path: '', component: () => import('../components/Admin/Index.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'manage-buses', component: () => import('../components/Admin/ManageBuses.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'manage-routes', component: () => import('../components/Admin/ManageRoutes.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'schedules', component: () => import('../components/Admin/Schedule.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'ticket-cancellations', component: () => import('../components/Admin/Cancellations.vue'), meta: { requiresAuth: true }
      },
      // {
      //   path: 'view-passengers/:scheduleId', component: () => import('../components/Admin/ViewPassengers.vue'), meta: { requiresAuth: true }
      // },
      // {
      //   path: 'transfer-passengers/:scheduleId', component: () => import('../components/Admin/TransferPassenger.vue'), meta: { requiresAuth: true }
      // },
      {
        path: 'feedbacks', component: () => import('../components/Admin/Feedbacks.vue'), meta: { requiresAuth: true }
      }

    ]
  },
  {
    path: '/finance',
    name: 'FinanceAdmin',
    component: () => import('../views/FinanceAdmin.vue'),
    children: [
      {
        path:'',component:()=>import('../components/FinanceAdmin/Today.vue'), meta:{ requiresAuth:true }
      },
      {
        path: 'monthly', component: () => import('../components/FinanceAdmin/Monthly.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'booking-data', component: () => import('../components/FinanceAdmin/BookingData.vue'), meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/staff',
    name: 'Staff',
    component: () => import('../views/Staff.vue'),
    children: [
      {
        path: '', component: () => import('../components/Staff/BookTicket.vue'),
       meta: { requiresAuth: true },
        children: [
          { path: '', component: () => import('../components/Staff/bookTicket/Route.vue'), meta: { requiresAuth: true } },
          { path: 'ticket/:bookingId', component: () => import('../components/Staff/bookTicket/ETicket.vue'), meta: { requiresAuth: true } }
        ]
      },
      // {
      //   path: 'view-cancellations', component: () => import('../components/Staff/Cancellations.vue'), meta: { requiresAuth: true }
      // }
    ]
  }

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach(async(to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    let verified = await verfiyToken();
    if(verified){
      next();
    }else{
      sessionStorage.clear("token")
      next({path:'/login'})
    }
  }else{
    next();
  }
  
});

export default router
