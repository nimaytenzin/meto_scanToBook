import { createRouter, createWebHistory } from 'vue-router'
import { verfiyToken } from '../services/authServices'
import VueJwtDecode from "vue-jwt-decode";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/buses',
    name: 'Buses',
    component: () => import('../views/Buses.vue')
  },
  {
    path: '/selectseats',
    name: 'SeatSelection',
    component: () => import('../views/Seats.vue')
  },
  {
    path: '/passengerDetails',
    name: 'PassengerDeails',
    component: () => import('../views/PassengerDetails.vue')
  },
  {
    path: '/login',

    component: () => import('../views/Login.vue')
  }, {
    path: '/service-down',
    component: () => import('../views/ServiceDown.vue')
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
    name: 'viewBusDetails',
    component: () => import('../components/ScanToBookComponents/ViewBus.vue')
  },
  {
    path: '/cancel-ticket/:bookingId',
    name: 'cancelTicket',
    component: () => import('../components/ScanToBookComponents/CancelTicket.vue')
  },

  {
    path: '/404', name: 'NotFound', component: () => import('../views/404.vue')
  },
  {
    path: '/:catchAll(.*)', redirect: '404'
  },
  {
    path: '/eticket/:bookingId', component: () => import('../views/ETicket.vue')
  },
  {
    path: '/unathorized',
    name: 'unathorized',
    component: () => import('../views/Unathorized.vue')
  },
  {
    path: '/loadpayment',
    name: 'unathorized',
    component: () => import('../views/LoadPayment.vue')
  },
  {
    path: '/book',
    name: 'Book',
    component: () => import('../views/Index.vue'),
    children: [
      
      // {
      //   path: 'destination', component: () => import('../components/ScanToBookComponents/Destination.vue')
      // },
      // {
      //   path: 'date', component: () => import('../components/ScanToBookComponents/Date.vue')
      // },
      // {
      //   path: 'buses', component: () => import('../components/ScanToBookComponents/Buses.vue')
      // },
      // {
      //   path: 'seats', component: () => import('../components/ScanToBookComponents/Seats.vue')
      // },
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
        // path: 'eticket/cancel/:bookingId', component: () => import('../components/ScanToBookComponents/ETicket.vue')
        path: 'eticket/cancel/:bookingId', component: () => import('../components/ScanToBookComponents/CancelTicket.vue')
      },
      {
        // path: 'eticket/cancel/:bookingId', component: () => import('../components/ScanToBookComponents/ETicket.vue')
        path: 'eticket/detail/:bookingId', component: () => import('../components/ScanToBookComponents/CancelDetail.vue')
      },
      {
        path: 'failticket/:bookingId', component: () => import('../components/ScanToBookComponents/FailTicket.vue')
      },
      {
        path: 'cancelpayment/:bookingId', component: () => import('../components/ScanToBookComponents/CancelPayment.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    children: [
      {
        path: '', component: () => import('../components/Admin/Today.vue'), meta: { requiresAuth: true, scheduleAdmin: true }
      },
      {
        path: 'manage-buses', component: () => import('../components/Admin/ManageBuses.vue'), meta: { requiresAuth: true, scheduleAdmin: true }
      },
      {
        path: 'manage-routes', component: () => import('../components/Admin/ManageRoutes.vue'), meta: { requiresAuth: true, scheduleAdmin: true }
      },
      {
        path: 'schedules', component: () => import('../components/Admin/SchedulePro.vue'), meta: { requiresAuth: true, scheduleAdmin: true }
      },
      {
        path: 'bookings', component: () => import('../components/Admin/Bookings.vue'), meta: { requiresAuth: true, scheduleAdmin: true }
      },
      {
        path: 'challan', component: () => import('../components/Admin/Challan.vue'), meta: { requiresAuth: true, scheduleAdmin: true }
      },
      {
        path: 'cancelled-bus', component: () => import('../components/Admin/CancelledBus.vue'), meta: { requiresAuth: true, scheduleAdmin: true }
      },
      {
        path: 'ticket-cancellations', component: () => import('../components/Admin/Cancellations.vue'), meta: { requiresAuth: true, scheduleAdmin: true }
      },
      // {
      //   path: 'view-passengers/:scheduleId', component: () => import('../components/Admin/ViewPassengers.vue'), meta: { requiresAuth: true }
      // },
      // {
      //   path: 'transfer-passengers/:scheduleId', component: () => import('../components/Admin/TransferPassenger.vue'), meta: { requiresAuth: true }
      // },
      {
        path: 'feedbacks', component: () => import('../components/Admin/Feedbacks.vue'), meta: { requiresAuth: true, scheduleAdmin: true }
      }

    ]
  },
  {
    path: '/finance',
    name: 'FinanceAdmin',
    component: () => import('../views/FinanceAdmin.vue'),
    children: [
      {
        path: '', component: () => import('../components/FinanceAdmin/Today.vue'), meta: { requiresAuth: true, financeAdmin: true }
      },
      {
        path: 'statistics', component: () => import('../components/FinanceAdmin/Monthly.vue'), meta: { requiresAuth: true, financeAdmin: true }
      },
      {
        path: 'cancellations', component: () => import('../components/FinanceAdmin/Cancellations.vue'), meta: { requiresAuth: true, financeAdmin: true }
      },
      {
        path: 'data', component: () => import('../components/FinanceAdmin/BookingData.vue'), meta: { requiresAuth: true, financeAdmin: true }
      },
      {
        path: 'journals', component: () => import('../components/FinanceAdmin/Journals.vue'), meta: { requiresAuth: true, financeAdmin: true }
      },
      {
        path: 'challan', component: () => import('../components/FinanceAdmin/Challan.vue'), meta: { requiresAuth: true, financeAdmin: true }
      },
      {
        path: 'bookings', component: () => import('../components/FinanceAdmin/Bookings.vue'), meta: { requiresAuth: true, financeAdmin: true }
      },

    ]
  },
  {
    path: '/superadmin',
    name: 'SuperAdmin',
    component: () => import('../views/SuperAdmin.vue'),
    children: [
      {
        path: '', component: () => import('../components/FinanceAdmin/Today.vue'), meta: { requiresAuth: true, superAdmin: true }
      },
      {
        path: 'statistics', component: () => import('../components/FinanceAdmin/Monthly.vue'), meta: { requiresAuth: true, superAdmin: true }
      },
      {
        path: 'cancellations', component: () => import('../components/FinanceAdmin/Cancellations.vue'), meta: { requiresAuth: true, superAdmin: true }
      },
      {
        path: 'data', component: () => import('../components/FinanceAdmin/BookingData.vue'), meta: { requiresAuth: true, superAdmin: true }
      },
      {
        path: 'manage-buses', component: () => import('../components/Admin/ManageBuses.vue'), meta: { requiresAuth: true, superAdmin: true }
      },
      {
        path: 'manage-routes', component: () => import('../components/Admin/ManageRoutes.vue'), meta: { requiresAuth: true, superAdmin: true }
      },
      {
        path: 'schedules', component: () => import('../components/Admin/Schedule.vue'), meta: { requiresAuth: true, superAdmin: true }
      },
      {
        path: 'feedbacks', component: () => import('../components/Admin/Feedbacks.vue'), meta: { requiresAuth: true, superAdmin: true }
      },
      {
        path: 'journals', component: () => import('../components/FinanceAdmin/Journals.vue'), meta: { requiresAuth: true, superAdmin: true }
      },
      {
        path: 'manage-users', component: () => import('../components/SuperAdmin/ManageUsers.vue'), meta: { requiresAuth: true, superAdmin: true },
        
      },
    ]
  },
  {
    path: '/staff',
    name: 'Staff',
    component: () => import('../views/Staff.vue'),
    children: [
      {
        path: '', component: () => import('../components/Staff/BookTicket.vue'),
        meta: { requiresAuth: true, staff: true },
        children: [
          { path: '', component: () => import('../components/Staff/bookTicket/Route.vue'), meta: { requiresAuth: true, staff: true } },
          { path: 'buses', component: () => import('../components/Staff/bookTicket/Buses.vue'), meta: { requiresAuth: true, staff: true } },
          { path: 'passengerDetails', component: () => import('../components/Staff/bookTicket/PassengerDetails.vue'), meta: { requiresAuth: true, staff: true } },
          { path: 'seatSelection', component: () => import('../components/Staff/bookTicket/SeatSelection.vue'), meta: { requiresAuth: true, staff: true } },
          { path: 'payment', component: () => import('../components/Staff/bookTicket/Payment.vue'), meta: { requiresAuth: true, staff: true } },
          { path: 'ticket/:bookingId', component: () => import('../components/Staff/bookTicket/ETicket.vue'), meta: { requiresAuth: true, staff: true } },
          { path: 'daily-closings', component: () => import('../components/Staff/DailyClosings.vue'), meta: { requiresAuth: true, staff: true } },
          { path: 'cancelled-buses', component: () => import('../components/Staff/CancelledBus.vue'), meta: { requiresAuth: true, staff: true } },
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


router.beforeEach(async (to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    let verified = await verfiyToken();
    if (verified) {
      let role = VueJwtDecode.decode(sessionStorage.getItem("token")).role;
      //add role guard
      if (to.matched.some(route => route.meta.financeAdmin)) {
        if (role === 2) {
          next();
        } else {
          next({ path: '/unathorized' })
        }
      } else if (to.matched.some(route => route.meta.scheduleAdmin)) {
        if (role === 1) {
          next()
        } else {
          next({ path: '/unathorized' })
        }
      } else if (to.matched.some(route => route.meta.superAdmin)) {
        if (role === 4) {
          next()
        } else {
          next({ path: '/unathorized' })
        }
      }
      else if (to.matched.some(route => route.meta.staff)) {
        if (role === 3) {
          next()
        } else {
          next({ path: '/unathorized' })
        }
      }

      else {
        next();
      }
    } else {
      sessionStorage.clear("token")
      next({ path: '/login' })
    }
  } else {
    next();
  }

});

export default router
