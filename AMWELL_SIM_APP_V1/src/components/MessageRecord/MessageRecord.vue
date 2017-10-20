<template lang="html">
  <div class="msg-record">
    <divider>('A Vertical Scroller')scrollTop: {{scrollTop}}</divider>
    <scroller lock-x height="-90" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200" class="test">
      <ul class="box">
        <li class="msg-wrapper" v-for="i in msgList">
          <div class="msg-title">
            <div class="msg-status">
              <div v-if="i.sendStatus" class="green">发送成功</div>
              <div v-else class="red">发送失败</div>
            </div>
            <div class="msg-send-time">{{i.createOn}}</div>
          </div>
          <div class="msg-content">
            {{i.content}}
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
        simid: this.$store.state.SIMId,
        msgList: [],
        disabled: false
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
        this.disabled = false
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
        axios.post('/msg/queryByPage', qs.stringify({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          msisdn: this.simid
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
  .msg-record{
    .msg-wrapper{
      display: block;
      margin: 8px 12px;
      border: 1px solid @b-gray;
      border-radius: 3px;
      background: #fff;
      min-height: 150px;
      box-shadow: 0 0 6px rgba(149, 149, 149, .3);
      .msg-title{
        height: 33px;
        width: 100%;
        line-height:33px;
        display: flex;
        border-bottom: 1px solid @b-gray;
        .msg-status{
          flex: 0 0 135px;
          width: 135px;
          padding: 0 10px;
          text-align: center;
          border-right:1px solid @b-gray;
        }
        .msg-send-time{
          flex: 1;
          padding: 0 10px;
          text-align: center;
        }
      }
      .msg-content{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        display: block;
      }
    }
  }
  .green{
    color: #13CE66;
  }
  .red{
    color: #FF4949;
  }

</style>
