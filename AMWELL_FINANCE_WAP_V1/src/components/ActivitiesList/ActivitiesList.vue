<template lang="html">
<div class="activities-list">
  <div class="header">
    <vheader></vheader>
    <div class="border-1px"></div>
    <h2 class="list-h2-title">活动专区</h2>
  </div>
  <div class="list-content" ref="listwrapper">
    <scroll class="wrapper"
            :data="data"
            :pullup="pullup"
            @scrollToEnd="loadData">
      <ul class="list-wrapper">
        <li v-for="item in data" class="list-item border-1px" @click="showActivitiesDetail(item.activityId)">
          <img :src="item.fullfigureUrl" alt="" class="item-img">
          <div class="item-des">
            <h3 class="item-h3-title">{{item.activityName}}</h3>
            <span class="activities-time">活动时间：{{item.stratOn}}  -  {{item.endOn}}</span>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
  import vheader from '../Header/Header'
  import axios from 'axios'
  import qs from 'qs'
  export default{
    components: {
      vheader
    },
    data() {
      return {
        data: [],
        pullup: true,
        pullUpFlag: true,
        pageNum: 1
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      loadData() {
        if (this.pullUpFlag) {
          console.log(`pages== ` + this.pageNum)
          axios.post('/publicActivity/queryByPage', qs.stringify({
            pageNum: this.pageNum,
            pageSize: 6
          })).then(res => {
            this.data = this.data.concat(res.data.list)
            if (this.pageNum < res.data.pages) {
              this.pageNum++
            } else {
              this.pullUpFlag = false
            }
          })
        }
      },
      showActivitiesDetail(id) {
        this.$store.commit('ACTIVITIES_ID', {activitiesId: id})
        this.$router.push({name: 'ActivitiesDetail'})
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import url('../../common/less/index.less');
  .header{
    background: #fff;
    z-index: 666;
  }
  .wrapper{
    height: 100%;
  }
  .activities-list{
    height: 100%;
    .item-img{
      display: block;
      margin: 0 auto;
    }
  }
  .list-h2-title{
    margin: 0 20px;
    font-size: 17px;
    line-height: 55px;
  }
  .list-content{
    margin: 0 20px;
    overflow: hidden;
    .list-item{
      list-style: none;
      padding-bottom: 15px;
      padding-top: 15px;
      &:first-child{
         padding-top: 0;
       }
      .item-img{
        height: 133px;
      }
      .item-h3-title{
        font-size: 15px;
      }
      .activities-time{
        font-size: 11px;
        color: #666;
        vertical-align: bottom;
      }
    }
  }
</style>
