import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import store from '../store';

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin/new',
    name: 'Admin',
    meta: {
      auth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NewAlbum.vue'),
  },
  // {
  //   path: '/admin/:album',
  //   name: 'Admin',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
  // },
  {
    path: '/admin',
    name: 'Album',
    meta: {
      auth: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/AdminAlbums.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const usuario = store.state.user.loggedIn;
  const autorizacion = to.matched.some((record) => record.meta.auth);

  if (autorizacion && !usuario) {
    next('login');
  } else if (!autorizacion && usuario) {
    next('home');
  } else {
    next();
  }
});

export default router;
