<template lang="html">
  <div class="car-series layer-wrapper">
    <div class="layer-left" @click="close"></div>
    <div class="layer-container">
      <div class="group-kind">默认</div>
      <div class="item-group">
        <div class="series-cell" :class="{'active': base}" @click="showCarSeries('-1', '')">不限车系
        </div>
      </div>
      <div class="group-kind">选择车系</div>
      <div class="item-group" v-for="item in seriesList">
        <div class="series-cell" @click="showCarSeries(item.id, item.seriesName)">{{item.seriesName}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import qs from 'qs'
  export default{
    data() {
      return {
        base: true,
        seriesList: [],
        series: ''
      }
    },
    created() {
      this.getSeriesData()
    },
    methods: {
      close() {
        this.$emit('close', false)
      },
      showCarSeries(id, name) {
        this.$emit('series', {id, name})
        this.saveCarSeries(id, name)
        this.getCount()
      },
      getSeriesData() {
        axios.post('/carModel/queryCarSeriesList', qs.stringify({
          brandId: this.$store.state.carBrand
        })).then(res => {
          this.seriesList = res.data
        })
      },
      saveCarSeries(id, name) {
        this.$store.commit('CAR_SERIES_ID', {carSeriesId: id})
        if (name.length) {
          this.$store.commit('CAR_SERIES_NAME', {carSeriesName: name})
        }
        let list = this.$store.state.condition
        let flag = false
        for (let i = 0; i < list.length; i++) { // 可删除的标签栏
          if (list[i].tabs === 'carSeries') {
            list.splice(i, 1, {
              tabs: 'carSeries',
              text: name || '不限车系'
            })
            flag = true
          }
        }
        if (!flag) {
          list.splice(list.length, 0, {
            tabs: 'carSeries',
            text: name || '不限车系'
          })
        }
        this.$store.commit('CONDITION', {condition: list})
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import url('../../common/less/index.less');
  .car-series{
    .series-cell{
      height: 44px;
      line-height: 44px;
      margin-left: 10px;
      font-size: 12px;
      color: #666;
      .border-1px();
    }
    .active{
      color: #ea5441;
    }
  }

</style>
