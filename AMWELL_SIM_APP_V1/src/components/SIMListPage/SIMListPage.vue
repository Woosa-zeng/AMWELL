<template lang="html">
  <div class="listpage">
    <div class="top">
      <div class="title">
        <span class="icon" @click="goPrev">
          <i class="iconfont icon-right_icon"></i>
          <span class="text">返回</span>
        </span>
        <div class="min-title">
          <h2>{{companyName}}</h2>
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
    </div>
    <div class="content">
          <scroller lock-x use-pullup :pullup-config="pullupConfig2" height="-150px" ref="scrollerBottom" @on-pullup-loading="onScrollBottom" >
        <group>
          <cell :title="item.msisdn" is-link v-for="item in allSIM" @click.native="goSIMDeatail(item.id, item.msisdn)"></cell>
        </group>
      </scroller>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Group, Cell, CellBox, Search, Scroller, Divider, LoadMore } from 'vux'
  import axios from 'axios'
  import qs from 'qs'
  export default{
    components: {
      Search,
      Group,
      Cell,
      CellBox,
      Scroller,
      Divider,
      LoadMore
    },
    data() {
      return {
        results: [],
        value: '',
        allSIM: [],
        companyName: this.$store.state.companyName,
        scrollTop: 0,
        onFetching: false,
        showLoading: false,
        pageSize: 8,
        pageNum: 1,
        disabled: false,
        pullupConfig2: {
          content: '上拉加载更多',
          downContent: '松开进行加载',
          upContent: '上拉加载更多',
          loadingContent: '加载中...'
        }
      }
    },
    created() {
      this.queryAll()
    },
    methods: {
      queryAll() {
        axios.post('/simBaseInfo/queryall', qs.stringify({
          companyId: this.$store.state.companyId,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          type: this.$store.state.simType
        })).then(res => {
          res = res.data
          if (res.code) {
            for (let i = 0; i < res.obj.list.length; i++) {
              this.allSIM.push(res.obj.list[i])
            }
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset({bottom: 0})
            })
            if (res.obj.pages <= this.pageNum) {
              this.$refs.scrollerBottom.disablePullup()
            }
          }
        })
      },
      onScrollBottom() {
        this.pageNum += 1
        setTimeout(() => {
          this.queryAll()
          this.$refs.scrollerBottom.donePullup()
        }, 800)
      },
      goPrev() {
        this.$router.push({name: 'AllSIM'})
      },
      setFocus() {
        this.$refs.search.setFocus()
      },
      resultClick(item) {
        this.goSIMDeatail(item.id, item.title)
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
        axios.post('/simBaseInfo/queryall', qs.stringify({
          msisdn: val,
          companyId: this.$store.state.companyId,
          pageNum: 1,
          pageSize: 20,
          type: this.$store.state.simType
        })).then(res => {
          res = res.data
          if (res.code) {
            for (let i = 0; i < res.obj.list.length; i++) {
              rs.push({
                title: res.obj.list[i].msisdn,
                id: res.obj.list[i].id
              })
            }
          }
        })
        return rs
      },
      sizer(a, b) {
        if (b.includes(a)) {
          return b
        }
      },
      goSIMDeatail(id, simid) {
        this.$store.commit('SIM_ID', {'SIMId': simid}) // sim_id
        this.$store.commit('ID', {'id': id}) // 获取单条的id
        this.$router.push({name: 'SIMDetails'})
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/index.less";
  .vux-cell-bd{
    .vux-label{
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color:#1f2d3d;
    }
  }
  .vux-search_show{
    .weui-cell{
      background: @light-blue;
    }
  }
.listpage{
  .title{
    position: relative;
    display: flex;
    text-align: left;
    height:32px;
    line-height:32px;
    .icon{
      flex: 0 0 80px;
      width: 80px;
      color: @blue;
    }
    .icon-right_icon{
      position: absolute;
      padding: 0 5px;
      transform: rotate(180deg);
      font-size: 20px;
    }
    .text{
      font-size: 16px;
      line-height: 32px;
      margin-left: 30px;
    }
    .min-title{
      flex: 1;
      line-height: 32px;
      h2{
        margin-left: -25%;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
}
</style>
