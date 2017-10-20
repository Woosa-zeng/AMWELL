<template lang="html">
 <div class="filtrate">
   <section class="filtrate-container">
     <div class="filtrate-cell">
       <span class="item-title">品牌</span>
       <span class="item-default" :class="{'sel-default': brand==='不限品牌'}" @click="selCarBrand">{{brand}}</span>
     </div>
     <div class="filtrate-tabs">
       <span class="item-title">价格</span>
       <div class="item-tabs">
         <span class="sel-item" v-for="(li, index) in priceList" @click="selPrice(index,li.start,li.end,li.text)" :class="{active: currentPrice === li.start}">{{li.text}}</span>
       </div>
     </div>
     <div class="filtrate-tabs">
       <span class="item-title">车型</span>
       <div class="item-tabs">
         <span class="sel-item" v-for="(li, index) in seriesList" @click="selSeries(index,li.id, li.text)" :class="{active: currentSeries === li.id}">{{li.text}}</span>
       </div>
     </div>
   </section>
   <section class="btn-wrapper">
     <span class="reset-btn J_reset-btn" @click="reset">重置</span>
     <span class="submit-btn J_submit-btn" @click="searchCarInfo">确定<span class="J_ret_num">({{count}})</span></span>
   </section>
   <section v-if="carBrandFlag">
     <carbrand v-on:close="closeBrand" v-on:brand="showCarBrand"></carbrand>
   </section>
   <section v-if="carSeriesFlag">
     <carseries v-on:close="closeSeries" v-on:series="showCarSeries"></carseries>
   </section>
 </div>
