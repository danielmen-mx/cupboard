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
        meta: { requiresAuth: true },
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('../pages/Admin.vue'),
        meta: { requiresAdminAuth: true },
        children: [
          {
            path: ':admin',
            component: () => import('../pages/Admin.vue'),
            meta: { requiresAdminAuth: true },
            props: true,
            children: [
              {
                path: ':action',
                component: () => import('../pages/Admin.vue'),
                meta: { requiresAdminAuth: true },
                props: true
              },
              {
                path: ':action/:id',
                component: () => import('../pages/Admin.vue'),
                meta: { requiresAdminAuth: true },
                props: true
              }
            ]
          },
        ]
      },
      {
        path: '/store',
        name: 'store',
        component: () => import('../pages/Store.vue'),
        meta: { requiresAuth: false },
        children: [
          // {
          //   path: ':item/:id',
          //   component: () => import('../components/Store/Item.vue'),
          //   meta: { requiresAdminAuth: false },
          //   props: true
          // }
        ]
      },
      {
        path: '/store/item/:id',
        name: 'item',
        component: () => import('../components/Store/Item.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/cart/:userId',
        name: 'cart',
        component: () => import('../pages/Cart.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/cart/checkout/:modelId',
        name: 'checkout',
        component: () => import('../pages/Checkout.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/review',
        name: 'review',
        component: () => import('../pages/Review.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import('../pages/Contact.vue')
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('../components/Common/Test.vue')
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFound.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue'),
    children: [
      {
        path: ':register',
        name: 'register',
        component: () => import('../pages/Login.vue'),
        props: true
      },
    ]
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
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
  }
})

export default router
