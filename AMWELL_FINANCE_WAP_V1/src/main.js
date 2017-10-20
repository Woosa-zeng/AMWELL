// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick' // 点击延迟
import router from './router'
import App from './App'
import echarts from 'echarts'
import axios from 'axios'
import qs from 'qs'
import store from './store/store'
import scroll from './components/Scroll/Scroll'

Vue.prototype.$echarts = echarts
Vue.prototype.getCount = getCount // 筛选里获取Count
Vue.component('scroll', scroll)
FastClick.attach(document.body)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

function getCount() {
  let type = this.$store.getters.getTag
  console.log(`type${type}`)
  if (type === 0) {
    axios.post('/carSecondHandInfo/queryCarSecondHandInfoCount', qs.stringify({
      brandId: this.$store.state.carBrand,
      seriesId: this.$store.state.carSeriesId,
      startPrice: this.$store.state.priceStart,
      endPrice: this.$store.state.priceEnd,
      carLevel: this.$store.state.carType
    })).then(res => {
      this.$store.commit('COUNT', {count: res.data.count})
    })
  } else if (type === 1) {
    axios.post('/publicCar/carNewInfoqueryByPage', qs.stringify({
      brandId: this.$store.state.carBrand,
      seriesId: this.$store.state.carSeriesId,
      carLevel: this.$store.state.carType,
      guidePrice_s: this.$store.state.priceStart,
      guidePrice_e: this.$store.state.priceEnd,
      pageNum: 1,
      pageSize: 1
    })).then(res => {
      this.$store.commit('COUNT', {count: res.data.total})
    })
  } else {
    axios.post('/publicCar/importQueryByPage', qs.stringify({
      brandId: this.$store.state.carBrand,
      seriesId: this.$store.state.carSeriesId,
      carLevel: this.$store.state.carType,
      guidePrice_s: this.$store.state.priceStart,
      guidePrice_e: this.$store.state.priceEnd,
      pageNum: 1,
      pageSize: 1
    })).then(res => {
      this.$store.commit('COUNT', {count: res.data.total})
    })
  }
}
