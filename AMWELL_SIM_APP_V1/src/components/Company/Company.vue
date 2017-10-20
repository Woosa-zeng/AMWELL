<template lang="html">
  <div>
    <div class="title">
      <i class="iconfont icon-gongsiguanli_icon"></i>
      <span class="title-tex">公司管理</span>
      <div class="right" @click="goAddCompany">
        <i class="iconfont icon-Addto_icon" style="font-size: 16px !important;"></i>
        <span class="title-tex">新增</span>
      </div>
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
  import axios from 'axios'
  export default{
    components: {
      Search,
      Group,
      Cell,
      CellBox
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
      this.loadNode()
    },
    watch: {
    },
    methods: {
      loadNode() {
        axios.get('/simcompany/querySimCompanyTree').then((res) => {
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
        // window.alert('id===' + id + ',name==' + name)
        this.$store.commit('COMPANY_ID', {'companyId': id}) // company_id
        // this.$store.commit('COMPANY_NAME', {'companyName': name}) // 公司名
        this.$router.push({name: 'CompanyDetail'})
      },
      goAddCompany() {
        this.$router.push({name: 'AddCompany'})
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
  .title{
    color: @blue;
    padding-top: 5px;
    padding-bottom: 5px;
    .right{
      float: right;
      line-height: 30px;
      margin-right: 15px;
      padding-left: 20px;
      position: relative;
      .icon-Addto_icon{
        position: absolute;
        transform: translateX(-26px);
      }
    }
  }
</style>
