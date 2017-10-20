<template lang="html">
  <div class="receive">
    <divider>('A Vertical Scroller')scrollTop: {{scrollTop}}</divider>
    <scroller lock-x height="-90" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200" class="test">
      <ul class="box">
        <li class="msg-wrapper" v-for="i in msgList">
          <div class="msg-top">
            <div class="msg-title">{{i.status_msg}}</div>
            <span class="msg-time">{{i.createDate_s}}</span>
            <div class="msg-content">
              {{i.content}}
            </div>
          </div>
          <div class="msg-bottom">
            <div class="number"><span class="m-t">流水号</span><span class="colon">:</span>{{i.serialNumber}}</div>
            <div class="tip tip-normal" v-if="i.status > 0"><span class="m-t">推送标示</span><span class="colon">:</span>{{i.pushResult}}</div>
            <div class="tip tip-red" v-else><span class="m-t">推送标示</span><span class="colon">:</span>{{i.pushResult}}</div>
            <div class="reason" v-show="i.status > 0"><span class="m-t">失败原因</span><span class="colon">:</span>{{i.reason}}</div>
          </div>
        </li>
        <load-more tip="loading" v-show="showLoading"></load-more>
      </ul>
    </scroller>
    <!--<div class="btn-wrapper">-->
    <!--<x-button type="primary" @click.native="$refs.scrollerBottom.reset({top:0})">回到顶部</x-button>-->
    <!--</div>-->
  </div>
</template>
<script type="text/ecmascript-6">
  import { Scroller, Divider, Spinner, XButton, LoadMore } from 'vux'
  import axios from 'axios'
  import qs from 'qs'
  export default{
    components: {
      Scroller,
      Divider,
      Spinner,
      XButton,
      LoadMore
    },
    mounted() {
//      this.$nextTick(() => {
//        this.$refs.scrollerBottom.reset({top: 0})
//      })
    },
    data() {
      return {
        scrollTop: 0,
        onFetching: false,
        showLoading: false,
        pageSize: 3,
        pageNum: 1,
        iccid: this.$store.state.iccid,
        msgList: [],
        disabled: false,
        pushResult: ''
      }
    },
    created() {
      this.getMsgData()
    },
    methods: {
      onScrollBottom() {
        if (this.disabled) {
          return
        }
        if (this.onFetching) {
        } else {
          this.showLoading = true
          this.onFetching = true
          this.pageSize += 3
          setTimeout(() => {
            this.getMsgData()
            this.onFetching = false
          }, 800)
        }
      },
      getMsgData() {
        axios.post('/recv/queryByPage', qs.stringify({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          iccid: this.iccid
        })).then(res => {
          this.msgList = (res.data.obj.list)
          if (res.data.obj.total < this.pageSize) {
            this.showLoading = false
            this.disabled = true
          }
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()
          })
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scope>
  @import "../../common/less/index.less";
  .receive {
    .msg-wrapper {
      display: block;
      margin: 8px 12px;
      padding: 10px;
      border: 1px solid @b-gray;
      border-radius: 3px;
      background: #fff;
      min-height: 150px;
      box-shadow: 0 0 6px rgba(149, 149, 149, .3);
      .msg-top {
        border-bottom: 2px dotted #e6e6e6;
        .msg-title{
          font-size: 18px;
          line-height: 20px;
          font-weight: 700;
        }
        .msg-time{
          font-size: 14px;
          color:#999;
        }
        .msg-content{
          font-size: 14px;
          color: #333;
          padding: 10px 15px 10px 0;
          word-break:break-all;
        }
      }
      .msg-bottom{
        margin-top: 10px;
        font-size: 14px;
        .number,.tip,.reason{
          .m-t{
            display: inline-block;
            width: 60px;
            color: #999;
            margin-right: 3px;
            text-align:justify;
            text-justify:distribute-all-lines;
            text-align-last:justify;
          }
          .colon{
            display: inline-block;
            margin-right: 10px;
            color: #999;
          }
        }
        .tip-red{
          color:#f33;
        }
        .tip-normal{
          color:#13CE66;
        }
        .reason{
          color:#f33;
        }
      }
    }
  }

</style>
