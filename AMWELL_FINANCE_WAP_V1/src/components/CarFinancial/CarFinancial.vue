<template lang="html">
<div class="car-finacial">
  <div class="header">
    <h2 class="des-h2-title">车贷服务</h2>
    <div class="space"></div>
    <div class="des">省时省心，专业服务</div>
  </div>
  <section class="item" v-for="(li, index) in infoList" :class="`item${index+1}`" @click="goDetailPage(index)">
    <div class="info-wrapper">
      <h2 class="info-header">{{li.title}}</h2>
      <div class="info-space"></div>
      <div class="info-des">{{li.des}}</div>
      <div class="info-btn">查看详细</div>
    </div>
  </section>
</div>
</template>
<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        infoList: [
          {
            title: '车商贷',
            des: '解决中小型二手车商融资困难'
          },
          {
            title: '车抵贷',
            des: '有资金困难？车抵贷解你燃眉之急！'
          },
          {
            title: '以租代购',
            des: '0首付，先体验再成交，让你购车更轻松'
          }
        ]
      }
    },
    created() {},
    mounted() {
    },
    methods: {
      goDetailPage(index) {
        switch (index) {
          case 0:
            this.$router.push({name: 'ApplyForLoan'})
            break
          case 1:
            this.$router.push({name: 'CarForLoan'})
            break
          case 2:
            this.$router.push({name: 'RentToPurchase'})
            break
        }
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import url('../../common/less/index.less');
  .car-finacial{
    height:100%;
    overflow: scroll;
  }
  .header{
    overflow: hidden;
    .des-h2-title{
      margin-top: 35px;
      text-align: center;
      font-size: 17px;
    }
    .des{
      text-align: center;
      font-size: 9px;
    }
  }
  section{
    margin: 10px 27px;
    .info-wrapper{
      text-align: center;
      color: #fff;
      border-radius: 6px;
      overflow: hidden;
    }
    .info-header{
      margin-top: 30px;
      font-size: 17px;
      font-weight: 800;
    }
    .info-des{
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 14px;
    }
    .info-btn{
      width: 80px;
      height: 24px;
      margin: 10px auto 30px auto;
      line-height: 24px;
      border: 1px solid #fff;
      border-radius: 14px;
      font-size: 12px;
    }
    .info-space{
      width: 43px;
      margin: 0 auto;
      border-bottom: 1px solid #fff;
    }
  }
  .item(@n, @i: 1) when (@i =< @n) {
    @url:'./@{i}.png';
    &.item@{i} {
      .info-wrapper{
        width:100%;
        height:100%;
        background:url(@url) left center no-repeat;
      }
    }
    .item(@n, (@i + 1));
    }
  .item(3);
</style>
