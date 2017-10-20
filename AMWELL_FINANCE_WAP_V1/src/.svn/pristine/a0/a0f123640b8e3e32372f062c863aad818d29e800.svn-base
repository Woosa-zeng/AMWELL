<template lang="html">
  <div class="cloud-service-experience">
    <div class="sell-car-info-header">
      请填写申请信息
    </div>
    <group>
      <x-input title="申 请 人" is-type="china-name" :max="5" v-model="proposer" placeholder="请填写您的姓名" placeholder-align="right" text-align="right">
        <span class="red" slot="label">*<span class="base">申 请 人</span></span>
      </x-input>
      <x-input title="手机号码" is-type="china-mobile" :max="11" v-model="phoneNumber" placeholder="请填写您的手机号码" placeholder-align="right" text-align="right">
        <span class="red" slot="label">*<span class="base">手机号码</span></span>
      </x-input>
      <x-input title="公司名称" :max="20" v-model="companyName" placeholder="请填写您公司名称" placeholder-align="right" text-align="right"></x-input>
      <x-input title="职  位" :max="20" v-model="position" placeholder="请填写您的职位" placeholder-align="right" text-align="right"></x-input>
      <x-textarea :max="200" placeholder="简单描述您的需求" v-model="requirementDesc"></x-textarea>
    </group>
    <section class="btn-wrapper">
      <div class="sell-car-btn base-btn" @click="showSuccess">免 费 体 验</div>
      <div class="sell-car-btn cancel-btn" @click="goNextPage">取 消</div>
    </section>
    <div v-transfer-dom>
      <x-dialog :show.sync="success" class="dialog-demo">
        <div class="img-box">
          <div class="icon-ct">
            <icon type="success" is-msg></icon>
          </div>
          <h2>已受理</h2>
          <p>您的申请我们已接受</p>
          <p>工作人员会尽快与您联系</p>
          <p>5秒后返回上一页</p>
        </div>
        <div @click="success=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog :show.sync="warn" class="dialog-demo">
        <div class="img-box">
          <div class="icon-ct">
            <icon type="warn" is-msg></icon>
          </div>
          <h2>提交失败</h2>
          <p>{{msg}}</p>
        </div>
        <div @click="warn=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import qs from 'qs'
  import { Group, XAddress, XButton, Cell, Datetime, XInput, XDialog, TransferDomDirective as TransferDom, Icon, XTextarea } from 'vux'
  export default{
    directives: {
      TransferDom
    },
    components: {
      Group,
      XAddress,
      XButton,
      Cell,
      Datetime,
      XInput,
      XDialog,
      Icon,
      XTextarea
    },
    data() {
      return {
        msg: '',
        success: false,
        warn: false,
        proposer: '',
        phoneNumber: '',
        companyName: '',
        position: '',
        requirementDesc: ''
      }
    },
    created() {},
    methods: {
      showSuccess() {
        axios.post('userApply/addRentSystemApply', qs.stringify({
          applicantName: this.proposer,
          applicantPhone: this.phoneNumber,
          companyName: this.companyName,
          position: this.position,
          requirementDesc: this.requirementDesc
        })).then(res => {
          console.log(res.data)
          if (res.data.success) {
            this.success = true
            let that = this
            setTimeout(function() {
              that.goNextPage()
            }, 5000)
          } else {
            this.msg = res.data.msg
            this.warn = true
          }
        })
      },
      change(value) {
        console.log('change', value)
      },
      logHide(str) {
        console.log('on-hide', str)
      },
      goNextPage() {
        this.$router.push({name: 'CloudService'})
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import '~vux/src/styles/close';
  .dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 200px;
    padding: 20px 50px;
    text-align: center;
    overflow: hidden;
  h2{
    line-height: 50px;
    font-size: 18px;
    font-weight: 800;
  }
  p{
    font-size: 12px;
    color: #999;
  }
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .weui-icon-success{
    color: #3096f0 !important;
  }
  }
  .sell-car-info-header{
    height: 40px;
    line-height: 40px;
    font-size: 17px;
    text-indent: 20px;
    background: #eeeff3;
    color: #666;
  }
  .sell-car-btn{
    margin:10px;
    border-radius: 6px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 15px;
  }
  .btn-wrapper{
    background: #eeeff3;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .base-btn{
    color: #fff;
    background: #3096f0;
  }
  .cancel-btn{
    box-sizing: border-box;
    color: #3096f0;
    background: #fff;
    border: 1px solid #3096f0;
  }
  .weui-cells{
    margin-top: 0 !important;
  }
  .red{
    color: red;
  }
  .base{
    color: #333;
  }
</style>
