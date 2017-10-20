<template lang="html">
  <div class="content">
    <div class="title">
      <i class="iconfont" :class="classMap[parentObj.num]"></i>
      <span class="title-tex">{{titleMap[parentObj.num]}}</span>
    </div>
    <search
      @on-result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top top="46px"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"></search>
    <group>
      <cell :title="item.shortName" is-link v-for="item in cellItems" @click.native="goSIMpage(item.id, item.shortName)"></cell>
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Group, Cell, CellBox, Search } from 'vux'
  import qs from 'qs'
  import axios from 'axios'
  export default{
    components: {
      Search,
      Group,
      Cell,
      CellBox
    },
    props: {
      parentObj: {
        type: Object
      }
    },
    data() {
      return {
        results: [],
        value: '',
        cellItems: [],
        shortName: []
      }
    },
    created() {
      console.log(this.parentObj.simType)
      this.loadNode()
      this.classMap = ['icon-shouye_icon', 'icon-chenmo_icon', 'icon-qiyong_icon', 'icon-yuzhiyujing_icon', 'icon-chaolianggaojing_iocn', 'icon-tingji_icon']
      this.titleMap = ['全部', '沉默', '启用', '阈值预警', '超量告警', '停机']
    },
    watch: {
    },
    methods: {
      loadNode() {
        axios.post('/simcompany/querySimCompanyStatTree', qs.stringify({
          type: this.parentObj.simType
        })).then((res) => {
          res = res.data
          if (res.code) {
            this.cellItems = res.obj.children
            for (let i = 0; i < res.obj.children.length; i++) {
              this.shortName.push(res.obj.children[i])
            }
          }
        })
      },
      setFocus() {
        this.$refs.search.setFocus()
      },
      resultClick(item) {
        this.goSIMpage(item.id, item.title)
        // window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult(val) {
        this.results = val ? this.getData(val) : []
      },
      onSubmit() {
        this.$refs.search.setBlur()
        this.$vux.toast.show({
          type: 'text',
          position: 'top',
          text: 'on submit'
        })
      },
      onFocus() {
        console.log('on focus')
      },
      onCancel() {
        console.log('on cancel')
      },
      getData(val) {
        let rs = []
        for (let i = 0; i < this.shortName.length; i++) {
          rs.push({
            title: this.sizer(val, this.shortName[i].shortName),
            id: this.shortName[i].id
          })
          console.log(this.shortName[i].id)
        }
        return rs
      },
      sizer(a, b) {
        if (b.includes(a)) {
          return b
        }
      },
      goSIMpage(id, name) {
        if (name.indexOf('(')) {
          name = name.split('(')
          name = name[0]
        }
        this.$store.commit('COMPANY_ID', {'companyId': id}) // company_id
        this.$store.commit('COMPANY_NAME', {'companyName': name}) // 公司名
        this.$router.push({name: 'SIMListPage'})
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scope>
  @import "../../common/less/index.less";
  .vux-cell-bd{
  .vux-label{
    width: 320px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #1f2d3d;
  }
  }
  .content{
    .title{

    }
  }
</style>
