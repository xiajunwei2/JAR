import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//避免重复路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
};

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/admin',
    name: '/admin',
    redirect: '/index',
    component: () => import( /* webpackChunkName: "admin" */ '@/components/admin.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import( /* webpackChunkName: "index" */ '@/views/index.vue')
      },
      {
        path: '/message',
        name: 'message',
        component: () => import( /* webpackChunkName: "message" */ '@/views/message.vue')

      },
      {
        path: '/IdCardReview',
        name: 'IdCardReview',
        component: () => import( /* webpackChunkName: "IdCardReview" */ '@/views/idCardReview.vue')

      },
      {
        path: '/PowerOfAttorney',
        name: 'PowerOfAttorney',
        component: () => import( /* webpackChunkName: "PowerOfAttorney" */ '@/views/PowerOfAttorney.vue')

      },
      {
        path: '/BusinessLicense',
        name: 'BusinessLicense',
        component: () => import( /* webpackChunkName: "BusinessLicense" */ '@/views/BusinessLicense.vue')

      },
      {
        path: 'setting',
        name: '/setting',
        redirect: '/usermanage',
        component: () => import( /* webpackChunkName: "setting" */ '@/components/setting.vue'),
        children: [
          {
            path: '/usermanage',
            name: 'usermanage',
            component: () => import( /* webpackChunkName: "usermanage" */ '@/views/usermanage.vue')
          },
          {
            path: '/Rolemanagement',
            name: 'Rolemanagement',
            component: () => import( /* webpackChunkName: "Rolemanagement" */ '@/views/Rolemanagement.vue')
          },
          {
            path: '/AuditManage',
            name: 'AuditManage',
            component: () => import( /* webpackChunkName: "AuditManage" */ '@/views/AuditManage.vue')
          },
        ]
      },
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import( /* webpackChunkName: "404" */ '@/views/404.vue')

  },

  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: () => import( /* webpackChunkName: "resetPassword" */ '@/views/resetPassword.vue')

  },
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "login" */ '@/views/login.vue')
  },
  {
    path: '*',
    redirect: '/404'
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
