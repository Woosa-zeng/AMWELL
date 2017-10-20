import Vue from 'vue'
import Vuex from 'vuex'
import * as type from './types.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isLoading: false,
    carTypeTitle: 0,
    carType: '',
    carBrand: '-1',
    carBrandName: '不限品牌',
    carSeriesId: '-1',
    carSeriesName: '',
    priceStart: '-1',
    priceEnd: '-1',
    count: '0',
    sort: '-1',
    condition: [],
    currentDetailId: '',
    newsId: '',
    activitiesId: ''
  },
  getters: {
    doneCount: state => {
      return state.count
    },
    getCondition: state => { // 条件筛选tab监控
      return state.condition
    },
    getTag: state => {
      return state.carTypeTitle
    },
    getBrand: state => { // 选择详情监控
      return {
        carBrand: state.carBrand,
        carSeriesId: state.carSeriesId,
        priceStart: state.priceStart,
        priceEnd: state.priceEnd,
        sort: state.sort
      }
    }
  },
  mutations: {
    updateLoadingStatus(state, payload) { // 加载中
      state.isLoading = payload.isLoading
    },
    [type.CAR_TYPE_TITLE](state, payload) { // 查询分类 1.二手车，2.新车，3.平行进口车
      state.carTypeTitle = payload.carTypeTitle
    },
    [type.CAR_TYPE](state, payload) { // 筛选 车型
      state.carType = payload.carType
    },
    [type.CAR_BRAND](state, payload) { // 车辆品牌
      state.carBrand = payload.carBrand
    },
    [type.CAR_BRAND_NAME](state, payload) { // 车辆品牌名字
      state.carBrandName = payload.carBrandName
    },
    [type.CAR_SERIES_ID](state, payload) { // 车系id
      state.carSeriesId = payload.carSeriesId
    },
    [type.CAR_SERIES_NAME](state, payload) { // 车系name
      state.carSeriesName = payload.carSeriesName
    },
    [type.PRICE_START](state, payload) { // 开始价格
      state.priceStart = payload.priceStart
    },
    [type.PRICE_END](state, payload) { // 结束价格
      state.priceEnd = payload.priceEnd
    },
    [type.COUNT](state, payload) { // 筛选 count
      state.count = payload.count
    },
    [type.CONDITION](state, payload) { // 条件标签容器
      state.condition = payload.condition
    },
    [type.SORT](state, payload) { // 排序
      state.sort = payload.sort
    },
    [type.CURRENT_DETAIL_ID](state, payload) { // 查询车辆详情ID
      state.currentDetailId = payload.currentDetailId
    },
    [type.NEWS_ID](state, payload) { // 查询新闻详情ID
      state.newsId = payload.newsId
    },
    [type.ACTIVITIES_ID](state, payload) { // 查询活动详情ID
      state.activitiesId = payload.activitiesId
    }
  }
})

export default store
