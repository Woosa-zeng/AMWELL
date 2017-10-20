<template lang="html">
  <div class="car-brand layer-wrapper">
    <div class="layer-left" @click="close"></div>
    <div class="layer-container">
      <section class="brand-hot-wrapper">
        <div class="group-kind">热门品牌</div>
        <div class="hot-content">
          <div class="item-hot" v-for="item in hotBrandList" @click="showCarBrand(item.id, item.brandName)">
            <img :src="item.fullLogoUrl">
            <div class="item-hot-text" :class="{active: currentBrand === item.id}">{{item.brandName}}</div>
          </div>
        </div>
        <div class="group-kind">默认</div>
        <div class="brand-base" :class="{active: currentBrand === '-1'}" @click="showCarBrand('-1', '不限品牌')">不限品牌</div>
      </section>
      <section class="brand-list-wrapper">
        <div v-for="item in brandList">
          <h2 class="group-kind">{{item.groupName}}</h2>
          <div v-for="li in item.brandList" class="brand-cell" @click="showCarBrand(li.id, li.brandName)" :class="{active: currentBrand === li.id}">
            <img :src="li.fullLogoUrl" class="brandIcon">
            <span class="brandName">{{li.brandName}}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  export default{
    data() {
      return {
        brandList: [],
        hotBrandList: [],
        base: true,
        currentBrand: this.$store.state.carBrand
      }
    },
    created() {
      this.getHotCarBrand()
    },
    methods: {
      close() {
        this.$emit('close', false)
      },
      showCarBrand(id, brandName) { // 车辆品牌
        this.saveCarBrand(id, brandName)
        this.$emit('brand', {id, brandName})
        this.currentBrand = id
        this.getCount()
      },
      getHotCarBrand() {
        axios.get('/carModel/queryHotCarBrandList').then(res => {
          this.hotBrandList = res.data
          // console.log(res.data)
        })
        axios.get('/carModel/queryCarBrandGroup').then(res => {
          this.brandList = res.data.data
          // console.log(res.data)
        })
      },
      saveCarBrand(id, brandName) {
        this.$store.commit('CAR_BRAND', {carBrand: id})
        this.$store.commit('CAR_BRAND_NAME', {carBrandName: brandName})
        let list = this.$store.state.condition
        let flag = false
        for (let i = 0; i < list.length; i++) { // 可删除的标签栏
          if (list[i].tabs === 'carBrand') {
            list.splice(i, 1, {
              tabs: 'carBrand',
              text: brandName
            })
            flag = true
          }
        }
        if (!flag) {
          list.splice(list.length, 0, {
            tabs: 'carBrand',
            text: brandName
          })
        }
        this.$store.commit('CONDITION', {condition: list})
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import url('../../common/less/index.less');
  .car-brand{
    font-size: 12px;
    .active{
      color: #ea5441;
    }
  }
  .hot-content{
    width: 100%;
    font-size: 0;
    border-top: 1px solid #e6e6e6;
    img{
      margin-top: 16px;
      height: 28px;
    }
  }
  .item-hot{
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 25%;
    height: 75px;
    text-align: center;
    border-bottom: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
  }
  .item-hot-text{
    position: absolute;
    width: 100%;
    bottom: 12px;
    left: 0;
    color: #333;
    font-size: 12px;
    line-height: 16px;
    height: 16px;
  }
  .brand-base{
    height: 44px;
    line-height: 44px;
    font-size: 12px;
    padding-left: 16px;
  }
  .brand-list-wrapper{
    .brand-cell{
      margin-left: 60px;
      height: 44px;
      line-height: 44px;
      .border-1px();
      .brandIcon{
        height: 25px;
        vertical-align: middle;
        position: absolute;
        left: -40px;
        top: 10px;
      }
    }
  }

</style>
