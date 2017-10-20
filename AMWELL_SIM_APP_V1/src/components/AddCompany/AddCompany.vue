<template lang="html">
  <div class="add-company">
    <ul>
      <li>
        <div class="title-tex1">公司详情</div>
      </li>
      <li>
        <div class="title-tex"><span class="star">*</span>上级公司名</div>
        <div class="company-info">
          <input v-model="companyInfo.parentName" placeholder="请输入上级公司精确简称" maxlength="20" disabled>
        </div>
      </li>
      <li>
        <div class="title-tex"><span class="star">*</span>登录名</div>
        <div class="company-info">
          <input v-model="companyInfo.username" placeholder="请输入登录名" maxlength="20">
        </div>
      </li>
      <li>
        <div class="title-tex"><span class="star">*</span>登录密码</div>
        <div class="company-info">
          <input v-model="companyInfo.passwords" type="password" placeholder="请输入登录密码" maxlength="12">
        </div>
      </li>
      <li>
        <div class="title-tex"><span class="star">*</span>管理员姓名</div>
        <div class="company-info">
          <input v-model="companyInfo.realname" placeholder="请输入管理员姓名" maxlength="8">
        </div>
      </li>
      <li>
        <div class="title-tex"><span class="star">*</span>公司全称</div>
        <div class="company-info">
          <input v-model="companyInfo.fullName" placeholder="请输入公司全称" maxlength="20">
        </div>
      </li>
      <li>
        <div class="title-tex"><span class="star">*</span>公司简称</div>
        <div class="company-info">
          <input v-model="companyInfo.shortName" placeholder="请输入公司简称" maxlength="20">
        </div>
      </li>
      <li>
        <div style="width: 100%;">
          <group>
            <x-switch :title="('用户状态')"
                      :inline-desc="cval + ''"
                      v-model="value1">
            </x-switch>
          </group>
        </div>
      </li>
    </ul>
    <div class="btn-wrapper">
      <div class="btn-blue" @click="saveInfo">添加</div>
      <div class="btn-gray" @click="clearData">重置</div>
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
        companyInfo: {
          username: '',
          parentName: '联和安业',
          passwords: '',
          realname: '',
          fullName: '',
          shortName: ''
        },
        parentId: '1', // 上级公司ID
        value1: true, // 是否有效开关
        show2: false,
        msg: ''
      }
    },
    computed: {
      cval: function() {
        return this.value1 ? '有效' : '无效'
      }
    },
    created() {
      this.searchCompany()
    },
    methods: {
      showMsg(msg) {
        this.show2 = true
        this.msg = msg
      },
      saveInfo() {
        this.validate()
      },
      postMsg() {
        axios.post('/simcompany/addSimCompany', qs.stringify({
          username: this.companyInfo.username,
          fullName: this.companyInfo.fullName,
          shortName: this.companyInfo.shortName,
          realname: this.companyInfo.realname,
          password: this.companyInfo.passwords,
          flag: this.value1 === true ? 1 : 0,
          adminType: 1,
          parentId: this.parentId
        })).then((res) => {
          if (res.data.success) {
            this.showMsg(res.data.msg)
            setTimeout(() => {
              this.$router.push({name: 'Company'})
            }, 3000)
          } else {
            this.showMsg('出错了')
          }
        })
      },
      clearData() {
        console.log('clear~')
        this.companyInfo = {}
      },
      validate() {
//        let reg1 = new RegExp(/^[0-9A-Za-z]{6,12}$/)
//        if (!reg1.test(this.companyInfo.passwords)) {
//          this.showMsg('密码只能包含数字和字母')
//          return false
//        }
        if (this.companyInfo.passwords.length < 6 || this.companyInfo.passwords.length > 12) {
          this.showMsg('密码长度在 6 到 12 个字符')
          return false
        }
        if (!this.companyInfo.username || !this.companyInfo.fullName || !this.companyInfo.shortName) {
          this.showMsg('请填写完整信息！')
        } else {
          this.postMsg()
        }
      },
      searchCompany() {
        axios.post('/simcompany/querySimCompanyByShortName', qs.stringify({
          shortName: this.companyInfo.parentName
        })).then((res) => {
          if (res.data) {
            this.parentId = res.data.id
          } else {
            let msg = '上级公司不存在，请重新输入'
            this.showMsg(msg)
          }
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/index.less";
  .add-company{
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
    flex: 0 0 120px;
    width: 120px;
    .star{
      color: #ff4949;
    }
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
