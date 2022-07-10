import { createRouter, createWebHashHistory } from 'vue-router';

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

router.beforeEach((to) => {
  const authorization = localStorage.getItem('authorization');
  if (!authorization && to.name !== 'sign_in' && to.name !== 'sign_up') {
    return '/sign_in';
  }
  return true;
});

export default router;
