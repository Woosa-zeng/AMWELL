import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userName: '',
    isLoading: false,
    loginFlag: false,
    direction: 'forward',
    simType: null,
    SIMId: null,
    iccid: null,
    companyId: null,
    companyName: null,
    simCompanyId: null, // sim卡分配的公司id
    simCompanyName: null, // sim卡分配的公司name
    id: null, // 单条id
    route: {
      path: '/'
    },
    activeRoute: window.localStorage.getItem('activeRoute') || 'FirstPage'
  },
  mutations: {
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
    [types.ROUTE_CHANGE](state, payload) {
      state.activeRoute = payload.activeRoute
      window.localStorage.setItem('activeRoute', payload.activeRoute)
    },
    [types.LOGIN_FLAG](state, payload) {
      state.loginFlag = payload.loginFlag
    },
    [types.USER_NAME](state, payload) {
      state.userName = payload.userName
    },
    [types.SIM_ID](state, payload) {
      state.SIMId = payload.SIMId
    },
    [types.SIM_TYPE](state, payload) {
      state.simType = payload.simType
    },
    [types.COMPANY_NAME](state, payload) {
      state.companyName = payload.companyName
    },
    [types.COMPANY_ID](state, payload) {
      state.companyId = payload.companyId
    },
    [types.ID](state, payload) {
      state.id = payload.id
    },
    [types.ICCID](state, payload) {
      state.iccid = payload.iccid
    },
    [types.SIM_COMPANY_ID](state, payload) {
      state.simCompanyId = payload.simCompanyId
    },
    [types.SIM_COMPANY_NAME](state, payload) {
      state.simCompanyName = payload.simCompanyName
    }
  }
})

export default store
