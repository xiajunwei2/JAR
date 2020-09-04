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
    redirect: '/adminIndex'
  },
  {
    path: '/mue',
    name: '/mue',
    redirect: '/adminIndex',
    component: () => import( /* webpackChunkName: "mue" */ '@/components/mue.vue'),
    children: [
      {
        path: '/componentsindex',
        name: '/componentsindex',
        redirect: '/adminIndex',
        component: () => import( /* webpackChunkName: "componentsindex" */ '@/components/index.vue'),
        children: [
          // admin首页
          {
            path: '/adminIndex',
            name: 'adminIndex',
            meta: {
              title: "首页",
              key: "adminIndex",
            },
            component: () => import( /* webpackChunkName: "adminIndex" */ '@/views/adminIndex.vue')
          },
          {
            path: '/index',
            name: 'index',
            meta: {
              title: "首页",
            },
            component: () => import( /* webpackChunkName: "index" */ '@/views/index.vue')
          },
          // 贷款管理
          {
            path: '/LoanManage',
            name: 'LoanManage',
            meta: {
              title: "贷款管理",
            },
            component: () => import( /* webpackChunkName: "LoanManage" */ '@/views/LoanManage.vue')
          },
          // 贷款管理--详情页
          {
            path: '/LoanManage/LoanManageDetail',
            name: 'LoanManageDetail',
            meta: {
              title: "贷款管理--详情页",
            },
            component: () => import( /* webpackChunkName: "LoanManageDetail" */ '@/views/LoanManageDetail.vue')
          },
          // 等待审核
          {
            path: '/Moderated',
            name: 'Moderated',
            meta: {
              title: "等待审核",
            },
            component: () => import( /* webpackChunkName: "Moderated" */ '@/views/Moderated.vue')
          },
          // 等待受理
          {
            path: '/Acceptance',
            name: 'Acceptance',
            meta: {
              title: "等待受理",
            },
            component: () => import( /* webpackChunkName: "Acceptance" */ '@/views/Acceptance.vue')
          },
          // 等待授信
          {
            path: '/Credit',
            name: 'Credit',
            meta: {
              title: "等待授信",
            },
            component: () => import( /* webpackChunkName: "Credit" */ '@/views/Credit.vue')
          },
          // 等待放款
          {
            path: '/WaitingForLoan',
            name: 'WaitingForLoan',
            meta: {
              title: "等待放款",
            },
            component: () => import( /* webpackChunkName: "WaitingForLoan" */ '@/views/WaitingForLoan.vue')
          },
          // 成功放款记录
          {
            path: '/SuccessfulLoan',
            name: 'SuccessfulLoan',
            meta: {
              title: "成功放款记录",
            },
            component: () => import( /* webpackChunkName: "SuccessfulLoan" */ '@/views/SuccessfulLoan.vue')
          },
          // 数据报表
          {
            path: '/dataReport',
            name: 'dataReport',
            meta: {
              title: "数据报表",
            },
            component: () => import( /* webpackChunkName: "dataReport" */ '@/views/dataReport.vue')
          },
          // 机构列表
          {
            path: '/mechanismList',
            name: 'mechanismList',
            meta: {
              title: "机构管理--机构列表",
            },
            component: () => import( /* webpackChunkName: "mechanismList" */ '@/views/mechanismList.vue')
          },
          //添加产品
          {
            path: '/financialProduct/addProducts',
            name: 'addProducts',
            meta: {
              title: "机构管理--添加产品",
            },
            component: () => import( /* webpackChunkName: "addProducts" */ '@/views/addProducts.vue')
          },
          //产品审核
          {
            path: '/financialProduct/ProductsManage',
            name: 'ProductsManage',
            meta: {
              title: "机构管理--产品审核",
            },
            component: () => import( /* webpackChunkName: "ProductsManage" */ '@/views/ProductsManage.vue')
          },
          // 金融产品管理
          {
            path: '/financialProduct',
            name: 'financialProduct',
            meta: {
              title: "机构管理--金融产品管理",
            },
            component: () => import( /* webpackChunkName: "financialProduct" */ '@/views/financialProduct.vue')

          },
          // 产品分类管理
          {
            path: '/productCategory',
            name: 'productCategory',
            meta: {
              title: "机构管理--产品分类",
            },
            component: () => import( /* webpackChunkName: "productCategory" */ '@/views/productCategory.vue')
          },
          // 企业列表
          {
            path: '/companyList',
            name: 'companyList',
            meta: {
              title: "企业管理--企业列表",
            },
            component: () => import( /* webpackChunkName: "companyList" */ '@/views/companyList.vue')
          },
          // 企业列表
          {
            path: '/companyList/companyListDetail',
            name: 'companyListDetail',
            meta: {
              title: "企业管理--企业详情页",
            },
            component: () => import( /* webpackChunkName: "companyListDetail" */ '@/views/companyListDetail.vue')
          },

          // 用户列表
          {
            path: '/userList',
            name: 'userList',
            meta: {
              title: "用户管理--用户列表",
            },
            component: () => import( /* webpackChunkName: "userList" */ '@/views/userList.vue')
          },
          // 用户列表
          {
            path: '/userList/userListDetail',
            name: 'userListDetail',
            meta: {
              title: "用户管理--用户详情页",
            },
            component: () => import( /* webpackChunkName: "userListDetail" */ '@/views/userListDetail.vue')
          },
          // 首页机构列表
          {
            path: '/indexMechanism',
            name: 'indexMechanism',
            meta: {
              title: "首页机构列表",
            },
            component: () => import( /* webpackChunkName: "indexMechanism" */ '@/views/indexMechanism.vue')
          },
          // 账号管理
          {
            path: '/accountManage',
            name: 'accountManage',
            meta: {
              title: "系统设置--账号管理",
            },
            component: () => import( /* webpackChunkName: "accountManage" */ '@/views/accountManage.vue')
          },
          // 角色管理
          {
            path: '/roleManage',
            name: 'roletManage',
            meta: {
              title: "系统设置-角色管理",
            },
            component: () => import( /* webpackChunkName: "roleManage" */ '@/views/roleManage.vue')
          },
          // 部门管理
          {
            path: '/departManage',
            name: 'departManage',
            meta: {
              title: "系统设置-部门管理",
            },
            component: () => import( /* webpackChunkName: "departManage" */ '@/views/departManage.vue')
          },
          // 操作日志
          {
            path: '/logs',
            name: 'logs',
            meta: {
              title: "系统设置--操作日志",
            },
            component: () => import( /* webpackChunkName: "logs" */ '@/views/logs.vue')
          },
          //菜单管理
          {
            path: '/systemManage',
            name: 'systemManage',
            meta: {
              title: "系统设置--菜单管理",
            },
            component: () => import( /* webpackChunkName: "systemManage" */ '@/views/systemManage.vue')
          },
          // 岗位管理
          {
            path: '/workManage',
            name: 'workManage',
            meta: {
              title: "系统设置--岗位管理",
            },
            component: () => import( /* webpackChunkName: "workManage" */ '@/views/workManage.vue')
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
  base: process.env.BASE_URL,
  routes
})

export default router
