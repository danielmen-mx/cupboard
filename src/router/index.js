import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('../layouts/layout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../pages/Home.vue')
      },
      {
        path: '/post/:id',
        name: 'post',
        component: () => import('../pages/Post.vue'),
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('../pages/Admin.vue'),
        children: [
          {
            path: ':admin',
            component: () => import('../pages/Admin.vue'),
            props: true
          },
        ]
      },
      {
        path: '/store',
        name: 'store',
        component: () => import('../pages/Store.vue')
      },
      {
        path: '/review',
        name: 'review',
        component: () => import('../pages/Review.vue')
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import('../pages/Contact.vue')
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFound.vue')
  }

  // route level code-splitting
  // this generates a separate chunk (About.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import('../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
