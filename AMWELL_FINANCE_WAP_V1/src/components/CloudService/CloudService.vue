<template lang="html">
  <div class="sell-car">
    <section>
      <div class="banner">
        <h1>租贷管理</h1>
        <p>致力于为用车行业提供最智能<br>最高效的汽车租贷系统</p>
      </div>
    </section>
    <section>
      <div class="header">
        <h2 class="des-h2-title">
          产品介绍
        </h2>
        <div class="space"></div>
      </div>
      <div class="sell-car-content">
        <div class="ct-wrapper">
          <div class="item-cell">
            <div class="img-ct">
              <img src="./1.png" width="153">
            </div>
            <div class="text-ct">
              <h3 class="sell-car-h3">租贷数据可视化管理</h3>
              <p class="text">自定义展示模块数据，一键生成可视化图，根据企业内部业务偏好针对性筛选显示，优化企业服务流程，为企业发展赢取先机。</p>
            </div>
          </div>
          <div class="item-cell">
            <div class="text-ct">
              <h3 class="sell-car-h3">租赁车辆业务管理</h3>
              <p class="text">车辆、订单、客户信息管理，预定及出车业务提醒，车辆保养、年检提醒，让汽车租赁管理更便捷，更准确。</p>
            </div>
            <div class="img-ct">
              <img src="./2.png" width="153">
            </div>
          </div>
          <div class="item-cell">
            <div class="img-ct">
              <img  src="./3.png" width="153">
            </div>
            <div class="text-ct">
              <h3 class="sell-car-h3">汽车风控预警管理</h3>
              <p class="text">GPS实时定位、电子围栏区域划定，车辆行驶数据分析，还可以通过系统或手机远程控制车辆油路、电路，保障车辆财产安全。</p>
            </div>
          </div>
          <div class="item-cell">
            <div class="text-ct">
              <h3 class="sell-car-h3">汽车金融车贷业务管理</h3>
              <p class="text">金融贷款业务、车贷方案管理，便于企业提升工作效率，有助于企业优化贷款方案，增加盈利。</p>
            </div>
            <div class="img-ct">
              <img  src="./4.png" width="153">
            </div>
          </div>
          <div class="item-cell">
            <div class="img-ct">
              <img  src="./5.png" width="153">
            </div>
            <div class="text-ct">
              <h3 class="sell-car-h3">贷后业务数据管理</h3>
              <p class="text">系统实现用户催收提醒，车辆位置信息查询、二押网店风险预警等多项服务，完善的风险控制体系，保障企业财产安全。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="z-sell-car-btn" @click="goInfo">免 费 体 验</div>
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
        this.$router.push({name: 'CloudServiceExperience'})
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import url('../../common/less/index.less');
  .banner{
    height: 155px;
    background-image: url("./01.png");
    background-size: cover;
    text-align: center;
    color: #fff;
    overflow: hidden;
    h1{
      font-size: 27px;
      margin-top: 30px;
    }
    p{
      font-size: 14px;
    }
  }
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
    margin: 0 10px;
  .item-cell{
    margin-bottom: 10px;
    position: relative;
    display: flex;
    padding-bottom: 10px;
    .border-1px();
    &:last-child{
      .border-none();
     }
  .img-ct{
    flex: 0 0 170px;
    width: 170px;
    img{
      display: block;
      margin-top: 10px;
    }
  }
  .text-ct{
    flex: 1;
    margin-top: 15px;
  }
  .sell-car-h3{
    line-height: 25px;
    font-size: 15px;
    font-weight: 700;
    color: #333;
  }
  .text{
    line-height: 20px;
    font-size: 11px;
    color: #333;
    margin-bottom: 10px;
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
</style>
