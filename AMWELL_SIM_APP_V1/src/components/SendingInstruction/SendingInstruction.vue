<template lang="html">
  <div class="sendingInstruction">
    <div class="sim-info">
      <div class="title-text">SIM卡号</div>
      <div class="simid">{{simid}}</div>
    </div>
    <div class="msg-box">
      <textarea maxlength="80" v-model="formText" resize="none" name="text" id="text"></textarea>
      <button @click="sengMsg()">发送</button>
    </div>
    <div v-transfer-dom>
      <alert v-model="show" :title="(status)">{{msg}}</alert>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Alert, Group, TransferDomDirective as TransferDom } from 'vux'
  import axios from 'axios'
  import qs from 'qs'
  export default{
    directives: {
      TransferDom
    },
    components: {
      Alert,
      Group
    },
    data() {
      return {
        show: false,
        msg: '',
        status: '',
        simid: this.$store.state.SIMId,
        iccid: this.$store.state.iccid,
        formText: ''
      }
    },
    created() {
    },
    methods: {
      sengMsg() {
        let val = document.getElementById('text').value
        axios.post('/msg/sendMsg', qs.stringify({
          msisdn: this.simid,
          iccid: this.iccid,
          content: val
        })).then((res) => {
          this.show = true
          this.msg = res.data.msg
          this.status = res.data.status
        })
      },
      resetForm(formName) {
        this.formText = ''
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/index.less";
.sendingInstruction{
  position: relative;
  top: 38px;
  width: 100%;
  .sim-info{
    margin: 15px;
    display: flex;
    height: 35px;
    line-height:35px;
    font-size: 13px;
    text-align: center;
    border: 1px solid @b-gray;
    border-radius: 3px;
    color: #1f2d3d;
    .title-text{
      flex: 0 0 78px;
      width: 78px;
      text-align: center;
      border-right: 1px solid @b-gray;
      background-color: #f5f8fc;
    }
    .simid{
      flex: 1;
      background-color: #fff;
    }
  }
  .msg-box{
    margin: 0 15px;
    textarea{
      width:100%;
      height: 150px;
      display: block;
      border: 1px solid @b-gray;
      border-radius: 3px;
      resize: none;
      outline: none;
      font-size: 16px;
      line-height: 20px;
      color: #1f2d3d;
    }
    button{
      position: relative;
      display: block;
      margin: 15px auto;
      padding-left: 14px;
      padding-right: 14px;
      box-sizing: border-box;
      text-align: center;
      text-decoration: none;
      color: #FFFFFF;
      border-radius: 5px;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      overflow: hidden;
      width: 130px;
      height: 35px;
      line-height:35px;
      font-size: 13px;
      border-width: 0;
      outline: 0;
      -webkit-appearance: none;
      background-color: #3b9fe9;
    }
  }
}

</style>
