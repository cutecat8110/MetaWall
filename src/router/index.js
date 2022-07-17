import { createRouter, createWebHashHistory } from 'vue-router';
// vue-axios
import axios from 'axios';

import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        name: 'posts_wall',
        component: () => import('@/views/PostsWall.vue'),
      },
      {
        path: 'post',
        name: 'post',
        component: () => import('@/views/Post.vue'),
      },
      {
        path: 'profile/:p',
        name: 'profile',
        component: () => import('@/views/Profile.vue'),
      },
    ],
  },
  {
    path: '/sign_in',
    name: 'sign_in',
    component: () => import('../views/SignIn.vue'),
  },
  {
    path: '/sign_up',
    name: 'sign_up',
    component: () => import('../views/SignUp.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to) => {
  store.commit('Load', true);
  if (to.name !== 'sign_in' && to.name !== 'sign_up') {
    const api = `${process.env.VUE_APP_API}/user/checkLogin`;
    const headers = {
      headers: {
        authorization: localStorage.getItem('authorization'),
      },
    };
    store.commit('headers', headers);
    const isAuth = await axios
      .get(api, headers)
      .then(() => true)
      .catch(() => '/sign_in')
      .then();
    return isAuth;
  }
  return true;
});

router.afterEach(() => {
  store.commit('Load', false);
});

export default router;
