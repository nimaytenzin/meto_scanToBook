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
        path: '', component: () => import('../components/Admin/Index.vue')
      },
      {
        path: 'manage-buses', component: () => import('../components/Admin/ManageBuses.vue')
      },
      {
        path: 'manage-routes', component: () => import('../components/Admin/ManageRoutes.vue')
      },
      {
        path: 'schedules', component: () => import('../components/Admin/Schedule.vue')
      },
      {
        path: 'ticket-cancellations', component: () => import('../components/Admin/Cancellations.vue')
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
        children: [
          { path: '', component: () => import('../components/Staff/bookTicket/Route.vue')},
          { path: 'seats', component: () => import('../components/Staff/bookTicket/Seats.vue')},
          { path: 'passenger', component: () => import('../components/Staff/bookTicket/Passenger.vue')}
        ]
      },
      {
        path: 'view-cancellations', component: () => import('../components/Staff/Cancellations.vue')
      },
      {
        path: 'view-schedule', component: () => import('../components/Staff/ViewSchedule.vue')
      }
    ]
  },

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const publicPages = [
    '/',
    '/login',
    '/book',
    '/book/destination',
    '/book/date',
    '/book/buses',
    '/book/seats',
    '/book/bookings',
    '/book/mockPayment',
    '/book/eticket'
  ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem('token');
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
