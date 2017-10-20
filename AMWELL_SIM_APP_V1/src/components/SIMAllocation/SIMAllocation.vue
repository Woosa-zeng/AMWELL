<template lang="html">
<div>
  <div class="title">
    <i class="iconfont icon-simguanli_icon"></i>
    <span class="title-tex">快速分配</span>
  </div>
  <div class="item-cell" @click="selectCompany">
    <div class="item-cell-l">
      <span>分配公司</span>
    </div>
    <div class="item-cell-m">
      <input v-model="SIMCompanyName" placeholder="请选择" disabled/>
    </div>
    <div class="item-cell-r">
      <span class="iconfont icon-right_icon"></span>
    </div>
  </div>
  <div class="ct vux-1px-t vux-1px-b">
    <div class="left-text">ICCID</div>
    <div class="right-ipt">
      <ul>
        <li class="bb1">
          <span class="start"></span><input maxlength="30" placeholder="开始" v-model="startSIM">
        </li>
        <li>
          <span class="end"></span><input maxlength="30" placeholder="结束"  v-model="endSIM">
        </li>
      </ul>
    </div>
  </div>
  <div class="btn-wrapper">
    <div class="btn-blue" @click="saveInfo">提&nbsp&nbsp交</div>
    <div class="btn-gray" @click="cancel">重&nbsp&nbsp置</div>
  </div>
  <toast v-model="show2" type="text">{{msg}}</toast>
</div>
</template>
<script type="text/ecmascript-6">
  import { Group, Cell, CellBox, Search, Toast } from 'vux'
  import axios from 'axios'
  import qs from 'qs'
  export default{
    components: {
      Search,
      Group,
      Cell,
      CellBox,
      Toast
    },
    data() {
      return {
        SIMCompanyName: this.$store.state.simCompanyName,
        startSIM: '',
        endSIM: '',
        msg: '',
        show2: false
      }
    },
    methods: {
      showMsg(msg) {
        this.show2 = true
        this.msg = msg
      },
      selectCompany() {
        this.$router.push({name: 'CompanyList'})
      },
      saveInfo() {
        if (!this.SIMCompanyName) {
          this.showMsg('公司不能为空！')
        } else if (!this.startSIM || !this.endSIM) {
          this.showMsg('ICCID不能为空！')
        } else {
          axios.post('/simBaseInfo/batchSimCar', qs.stringify({
            startIccid: this.startSIM,
            endIccid: this.endSIM,
            companyId: this.$store.state.simCompanyId
          })).then(res => {
            this.showMsg(res.data.msg)
          })
        }
      },
      cancel() {
        this.SIMCompanyName = ''
        this.startSIM = ''
        this.endSIM = ''
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scope>
  @import '~vux/src/styles/1px.less';
  @import "../../common/less/index.less";
  .icon-right_icon{
    color: #6a6a6a;
  }
  .ct{
    display: flex;
    background: #fff;
    margin-bottom: 4px;
    border-top: 4px solid #ececec;
    .left-text{
      flex: 0 0 85px;
      width: 85px;
      height: 85px;
      line-height:85px;
      padding-left: 15px;
    }
    .right-ipt{
      flex: 1;
      ul,li{
        list-style:none;
      }
      input{
        width: 95%;
        height: 40px;
        line-height: 40px;
        border: none;
        outline: none;
        font-size: 16px;
        text-indent: 10px;
      }
      .bb1{
        border-bottom: 1px solid @b-gray;
      }
      .start,.end{
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      .start{
        background: #04BE02;
      }
      .end{
        background: red;
      }
    }
  }
  .item-cell{
    display: flex;
    height: 40px;
    line-height: 40px;
    background: #fff;
    border-top: 4px solid #ececec;
    .item-cell-l,.item-cell-m,.item-cell-r{
      display: inline-block;
    }
    .item-cell-l{
      flex: 0 0 90px;
      width: 90px;
      span{
        margin-left: 10px;
      }
    }
    .item-cell-m{
      flex: 1;
      input{
        width: 100%;
        border: none;
        outline: none;
        height: 33px;
        line-height: 33px;
        font-size: 16px;
        text-indent: 15px;
      }
    }
    .item-cell-r{
      flex: 0 0 30px;
      width: 30px;
      span{
        margin-right: 10px;
        color: #6a6a6a;
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

</style>
