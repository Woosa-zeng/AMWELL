<template lang="html">
  <div class="base-info">
    <group  label-width="7em" label-margin-right="1em" >
      <cell title="基本信息" :is-link="false"></cell>
      <cell title="SIM卡号" :is-link="false" :value="SIMDetails.msisdn" value-align="left"></cell>
      <cell title="ICCID" :is-link="false" :value="SIMDetails.iccid" value-align="left"></cell>
      <cell title="总流量(M)" :is-link="false" :value="SIMDetails.totalFlow" value-align="left"></cell>
    </group>
    <group  label-width="7em" label-margin-right="1em" >
      <cell title="状态信息" :is-link="false"></cell>
      <cell title="SIM卡状态" :is-link="false" :value="SIMDetails.cardState" value-align="left"></cell>
      <cell title="短信总数" :is-link="false" :value="SIMMessage.msgCount" value-align="left"></cell>
      <cell title="已使用流量(M)" :is-link="false" :value="SIMDetails.usedFlow" value-align="left"></cell>
      <cell title="消耗百分比" :is-link="false" :value="SIMMessage.msgRate" value-align="left"></cell>
      <cell title="服务开始时间" :is-link="false" :value="SIMDetails.serviceStartDate" value-align="left"></cell>
      <cell title="服务结束时间" :is-link="false" :value="SIMDetails.serviceEndDate" value-align="left"></cell>
      <cell title="注册时间" :is-link="false" :value="SIMDetails.registTime" value-align="left"></cell>
      <cell title="SIM卡分发时间" :is-link="false" :value="SIMDetails.distributeTime" value-align="left"></cell>
      <cell title="SIM卡激活时间" :is-link="false" :value="SIMDetails.activationTime" value-align="left"></cell>
      <cell title="最后更新时间" :is-link="false" :value="SIMDetails.lastUpdateTime" value-align="left"></cell>
      <cell title="设备状态" :is-link="false" :value="SIMDetails.deviceStatus" value-align="left">
        <span class="col" :class="deviceColor">{{SIMDetails.deviceStatus}}</span>
        <i class="icon-Update_icon iconfont" @click="changeEqStatus"></i>
      </cell>
      <cell title="GPRS状态" :is-link="false" :value="SIMDetails.gprsStatus" value-align="left">
        <span class="col" :class="gprsColor">{{SIMDetails.gprsStatus}}</span>
        <i class="icon-Update_icon iconfont" @click="changeGPRSStatus"></i>
      </cell>
    </group>
    <group  label-width="7em" label-margin-right="1em" >
      <cell title="备注信息" :is-link="false"></cell>
      <cell-box>
        {{SIMDetails.remark}}
      </cell-box>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Group, Cell, CellBox, Spinner} from 'vux'
  import axios from 'axios'
  import qs from 'qs'
  export default{
    components: {
      Group,
      Cell,
      CellBox,
      Spinner
    },
    watch: {
      SIMDetails() {
        this.setDeviceColor(this.SIMDetails.deviceStatus)
        this.setGPRSColor(this.SIMDetails.gprsStatus)
      }
    },
    data() {
      return {
        SIMDetails: [],
        SIMMessage: [],
        deviceColor: '',
        gprsColor: ''
      }
    },
    created() {
      axios.post('/simBaseInfo/querySimBaseInfoById', qs.stringify({
        id: this.$store.state.id
      })).then(res => {
        console.log(res.data.model)
        this.$store.commit('ICCID', {iccid: res.data.model.iccid}) // 存iccid
        this.SIMDetails = res.data.model
        this.SIMMessage = res.data.message
      })
    },
    methods: {
      setDeviceColor(status) {
        switch (status) {
          case '关机':
            this.deviceColor = 'red'
            break
          case '开机':
            this.deviceColor = 'green'
            break
          case '未知':
            this.deviceColor = 'gray'
            break
        }
      },
      setGPRSColor(status) {
        switch (status) {
          case '暂停':
            this.gprsColor = 'blue'
            break
          case '在线':
            this.gprsColor = 'green'
            break
          case '未知':
            this.gprsColor = 'gray'
            break
        }
      },
      changeEqStatus() {
        axios.post('/simBaseInfo/deviceStatusInfo', qs.stringify({
          iccid: this.SIMDetails.iccid
        })).then((res) => {
          this.SIMDetails.deviceStatus = res.data.obj
          this.setDeviceColor(res.data.obj)
        })
      },
      changeGPRSStatus() {
        axios.post('/simBaseInfo/gprsStatusInfo', qs.stringify({
          iccid: this.SIMDetails.iccid
        })).then((res) => {
          this.SIMDetails.gprsStatus = res.data.obj
          this.setGPRSColor(res.data.obj)
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
.base-info{
  position: relative;
  top: 38px;
  width: 100%;
  .icon-Update_icon{
    position: absolute;
    right: 15px;
    padding: 0 5px;
    font-size: 20px;
    color: #a0a0a0;
  }
  .gray,.green,.red{
    display: inline-block;
    width: 58px;
    height:22px;
    line-height:22px;
    border-radius: 3px;
    text-align: center;
    color: #fff;
  }
  .gray{
    background: #aaa;
  }
  .green{
    background: #33cc33;
  }
  .red{
    background: #ff3333;
  }
}
</style>
