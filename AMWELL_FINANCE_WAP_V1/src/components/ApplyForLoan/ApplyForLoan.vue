<template lang="html">
  <div class="apply-for-loan">
    <section>
      <img src="./01.png" alt="" class="sell-car-img">
    </section>
    <section>
      <h2 class="des-title">产品特点</h2>
      <div class="item-wrapper">
        <ul>
          <li class="item">
            <div class="img-wrapper">
              <img src="./1.png" height="48" width="48">
              <span class="des-text">最高可贷60W</span>
            </div>
          </li>
          <li class="item">
            <div class="img-wrapper">
              <img src="./2.png" height="48" width="48">
              <span class="des-text">日息低至0.05%</span>
            </div>
          </li>
        </ul>
        <ul>
          <li class="item">
            <div class="img-wrapper">
              <img src="./3.png" height="48" width="48">
              <span class="des-text">60天随借随</span>
            </div>
          </li>
          <li class="item">
            <div class="img-wrapper">
              <img src="./4.png" height="48" width="48">
              <span class="des-text">不过户，不押车</span>
            </div>
          </li>
      </ul>
      </div>
    </section>
    <section>
      <h2 class="des-title des-title-border">申请流程</h2>
      <div class="img-ct">
        <img src="./5.png" alt="" height="58">
      </div>
    </section>
    <section>
      <div class="z-sell-car-btn" @click="showApplyBox">我 要 借 款</div>
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
        applyBox: false
      }
    },
    created() {},
    methods: {
      goInfo() {
        this.$router.push({name: 'CloudServiceExperience'})
      },
      postMsg() {
        axios.post('/userApply/addLoanApply', qs.stringify({
          applicantName: this.userName,
          applicantPhone: this.userPhone,
          applyType: '车商贷申请'
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
  .apply-for-loan{
    height: 100%;
    overflow: scroll;
    background: #fff;
    section {
      overflow: hidden;
      .item-wrapper{
        background: #f5f5f5;
        padding: 5px 0;
        ul{
          display: flex;
          width: 95%;
          margin: 0 auto;
          list-style: none;
          .img-wrapper{
            padding: 10px;
            font-size: 12px;
            img{
              vertical-align: middle;
            }
            .des-text{
              margin-left: 5px;
            }
          }
        }
        .item{
          flex: 1;
          margin: 5px;
          background: #fff;
        }
      }
      .img-ct{
        margin-top: 15px;
        padding-bottom: 30px;
        .border-1px();
        img{
          display: block;
          margin: 0 auto;
        }
      }
      .des-title{
        margin-left: 10px;
        line-height: 45px;
        font-size: 14px;
        color: #333;
      }
      .des-title-border{
        .border-1px();
      }
    }
    .sell-car-img{
      width: 100%;
      display: inherit;
    }
    .z-sell-car-btn {
      margin: 20px 44px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      border-radius: 6px;
      color: #fff;
      .bg-base-r-l();
    }
  }
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
