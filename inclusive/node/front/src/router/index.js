import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location)
}
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location)
}

// *********管理路由**********
// frame啊
import frame from '@/views/Main/Frame';
import home from '@/views/index/index.vue';
import login from '@/views/login/main.vue'
// error
import error404 from '@/components/Error/404';
import error405 from '@/components/Error/405';
// *******导出路由********
export default new VueRouter({
  // mode:'history',
  scrollBehavior (to, from, position) {
    if (position) {
      return position
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    // 框架入口
    {
      path: '/', redirect: '/home', component: frame, meta: {
        keepAlive: true,
        deepth: 0.5
      }, children: [
        //首页
        {
          path: 'index', redirect: '/home', component: home, name: 'index', meta: {
            title: '首页',
            name: '/index'
          }
        },
        //新首页
        {
          path: '/home',
          name: 'home',
          component: resolve => {
            require(['@/views/home/Home.vue'], resolve);
          },
          meta: {
            title: '首页',
            name: '/home'
          }
        },
        {
          path: '/product',
          name: 'product',
          component: resolve => {
            require(['@/views/product/Product.vue'], resolve);
          },
          meta: {
            title: '产品介绍',
            name: '/product'
          }
        },
        //登录模块
        //新登录
        {
          path: 'nlogin', component: resolve => {
            require(['@/views/login/components/nlogin.vue'], resolve)
          }, name: 'nlogin', meta: {
            title: '登录',
            name: '/usercenter'
          }
        },
        //新忘记密码
        {
          path: 'nforget', component: resolve => {
            require(['@/views/login/components/nforget.vue'], resolve)
          }, name: 'nforget', meta: {
            title: '忘记密码',
            name: '/nforget'
          }
        },
        {
          path: '/log', component: login, redirect: '/log/login', name: 'login-main',
          children: [
            //登录
            {
              path: 'login', component: resolve => {
                require(['@/views/login/components/login.vue'], resolve)
              }, name: 'login', meta: {
                title: '登录',
                name: '/login'
              }
            },
            //忘记密码
            {
              path: 'forget', component: resolve => {
                require(['@/views/login/components/forget.vue'], resolve)
              }, name: 'forget', meta: {
                title: '忘记密码',
                name: '/forget'
              }
            },
            //注册
            {
              path: 'register', component: resolve => {
                require(['@/views/login/components/reg.vue'], resolve)
              }, name: 'register', meta: {
                title: '用户注册',
                name: '/register'
              }
            },
          ]
        },
        {
          path: 'loan-type', component: resolve => {
            require(['@/views/loan-type/loan-type.vue'], resolve)
          }, name: 'loan-type', meta: {
            title: '贷款类型',
            needAuth: true,
            name: '/usercenter',
          }
        },
        {
          path: 'choose-case', component: resolve => {
            require(['@/views/user-center/my-loan/choose-case.vue'], resolve)
          }, name: 'choose-case', meta: {
            title: '选择方案',
            needAuth: true,
            name: '/usercenter',
          }
        },
        {
          path: 'apply-loan', component: resolve => {
            require(['@/views/apply-loan/apply-loan.vue'], resolve)
          }, name: 'apply-loan', meta: {
            title: '申请贷款',
            needAuth: true,
            name: '/usercenter'
          }
        },
        {
          path: 'loan-matching', component: resolve => {
            require(['@/views/loan-matching/loan-matching.vue'], resolve)
          }, name: 'loan-matching', meta: {
            title: '贷款匹配',
            needAuth: true,
            name: '/usercenter'
          }
        },
        {
          path: 'apply-info', component: resolve => {
            require(['@/views/apply-info/apply-info.vue'], resolve)
          }, name: 'apply-info', meta: {
            title: '申请资料',
            needAuth: true,
            name: '/usercenter'
          }
        },
        // ===============用户中心================
        {
          path: 'user-center', redirect: '/user-center/my-loan', name: 'usercenter', component: resolve => {
            require(['@/views/user-center/user-center.vue'], resolve)
          }, meta: {
            keepAlive: true,
            deepth: 0.5
          }, children: [
            {
              path: 'enterprice-info', component: resolve => {
                require(['@/views/user-center/enterprice-info/enterprice-info.vue'], resolve)
              }, name: 'enterprice-info', meta: {
                title: '企业信息',
                needAuth: true,
                name: '/usercenter',
                subname: 'enterprice-info'
              }
            },
            {
              path: 'my-companys', component: resolve => {
                require(['@/views/user-center/enterprice-info/my-companys.vue'], resolve)
              }, name: 'my-companys', meta: {
                title: '我的企业',
                needAuth: true,
                name: '/usercenter',
                subname: 'my-companys',
              }
            },
            {
              path: 'add-company', component: resolve => {
                require(['@/views/user-center/enterprice-info/add-company.vue'], resolve)
              }, name: 'add-company', meta: {
                title: '添加企业',
                needAuth: true,
                name: '/usercenter',
                subname: 'my-companys'
              },
            },
            {
              path: 'add-company-stwo', component: resolve => {
                require(['@/views/user-center/enterprice-info/add-company-stwo.vue'], resolve)
              }, name: 'add-company-stwo', meta: {
                title: '添加企业详情',
                needAuth: true,
                name: '/usercenter',
                subname: 'my-companys'
              },
            },
            {
              path: 'add-company-finsh', component: resolve => {
                require(['@/views/user-center/enterprice-info/add-company-finsh.vue'], resolve)
              }, name: 'add-company-finsh', meta: {
                title: '添加企业完成',
                needAuth: true,
                name: '/usercenter',
                subname: 'my-companys'
              },
            },
            {
              path: 'my-enterprice-info', component: resolve => {
                require(['@/views/user-center/enterprice-info/my-enterprice-info.vue'], resolve)
              }, name: 'my-enterprice-info', meta: {
                title: '我的企业',
                needAuth: true,
                name: '/usercenter',
                subname: 'my-enterprice-info'
              }
            },
            {
              path: 'update-enterprice-info', component: resolve => {
                require(['@/views/user-center/enterprice-info/update-enterprice-info.vue'], resolve)
              }, name: 'update-enterprice-info', meta: {
                title: '我的企业',
                needAuth: true,
                name: '/usercenter',
                subname: 'update-enterprice-info'
              }
            },
            {
              path: 'company-enterprice-info', component: resolve => {
                require(['@/views/user-center/enterprice-info/company-enterprice-info.vue'], resolve)
              }, name: 'company-enterprice-info', meta: {
                title: '经营状况',
                needAuth: true,
                name: '/usercenter',
                subname: 'my-enterprice-info'
              }
            },
            {
              path: 'ext-enterprice-info', component: resolve => {
                require(['@/views/user-center/enterprice-info/ext-enterprice-info.vue'], resolve)
              }, name: 'ext-enterprice-info', meta: {
                title: '补充资质',
                needAuth: true,
                name: '/usercenter',
                subname: 'my-enterprice-info'
              }
            },
            {
              path: 'my-loan',
              component: resolve => {
                // require(['@/views/user-center/my-loan/my-loan.vue'], resolve)
                require(['@/views/user-center/my-loan/nmy-loan.vue'], resolve)
              },
              name: 'my-loan',
              meta: {
                title: '我的贷款',
                needAuth: true,
                name: '/usercenter',
                subname: 'my-loan'
              }
            },
            {
              path: 'loandetail',
              component: resolve => {
                require(['@/views/user-center/my-loan/loan-detail.vue'], resolve)
              },
              name: 'loan-detail',
              meta: {
                title: '我的贷款-查看详情',
                needAuth: true,
                name: '/usercenter',
                subname: 'my-loan'
              }
            },
            {
              path: 'order-info', component: resolve => {
                require(['@/views/user-center/my-loan/order-info.vue'], resolve)
              }, name: 'order-info', meta: {
                title: '我的贷款',
                needAuth: true,
                name: '/usercenter',
                subname: 'my-loan'
              }
            },
            {
              path: 'account', component: resolve => {
                require(['@/views/user-center/account/account.vue'], resolve)
              }, name: 'account', meta: {
                title: '账户管理',
                needAuth: true,
                name: '/usercenter',
                subname: 'account'
              }
            },
            {
              path: 'accounts', component: resolve => {
                require(['@/views/user-center/account/accounts.vue'], resolve)
              }, name: 'accounts', meta: {
                title: '账户管理',
                needAuth: true,
                name: '/usercenter',
                subname: 'accounts'
              }
            },
            {
              path: 'my-msg', component: resolve => {
                require(['@/views/user-center/account/my-msg.vue'], resolve)
              }, name: 'my-msg', meta: {
                title: '我的消息',
                needAuth: true,
                name: '/usercenter',
                subname: 'my-msg'
              }
            },
            {
              path: 'my-msg-detail', component: resolve => {
                require(['@/views/user-center/account/my-msg-detail.vue'], resolve)
              }, name: 'my-msg-detail', meta: {
                title: '我的消息-详情',
                needAuth: true,
                name: '/usercenter',
                subname: 'my-msg-detail'
              }
            },
          ]
        },
        // 关于我们
        {
          path: 'aboutus', component: resolve => {
            require(['@/views/aboutus/aboutus.vue'], resolve)
          }, name: 'aboutus', meta: {
            title: '关于我们',
            name: '/aboutus'
          }
        },
        // not-found405
        {
          path: '405', component: error405, name: '405', meta: {
            title: '网页建设中',
            name: '/405'
          }
        },
        {
          path: '/article', component: resolve => {
            require(['@/views/article/index.vue'], resolve)
          }, name: 'article', meta: {
            title: '文章详情',
            name: '/article'
          }
        },
        {
          path: '/news', component: resolve => {
            require(['@/views/news/index.vue'], resolve)
          }, name: 'article', meta: {
            title: '新闻详情',
            name: '/news'
          }
        },
      ]
    },
    // not-found404
    {
      path: '/404', component: error404, name: '404', meta: {
        title: '网页已丢失',
        name: '/404'
      }
    },
    // not-found404
    {
      path: '*', component: error404, name: 'notFound', meta: {
        title: '网页已丢失',
        name: '/404'
      }
    }
  ]
})
