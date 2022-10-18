import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import store from '../store';
import { getCookie } from '../utils';
// import working from '../views/Working.vue';

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
    // component: working,
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

router.beforeEach(async (to, from, next) => {
  let usuario = store.state.user.loggedIn;
  const autorizacion = to.matched.some((record) => record.meta.auth);
  console.log(usuario);
  let hasSesion = false;

  if (!usuario) {
    hasSesion = getCookie('isAuthenticated');
    console.log(hasSesion);
    if (hasSesion) {
      const user = JSON.parse(hasSesion);
      await store.dispatch('fetchUser', user);
      store.state.user.loggedIn = true;
      usuario = true;
    }
  }
  if (autorizacion && !usuario) {
    next('login');
  } else if (autorizacion && usuario) {
    next();
  } else {
    next();
  }
});

export default router;
