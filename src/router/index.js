import { createRouter, createWebHistory } from 'vue-router'

const routes = [

  {
    path: '/',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/login',
    name: 'Home',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/policy/privacy',
    component: () => import('../views/PrivacyPolicy.vue')
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
        path: 'mockPayment', component: () => import('../components/ScanToBookComponents/MockPayment.vue')
      },
      {
        path: 'eticket', component: () => import('../components/ScanToBookComponents/ETicket.vue')
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
      {
        path: 'view-passengers/:scheduleId', component: () => import('../components/Admin/ViewPassengers.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'transfer-passengers/:scheduleId', component: () => import('../components/Admin/TransferPassenger.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'feedbacks', component: () => import('../components/Admin/Feedbacks.vue'), meta: { requiresAuth: true }
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
          { path: 'seats', component: () => import('../components/Staff/bookTicket/Seats.vue'), meta: { requiresAuth: true } },
          { path: 'passenger', component: () => import('../components/Staff/bookTicket/Passenger.vue'), meta: { requiresAuth: true } }
        ]
      },
      {
        path: 'view-cancellations', component: () => import('../components/Staff/Cancellations.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'view-schedule', component: () => import('../components/Staff/ViewSchedule.vue'), meta: { requiresAuth: true }
      }
    ]
  }

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {

  const loggedIn = sessionStorage.getItem('token');

  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!loggedIn) {
      next({ path: '/login' });
      return
    } else {
      next();
      return
    }
  }
  next();
});

export default router
