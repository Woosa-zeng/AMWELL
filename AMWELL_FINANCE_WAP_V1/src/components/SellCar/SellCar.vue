<template lang="html">
<div class="sell-car">
  <section>
    <img src="./banner_1.png" alt="" class="sell-car-img">
  </section>
  <section>
    <div class="header">
      <h2 class="des-h2-title">
        卖车流程
      </h2>
      <div class="space"></div>
    </div>
    <div class="sell-car-content">
      <div class="ct-wrapper">
        <div class="item-cell item1">
          <div class="tag">01</div>
          <div class="text-ct">
            <h3 class="sell-car-h3">在线预约</h3>
            <span class="text">评估师免费上门检测</span>
          </div>
          <div class="img-ct">
            <div class="icon-img"></div>
          </div>
        </div>
        <div class="item-cell item2">
          <div class="tag">02</div>
          <div class="img-ct">
            <div class="icon-img"></div>
          </div>
          <div class="text-ct">
            <h3 class="sell-car-h3">全网代售</h3>
            <span class="text">海量买家快速售出</span>
          </div>
        </div>
        <div class="item-cell item3">
          <div class="tag">03</div>
          <div class="text-ct">
            <h3 class="sell-car-h3">三方约看</h3>
            <span class="text">平均7日成交</span>
          </div>
          <div class="img-ct">
            <div class="icon-img"></div>
          </div>
        </div>
        <div class="item-cell item4">
          <div class="tag">04</div>
          <div class="img-ct">
            <div class="icon-img"></div>
          </div>
          <div class="text-ct">
            <h3 class="sell-car-h3">签约过户</h3>
            <span class="text">省心省时，全程陪同</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="z-sell-car-btn" @click="goInfo">我&nbsp要&nbsp卖&nbsp车</div>
  </section>
</div>
</template>
<script type="text/ecmascript-6">
  export default{
    data() {
      return {}
    },
    created() {},
    methods: {
      goInfo() {
        this.$router.push({name: 'SellCarInfo'})
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import url('../../common/less/index.less');
.sell-car{
  background: #f8f8f8;
  section{
    overflow: hidden;
  }
  .header{
    overflow: hidden;
  }
  .sell-car-img{
    width: 100%;
    display: inherit;
  }
  .des-h2-title{
    margin-top: 23px;
    text-align: center;
    font-size: 17px;
    line-height: 21px;
  }
  .sell-car-content{
    margin: 0 44px;
    .item-cell{
      margin-bottom: 10px;
      position: relative;
      display: flex;
      background: #fff;
      box-shadow: 0 0 8px rgba(176, 178, 178, 0.32);
      &:nth-child(even){
        .tag{
          right: -17px;
        }
        .text-ct{
          text-align: right;
          margin-right: 45px;
        }
       }
      &:nth-child(odd){
        .tag{
          left: -17px;
        }
        .text-ct{
          text-align: left;
          margin-left: 45px;
        }
      }
      .tag{
        position: absolute;
        top: 50%;
        width: 35px;
        height: 35px;
        line-height: 35px;
        transform: translateY(-17px);
        text-align: center;
        font-size: 17px;
        font-weight: 700;
        color: #ea5441;
        background: #fff;
        box-shadow: 0 0 8px rgba(176, 178, 178, 0.32);
      }
      .img-ct{
        flex: 0 0 80px;
        padding: 5px 20px;
      }
      .text-ct{
        flex: 1;
        margin-top: 15px;
      }
      .sell-car-h3{
        line-height: 25px;
        font-size: 15px;
        font-weight: 700;
        color: #ea5441;
      }
      .text{
        line-height: 20px;
        font-size: 11px;
        color: #333;
      }
    }
  }
}
.z-sell-car-btn{
  margin: 20px 44px;
  text-align: center;
  height:40px;
  line-height: 40px;
  border-radius: 6px;
  color: #fff;
  .bg-base-r-l;
}
.item(@n, @i: 1) when (@i =< @n) {
  &.item@{i} {
    .icon-img{
      width:75px;
      height:75px;
      .bg-img("./sell_car_0@{i}_")
    }
  }
  .item(@n, (@i + 1));
}
.item(4);
</style>
