<template lang="html">
  <div class="apply-for-loan">
    <section>
      <div class="header">
        <h2 class="des-h2-title">
          以租代购
        </h2>
        <div class="space"></div>
        <p class="des">首付低，低月供，低门栏</p>
      </div>
    </section>
    <section class="list-data">
      <scroll class="wrapper"
              :data="listData"
              :pullup="pullup"
              @scrollToEnd="searchCarList">
        <ul class="item-wrapper">
          <li class="list-item" v-for="li in listData" @click="showApplyBox">
            <header>
              <div class="top-info">
                <h2 class="car-name">{{li.brandName}}</h2>
                <div class="price-info">
                  <em class="text">首付</em>
                  <span>￥</span>
                  <em class="price">{{li.firstPrice}}</em>
                </div>
              </div>
              <div class="car-des">{{li.otherName}}</div>
            </header>
            <div class="container">
              <div class="ct-left">
                <div class="direct-price-ct">
                  指导价:
                  <span class="direct-price">{{li.guidePrice}}</span>
                </div>
                <img :src="li.fullFirstAttaUrl">
              </div>
              <div class="ct-right">
                <dl class="ct-right-list">
                  <dt class="ct-right-top-des">用车一号</dt>
                  <dd><span class="dd-des">首年月供</span><span class="dd-num">{{li.firstYearMonthlyPayment}}</span></dd>
                  <dd><span class="dd-des">续3年月供</span><span class="dd-num">{{li.subsequentThreeYearMonthlyPayment}}</span></dd>
                  <dd><span class="dd-des">第1年尾款</span><span class="dd-num">{{li.firstYearRemainPayment}}</span></dd>
                </dl>
                <dl class="ct-right-list">
                  <dt class="ct-right-top-des">用车三号</dt>
                  <dd><span class="dd-des">前3年月供</span><span class="dd-num">{{li.firstThreeYearMonthlyPayment}}</span></dd>
                  <dd><span class="dd-des">第4年月供</span><span class="dd-num">{{li.fourthYearMonthlyPayment}}</span></dd>
                  <dd><span class="dd-des">3年后尾款</span><span class="dd-num">{{li.lastThreeYeayRemainPayment}}</span></dd>
                </dl>
              </div>
            </div>
          </li>
        </ul>
      </scroll>
    </section>
    <div v-transfer-dom>
      <x-dialog :show.sync="applyBox" class="dialog-demo">
        <div class="input-box">
          <input v-model="userName" placeholder="申请人名称">
          <input v-model="userPhone" placeholder="申请人联系电话">
          <div class="apply-btn" @click="postMsg">立即申请</div>
        </div>
        <div @click="applyBox=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <alert v-model="show" :title="title">{{showMsg}}</alert>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import qs from 'qs'
  import { XDialog, TransferDomDirective as TransferDom, Icon, Alert } from 'vux'
  export default{
    directives: {
      TransferDom
    },
    data() {
      return {
        showMsg: '',
        title: '',
        show: false,
        userName: '',
        userPhone: '',
        applyBox: false,
        results: [],
        listData: [],
        pullup: true,
        pullUpFlag: true,
        pageNum: 1
      }
    },
    created() {
      this.searchCarList()
    },
    methods: {
      searchCarList() {
        if (this.pullUpFlag) {
          axios.post('/carLease/queryCarLeaseInfoPage', qs.stringify({
            pageNum: this.pageNum,
            pageSize: 20,
            displayStatus: 1
          })).then(res => {
            if (this.pageNum === 1) {
              this.listData = res.data.list
            } else {
              this.listData = this.listData.concat(res.data.list)
            }
            if (this.pageNum < res.data.pages) {
              this.pageNum++
            } else {
              this.pullUpFlag = false
            }
            console.log(res.data)
          })
        }
      },
      goInfo() {
        this.$router.push({name: 'CloudServiceExperience'})
      },
      postMsg() {
        axios.post('/userApply/addLoanApply', qs.stringify({
          applicantName: this.userName,
          applicantPhone: this.userPhone,
          applyType: '以租代购申请'
        })).then(res => {
          this.applyBox = false
          if (res.data.success) {
            this.title = '提交成功！'
            this.showMsg = '请耐心等待工作人员与您联系。'
            this.showPluginAuto()
          } else {
            this.title = '提交失败！'
            this.showMsg = res.data.msg
            this.showPluginAuto()
          }
        })
      },
      showApplyBox() {
        this.applyBox = true
      },
      showPostAlert() {
        this.show = true
      },
      showPluginAuto() {
        this.showPostAlert()
        setTimeout(() => {
          this.userName = ''
          this.userPhone = ''
          this.show = false
        }, 3000)
      }
    },
    components: {
      XDialog,
      Icon,
      Alert
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import url('../../common/less/index.less');
  @import '~vux/src/styles/close';
  section{
    overflow: hidden;
  }
  .header{
    .des{
      font-size: 10px;
      text-align: center;
    }
  }
  .list-data{
    overflow: hidden;
    .wrapper{
      height: 100%;
    }
  }
  .des-h2-title{
    margin-top: 23px;
    text-align: center;
    font-size: 17px;
    line-height: 21px;
  }
  .apply-for-loan{
    height: 100%;
    overflow: scroll;
    background: #fff;
  }
  /*list style start*/
  .list-item{
    list-style: none;
    margin: 5px 30px;
    overflow: hidden;
    header{
      color: #000;
      padding: 5px;
      background: #f5bd2c;
      .top-info{
        display: flex;
        .car-name{
          flex: 1;
          margin-left: 10px;
          font-size: 23px;
        }
        .price-info{
          margin-right: 10px;
          span{
            font-size: 9px;
          }
          em{
            font-style: normal;
            font-weight: 800;
          }
          em.text{
            font-size: 15px;
            color: #000;
          }
          em.price{
            font-size: 20px;
            color: #bf3132;
          }
        }
      }
      .car-des{
        margin-left: 10px;
        font-size: 13px;
      }
    }
    .container{
      display: flex;
      margin: 0 5px 5px;
      background: #fdf4dd;
      .ct-left{
        flex: 1;
        img{
          height: 100px;
          margin-left: 10px;
        }
        .direct-price-ct{
          margin-left: 10px;
          font-size: 12px;
          .direct-price{
            text-decoration: line-through;
          }
        }
      }
      .ct-right{
        flex: 0 0 150px;
        width: 150px;
        .ct-right-list{
          margin: 5px;
          overflow: hidden;
          .ct-right-top-des{
            float: left;
            width: 20px;
            padding-top:5px;
            padding-bottom: 5px;
            margin-right: 6px;
            font-size: 9px;
            text-align: center;
            line-height: 12px;
            background: #000;
            color: #f5bd2c;
          }
          dd{
            line-height: 19px;
          }
          .dd-des{
            font-size: 10px;
            vertical-align: bottom;
          }
          .dd-num{
            float: right;
            font-size: 12px;
          }
        }
      }
    }
  }
  /*list style end*/
  .input-box{
    height: 150px;
    padding: 20px 15px;
    text-align: center;
    overflow: hidden;
  input{
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    line-height: 44px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    text-indent: 10px;
    outline: none;
  }
  .apply-btn{
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-radius: 5px;
    color: #fff;
  .bg-base-r-l();
  }
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
</style>
