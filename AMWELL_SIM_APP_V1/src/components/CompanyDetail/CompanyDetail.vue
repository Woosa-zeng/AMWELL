<template lang="html">
  <div class="company-info-wrapper">
    <ul>
      <li>
        <div class="title-tex1">公司详情</div>
      </li>
      <li>
        <div class="title-tex">登录名</div>
        <div class="company-info">
          <input :value="companyInfo.username" disabled>
        </div>
      </li>
      <li>
        <div class="title-tex">管理员姓名</div>
        <div class="company-info">
          <input :value="companyInfo.realname" disabled>
        </div>
      </li>
      <li>
        <div class="title-tex">公司全称</div>
        <div class="company-info">
          <input :disabled="disable" v-model="companyInfo.fullName">
        </div>
      </li>
      <li>
        <div class="title-tex">公司简称</div>
        <div class="company-info">
          <input :disabled="disable" v-model="companyInfo.shortName">
        </div>
      </li>
      <li>
        <div class="title-tex">更新时间</div>
        <div class="company-info">
          <input :value="companyInfo.createTime_s" disabled>
        </div>
      </li>
      <li>
        <div style="width: 100%;">
          <group>
            <x-switch :title="('用户状态')"
                      :disabled="disable"
                      :inline-desc="cval + ''"
                      v-model="value1">
            </x-switch>
          </group>
        </div>
      </li>
    </ul>
    <div class="btn-wrapper">
      <div class="btn-blue" @click="saveInfo" v-if="saveFlag">保存</div>
      <div class="btn-blue" @click="changeInfo" v-else>修改</div>
      <div class="btn-gray" @click="cancel">取消</div>
    </div>
    <toast v-model="show2" type="text">{{msg}}</toast>
  </div>
</template>
<script type="text/ecmascript-6">
  import {XSwitch, Group, Toast} from 'vux'
  import axios from 'axios'
  import qs from 'qs'
  export default{
    components: {
      XSwitch,
      Group,
      Toast
    },
    data() {
      return {
        companyInfo: {},
        disable: true,
        saveFlag: false,
        value1: true,
        fullName: '',
        shortName: '',
        show2: false,
        msg: ''
      }
    },
    created() {
      this.getCompanyInfo()
    },
    computed: {
      cval: function() {
        return this.value1 ? '有效' : '无效'
      }
    },
    methods: {
      changeInfo() {
        this.disable = false
        this.saveFlag = true
      },
      showMsg(msg) {
        this.show2 = true
        this.msg = msg
      },
      saveInfo() {
        axios.post('/simcompany/updSimCompany', qs.stringify({
          fullName: this.companyInfo.fullName,
          shortName: this.companyInfo.shortName,
          flag: this.value1 === true ? 1 : 0,
          id: this.companyInfo.id,
          adminType: this.companyInfo.adminType,
          parentId: this.companyInfo.parentId
        })).then((res) => {
          if (res.data.success) {
            this.showMsg(res.data.msg)
            setTimeout(() => {
              this.$router.push({name: 'Company'})
            }, 3000)
          } else {
            this.showMsg(res.data.msg)
          }
        })
        this.openFlage()
      },
      cancel() {
        this.openFlage()
        this.getCompanyInfo()
      },
      openFlage() {
        this.disable = true
        this.saveFlag = false
      },
      getCompanyInfo() {
        axios.post('/simcompany/queryById', qs.stringify({
          id: this.$store.state.companyId
        })).then((res) => {
          res = res.data
          this.companyInfo = res
          if (res.flag > 0) {
            this.value1 = true
          } else {
            this.value1 = false
          }
          console.log(res)
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/index.less";
  .company-info-wrapper{
    position: fixed;
    width: 100%;
    top: 50px;
    left: 0;
    bottom: 0;
    background: #fff;
    ul{
      margin-left: 10px;
      font-size: 17px;
    }
    li{
      height: 44px;
      line-height: 44px;
      border-bottom: 1px dotted @b-gray;
      display: flex;
      .title-tex1{
        font-size: 20px;
        text-indent: 5px;
      }
      .title-tex{
        flex: 0 0 100px;
        width: 100px;
        text-indent: 5px;
      }
      .company-info{
        flex: 1;
        input{
          text-indent: 5px;
          height: 35px;
          width: 95%;
          border: none;
          font-size: 16px;
        }
      }
    }
    .btn-wrapper{
      display: flex;
      width: 220px;
      margin: 30px auto;
      .btn-blue,.btn-gray{
        flex: 1;
        text-align: center;
        border-radius: 3px;
        height: 30px;
        line-height: 30px;
        color: #fff;
      }
      .btn-blue{
        margin-right: 10px;
        background: #3b9fe9;
      }
      .btn-gray{
        margin-left: 10px;
        background: #b3b3b3;
      }
    }
    .weui-cells{
      margin-top: 0;
      width: 100%;
    }
    .weui-cells:before {
      border-top: none;
    }
    .vux-x-switch.weui-cell_switch{
      padding-left:5px;
    }
  }
</style>
