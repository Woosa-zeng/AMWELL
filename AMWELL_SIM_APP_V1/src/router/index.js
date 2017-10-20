import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: (resolve) => {
        require(['@/components/Login/Login.vue'], resolve)
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: (resolve) => {
        require(['@/components/Login/Login.vue'], resolve)
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: (resolve) => {
        require(['@/components/Home/Home.vue'], resolve)
      },
      children: [
        {
          path: 'firstpage',
          name: 'FirstPage',
          component: require('@/components/FirstPage/FirstPage.vue')
        },
        {
          path: 'allsim',
          name: 'AllSIM',
          component: require('@/components/AllSIM/AllSIM.vue')
        },
        {
          path: 'simlistpage',
          name: 'SIMListPage',
          component: require('@/components/SIMListPage/SIMListPage.vue')
        },
        {
          path: 'simdetails',
          name: 'SIMDetails',
          component: require('@/components/SIMDetails/SIMDetails.vue'),
          children: [
            {
              path: 'simbaseinfo',
              name: 'SIMBaseInfo',
              component: require('@/components/SIMBaseInfo/SIMBaseInfo.vue')
            },
            {
              path: 'sendinginstruction',
              name: 'SendingInstruction',
              component: require('@/components/SendingInstruction/SendingInstruction.vue')
            },
            {
              path: 'messagerecord',
              name: 'MessageRecord',
              component: require('@/components/MessageRecord/MessageRecord.vue')
            },
            {
              path: 'receiverecord',
              name: 'ReceiveRecord',
              component: require('@/components/ReceiveRecord/ReceiveRecord.vue')
            }
          ]
        },
        {
          path: 'silence',
          name: 'Silence',
          component: require('@/components/Silence/Silence.vue')
        },
        {
          path: 'enable',
          name: 'Enable',
          component: require('@/components/Enable/Enable.vue')
        },
        {
          path: 'thresholdWarning',
          name: 'ThresholdWarning',
          component: require('@/components/ThresholdWarning/ThresholdWarning.vue')
        },
        {
          path: 'excessAlarm',
          name: 'ExcessAlarm',
          component: require('@/components/ExcessAlarm/ExcessAlarm.vue')
        },
        {
          path: 'stop',
          name: 'Stop',
          component: require('@/components/Stop/Stop.vue')
        },
        {
          path: 'companylist',
          name: 'CompanyList',
          component: require('@/components/CompanyList/CompanyList.vue'),
          meta: {keepAlive: true}
        },
        {
          path: 'company',
          name: 'Company',
          component: require('@/components/Company/Company.vue'),
          meta: {keepAlive: true}
        },
        {
          path: 'companydetail',
          name: 'CompanyDetail',
          component: require('@/components/CompanyDetail/CompanyDetail.vue')
        },
        {
          path: 'addcompany',
          name: 'AddCompany',
          component: require('@/components/AddCompany/AddCompany.vue')
        },
        {
          path: 'simAllocation',
          name: 'SIMAllocation',
          component: (resolve) => {
            require(['@/components/SIMAllocation/SIMAllocation.vue'], resolve)
          },
          meta: {keepAlive: true}
        },
        {
          path: 'changepassword',
          name: 'ChangePassword',
          component: require('@/components/ChangePassword/ChangePassword.vue')
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})
router.afterEach((to) => {
  store.commit('updateLoadingStatus', {isLoading: false})
})
export default router
