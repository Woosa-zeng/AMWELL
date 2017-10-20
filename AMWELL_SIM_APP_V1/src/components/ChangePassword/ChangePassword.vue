<template lang="html">
  <div class="change-pwd">
    <div class="title">
      <i class="iconfont icon-xiugaimima_icon"></i>
      <span class="title-tex">修改密码</span>
    </div>
    <ul>
      <li>
        <div class="title-tex">旧密码</div>
        <div class="company-info">
          <input v-model="oldpwd" type="password" >
        </div>
      </li>
      <li>
        <div class="title-tex">新密码</div>
        <div class="company-info">
          <input v-model="newpwd" type="password">
        </div>
      </li>
      <li>
        <div class="title-tex">确认密码</div>
        <div class="company-info">
          <input v-model="newpwd2" type="password">
        </div>
      </li>
    </ul>
    <div class="btn-wrapper">
      <div class="btn-blue" @click="submit">提交</div>
      <div class="btn-gray" @click="cancel">重置</div>
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
        show2: false,
        msg: '',
        oldpwd: '',
        newpwd: '',
        newpwd2: ''
      }
    },
    methods: {
      showMsg(msg) {
        this.show2 = true
        this.msg = msg
      },
      cancel() {
        this.oldpwd = ''
        this.newpwd = ''
        this.newpwd2 = ''
      },
      submit() {
        if (!this.checkData()) {
          return false
        } else {
          axios.post('/users/updateUserPassword', qs.stringify({
            oldPassword: this.oldpwd,
            newPassword: this.newpwd
          })).then(res => {
            if (res.data.success) {
              this.showMsg(res.data.msg)
              setTimeout(() => {
                this.$router.push({name: 'FirstPage'})
              }, 3000)
            } else {
              this.showMsg(res.data.msg)
            }
          })
        }
      },
      checkData() {
        if (!this.oldpwd || !this.newpwd || !this.newpwd2) {
          this.showMsg('请输入密码')
          return false
        }
        if ((this.oldpwd.length < 6 || this.oldpwd.length > 12) || (this.newpwd.length < 6 || this.newpwd.length > 12)) {
          this.showMsg('密码长度在 6 到 12 个字符')
          return false
        }
//        let reg1 = new RegExp(/^[0-9A-Za-z]{6,12}$/)
//        if (!reg1.test(this.oldpwd) || !reg1.test(this.newpwd)) {
//          this.showMsg('密码只能包含数字和字母')
//          return false
//        }
        if (this.newpwd !== this.newpwd2) {
          this.showMsg('两次输入密码不一致')
          return false
        } else {
          return true
        }
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scope>
  @import "../../common/less/index.less";
  .change-pwd{
    position: fixed;
    width: 100%;
    top: 50px;
    left: 0;
    bottom: 0;
    background: #fff;
    .title{
      border-bottom: 4px solid #fbf9fe;
    }
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