</template>
<script type="text/ecmascript-6">
  import carbrand from '../CarBrand/CarBrand'
  import carseries from '../CarSeries/CarSeries'
  export default{
    data() {
      return {
        carBrandFlag: false,
        carSeriesFlag: false,
        carBrand: '',
        carSeries: '',
        brand: this.$store.state.carBrandName + this.$store.state.carSeriesName,
        seriesList: [
          {
            text: '车型不限',
            id: ''
          },
          {
            text: 'SUV',
            id: 'SUV'
          },
          {
            text: '面包',
            id: '面包'
          },
          {
            text: '跑车',
            id: '跑车'
          },
          {
            text: 'MPV',
            id: 'MPV'
          },
          {
            text: '皮卡',
            id: '皮卡'
          },
          {
            text: '商务',
            id: '商务'
          }
        ],
        priceList: [
          {
            start: '-1',
            end: '-1',
            text: '价格不限'
          },
          {
            start: 0,
            end: 5,
            text: '5万以下'
          },
          {
            start: 5,
            end: 8,
            text: '5-8万'
          },
          {
            start: 8,
            end: 10,
            text: '8-10万'
          },
          {
            start: 10,
            end: 15,
            text: '10-15万'
          },
          {
            start: 15,
            end: 20,
            text: '15-20万'
          },
          {
            start: 20,
            end: 30,
            text: '20-30万'
          },
          {
            start: 30,
            end: 50,
            text: '30-50万'
          },
          {
            start: 50,
            end: 80,
            text: '50-80万'
          },
          {
            start: 80,
            end: 100,
            text: '80-100万'
          },
          {
            start: 100,
            end: -1,
            text: '100万以上'
          }
        ],
        currentPrice: this.$store.state.priceStart,
        currentSeries: this.$store.state.carType
      }
    },
    computed: {
      count() {
        return this.$store.getters.doneCount
      }
    },
    created() {
      this.getCount()
    },
    methods: {
      searchCarInfo() {
        window.history.go(-1)
      },
      selPrice(index, s, e, text) {
        console.log(index)
        console.log(s)
        console.log(e)
        this.currentPrice = s
        this.$store.commit('PRICE_START', {priceStart: s})
        this.$store.commit('PRICE_END', {priceEnd: e})
        this.getCount()
        this.setTabs('price', text)
      },
      selSeries(index, id, text) {
        console.log(index)
        console.log(id)
        this.currentSeries = id
        this.$store.commit('CAR_TYPE', {carType: id})
        this.getCount()
        this.setTabs('carType', text)
      },
      closeBrand(val) { // 关闭品牌选择层
        this.carBrandFlag = val
      },
      closeSeries(val) { // 关闭车系选择层
        this.carSeriesFlag = val
      },
      showCarBrand(val) { // 获取品牌
        this.carBrand = val.brandName
        this.carSeriesFlag = true // 打开车系选择层
        console.log(`brand==${val.id}`)
        console.log(`brand==${val.brandName}`)
        this.brand = val.brandName
      },
      showCarSeries(val) { // 获取车系
        this.carSeries = val.name
        this.carSeriesFlag = false
        this.carBrandFlag = false
        console.log(`series==${val.id}`)
        console.log(`series==${val.name}`)
        this.brand = this.carBrand + this.carSeries
      },
      selCarBrand() { // 打开品牌选择层
        this.carBrandFlag = true
      },
      reset() {
        this.brand = '不限品牌'
        this.selPrice(0, '-1', '-1')
        this.selSeries(0, '')
        this.$store.commit('CAR_BRAND', {carBrand: '-1'})
        this.$store.commit('CAR_BRAND_NAME', {carBrandName: ''})
        this.$store.commit('CAR_SERIES_ID', {carSeriesId: '-1'})
        this.$store.commit('CAR_SERIES_NAME', {carSeriesName: ''})
        let count = this.getCount()
        this.$store.commit('COUNT', {count: count})
        this.$store.commit('CONDITION', {condition: []})
      },
      setTabs(tabs, text) { // 可删除的标签栏
        let list = this.$store.state.condition
        let flag = false
        for (let i = 0; i < list.length; i++) {
          if (list[i].tabs === tabs) {
            list.splice(i, 1, {
              tabs: tabs,
              text: text
            })
            flag = true
          }
        }
        if (!flag) {
          list.splice(list.length, 0, {
            tabs: tabs,
            text: text
          })
        }
        this.$store.commit('CONDITION', {condition: list})
      }
    },
    components: {
      carbrand,
      carseries
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import url('../../common/less/index.less');
  .filtrate-cell{
    position: relative;
    width: 100%;
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #e6e6e6;
    .item-default{
      position: relative;
      padding-right: 16px;
      color: #ff571a;
      float: right;
      font-size: 14px;
      &:after{
         content: "";
         position: absolute;
         width: 8px;
         height: 8px;
         border-top: 1px solid #b3b3b3;
         border-right: 1px solid #b3b3b3;
         transform: rotate(45deg) translateY(-50%);
         right: 4px;
         top: 45%;
       }
    }
    .sel-default{
      color: #ccc;
    }
  }
  .filtrate-container{
    box-sizing: border-box;
    padding: 0 16px;
    width: 100%;
    overflow: scroll;
    margin-bottom: 40px;
  }
  .btn-wrapper{
    box-sizing: border-box;
    padding: 16px;
    font-size: 0;
    width: 100%;
    .reset-btn{
      width: 20%;
      background-color: #fff;
      height: 44px;
      line-height: 44px;
      font-size: 16px;
      color: #666;
      display: inline-block;
      text-align: center;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-right-width: 0;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    .submit-btn{
      width: 80%;
      border: 1px solid #ff571a;
      .bg-base-r-l();
      height: 44px;
      line-height: 44px;
      font-size: 16px;
      color: #fff;
      display: inline-block;
      text-align: center;
      box-sizing: border-box;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
  .filtrate-tabs{
    position: relative;
    width: 100%;
    border-bottom: 1px solid #e6e6e6;
    &:after{
       display: block;
       clear: both;
       content: '';
     }
  }
  .item-title{
    line-height: 48px;
    font-size: 16px;
    color: #333;
  }
  .item-tabs{
    padding-bottom: 8px;
    .sel-item{
      display: block;
      margin-left: 6px;
      margin-right: 6px;
      margin-bottom: 12px;
      border: 1px solid #b3b3b3;
      border-radius: 4px;
      width: 20%;
      min-width: 63px;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      color: #666;
      text-align: center;
      box-sizing: border-box;
      float: left;
    }
    .active{
      border-color: #ff571a;
      background-color: rgba(255,87,26,.1);
      color: #ff571a;
    }
  }
  .filtrate{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    overflow: scroll;
  }

</style>
