<template lang="html">
  <div class="sim-details">
    <div>
      <tab>
        <tab-item selected @on-item-click="onItemClick">SIM卡信息</tab-item>
        <tab-item @on-item-click="onItemClick">指令发送</tab-item>
        <tab-item @on-item-click="onItemClick">短信记录</tab-item>
        <tab-item @on-item-click="onItemClick">接受记录</tab-item>
      </tab>
      <router-view></router-view>
      <!--<swiper v-model="index" height="100px" :show-dots="false">-->
        <!--<swiper-item v-for="(item, index) in list2" :key="index">-->
          <!--<div class="tab-swiper vux-center">-->
            <!--<keep-alive>-->
              <!--<router-view></router-view>-->
            <!--</keep-alive>-->
          <!--</div>-->
      <!--</swiper-item>-->
      <!--</swiper>-->
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
  const list = () => ['', '', '', '']
  export default{
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    data() {
      return {
        list2: list(),
        index: 0
      }
    },
    created() {
      this.onItemClick(this.index)
    },
    methods: {
      onItemClick(index) {
        console.log('on item click:', index)
        switch (index) {
          case 0:
            this.$router.push({name: 'SIMBaseInfo'})
            break
          case 1:
            this.$router.push({name: 'SendingInstruction'})
            break
          case 2:
            this.$router.push({name: 'MessageRecord'})
            break
          case 3:
            this.$router.push({name: 'ReceiveRecord'})
            break
        }
      },
      addTab() {
        if (this.list2.length < 5) {
          this.list2 = list().slice(0, this.list2.length + 1)
        }
      },
      removeTab() {
        if (this.list2.length > 1) {
          this.list2 = list().slice(0, this.list2.length - 1)
        }
      },
      next() {
        if (this.index === this.list2.length - 1) {
          this.index = 0
        } else {
          ++this.index
        }
      },
      prev() {
        if (this.index === 0) {
          this.index = this.list2.length - 1
        } else {
          --this.index
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';
  @import "../../common/less/index.less";
  .box {
    padding: 15px;
  }
  .vux-tab {
    position: absolute;
    top: 40px;
    z-index: 666;
    width: 100%;
  }
  .vux-tab .vux-tab-item.vux-tab-selected{
    color: @middle-blue;
    border-bottom: 3px solid @middle-blue;
  }

</style>
