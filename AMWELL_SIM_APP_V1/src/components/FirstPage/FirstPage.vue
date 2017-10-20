<template lang="html">
  <div>
    <Group>
      <div class="vux-1px-b weui-cell"><i class="icon-SIMqiazhuangtai_icon iconfont"></i>SIM卡状态</div>
      <div class="charts" id="stateChart" :style="{width: '95%', height: '190px'}"></div>
    </Group>
    <Group>
      <div class="vux-1px-b weui-cell"><i class="icon-SIMqiayujing_icon iconfont"></i>SIM卡预警</div>
      <div class="charts" id="alertChart" :style="{width: '95%', height: '190px'}"></div>
    </Group>
    <Group>
      <div class="vux-1px-b weui-cell"><i class="icon-SIMqiachaoliang_icon iconfont"></i>SIM卡超量</div>
      <div class="charts" id="excessChart" :style="{width: '95%', height: '190px'}"></div>
    </Group>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import { Group } from 'vux'
  export default{
    components: {
      Group
    },
    mounted() {
      this.setStateChart()
      this.setAlertChart()
      this.setExcessChart()
    },
    methods: {
      httpGet(url, callback) {
        axios.get(url).then((response) => {
          console.log(response)
          response = response.data
          if (response.success) {
            callback(response.obj)
          } else {
            if (response.code === -100) { // 登录超时，跳转到登录页面
              window.localStorage.removeItem('userName')
              this.$store.commit('ROUTE_CHANGE', {activeRoute: 'login'})
              this.$router.push({name: 'login'})
            } else {
              console.log('Zz---')
            }
          }
        })
      },
      createPieChart(pieChart) {
        let stateChart = this.$echarts.init(document.getElementById(pieChart.id))
        stateChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} <br/> {d}%'
          },
          legend: {
            orient: 'horizontal',
            right: 'right',
            bottom: 'bottom',
            data: pieChart.legendData
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['40%', '50%'],
              data: pieChart.seriesData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      },
      setStateChart() {
        let self = this
        self.httpGet('/simStatusReport', (data) => {
          let stateChart = {
            id: 'stateChart',
            legendData: ['启用', '未知', '停机', '销号', '待激活'],
            seriesData: [{value: data.countEnable, name: '启用'},
              {value: data.countUnknown, name: '未知'},
              {value: data.countDisable, name: '停机'},
              {value: data.countCancel, name: '销号'},
              {value: data.countSilence, name: '待激活'}]
          }
          self.createPieChart(stateChart)
        })
      },
      setAlertChart() {
        let self = this
        self.httpGet('/simWaringReport', (data) => {
          let alertChart = {
            id: 'alertChart',
            legendData: ['警告', '超量', '正常'],
            seriesData: [{value: data.countWarn, name: '警告'},
              {value: data.countExceed, name: '超量'},
              {value: data.countunWarn, name: '正常'}]
          }
          self.createPieChart(alertChart)
        })
      },
      setExcessChart() {
        let self = this
        self.httpGet('/simMessageRecord', (data) => {
          let excessChart = {
            id: 'excessChart',
            legendData: ['正常', '阈警', '短信超出数'],
            seriesData: [{value: data.normalCount, name: '正常'},
              {value: data.alarmCount, name: '阈警'},
              {value: data.exceedCount, name: '短信超出数'}]
          }
          self.createPieChart(excessChart)
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import '~vux/src/styles/1px.less';
  @import "../../common/less/index.less";
  .icon-SIMqiazhuangtai_icon, .icon-SIMqiayujing_icon, .icon-SIMqiachaoliang_icon, .icon-liuliangfenxi_icon{
    vertical-align: bottom;
    font-size: 20px;
    color: @blue;
  }
  .charts{
    margin: 0 auto;
  }
</style>
