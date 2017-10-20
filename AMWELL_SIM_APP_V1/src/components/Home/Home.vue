<template>
  <div style="height:100%;">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <drawer
      width="200px;"
      :show.sync="drawerVisibility"
      :show-mode="showModeValue"
      :placement="showPlacementValue"
      :drawer-style="{width: '200px'}">
      <!-- drawer content -->
      <div slot="drawer">
        <group>
          <group-title slot="title" @click.native="dothis">
            <img src="./user_icon.png" alt="" width="32" height="32">
            <span style="position:relative;top:-8px; font-size: 16px; color: #0e6899;">{{userName}}</span>
          </group-title>
          <cell title="首页" link="/home/firstpage" @click.native="drawerVisibility = false">
            <i class="icon-shouye_icon iconfont" slot="icon" width="20" style="display:block;margin-right:5px;"></i>
          </cell>
          <cell title="全部" link="/home/allsim" @click.native="drawerVisibility = false">
            <i class="icon-quanbu_icon iconfont" slot="icon" width="20" style="display:block;margin-right:12px;margin-left:8px;"></i>
          </cell>
          <cell title="沉默" link="/home/silence" @click.native="drawerVisibility = false">
            <i class="icon-chenmo_icon iconfont" slot="icon" width="20" style="display:block;margin-right:5px;"></i>
          </cell>
          <cell title="启用" link="/home/enable" @click.native="drawerVisibility = false">
            <i class="icon-qiyong_icon iconfont" slot="icon" width="20" style="display:block;margin-right:5px;"></i>
          </cell>
          <cell title="阈值预警" link="/home/thresholdWarning" @click.native="drawerVisibility = false">
            <i class="icon-yuzhiyujing_icon iconfont" slot="icon" width="20" style="display:block;margin-right:5px;"></i>
          </cell>
          <cell title="超量告警" link="/home/excessAlarm" @click.native="drawerVisibility = false">
            <i class="icon-chaolianggaojing_iocn iconfont" slot="icon" width="20" style="display:block;margin-right:5px;"></i>
          </cell>
          <cell title="停机" link="/home/stop" @click.native="drawerVisibility = false">
            <i class="icon-tingji_icon iconfont" slot="icon" width="20" style="display:block;margin-right:5px;"></i>
          </cell>
          <cell v-if="adminType == 0" title="快速分配" link="/home/simAllocation" @click.native="drawerVisibility = false">
            <i class="icon-simguanli_icon iconfont" slot="icon" width="20" style="display:block;margin-right:5px;"></i>
          </cell>
          <cell v-if="adminType == 0" title="公司管理" link="/home/company" @click.native="drawerVisibility = false">
            <i class="icon-gongsiguanli_icon iconfont" slot="icon" width="20" style="display:block;margin-right:5px;"></i>
          </cell>
          <cell title="修改密码" link="/home/changepassword" @click.native="drawerVisibility = false">
            <i class="icon-xiugaimima_icon iconfont" slot="icon" width="20" style="display:block;margin-right:5px;"></i>
          </cell>
          <cell title="退出" link="/login" @click.native="drawerVisibility = false">
            <i class="icon-Exit_icon iconfont" slot="icon" width="20" style="display:block;margin-right:5px;"></i>
          </cell>
        </group>
      </div>
      <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
        <x-header slot="header"
                  style="width:100%;position:absolute;left:0;top:0;z-index:100;"
                  :right-options="leftOptions"
                  :left-options="{showBack: false}"
                  :title="title"
                  :transition="headerTransition"
                  @on-click-more="onClickMore">
          <a slot="right"><span v-if="route.path === '/' || route.path === '/component/drawer'" slot="overwrite-right" @click="drawerVisibility = !drawerVisibility">
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span></a>
        </x-header>
        <router-view></router-view>
      </view-box>
    </drawer>
  </div>
</template>

<script>
  import { Group, GroupTitle, Cell, Badge, Drawer, Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom } from 'vux'
  import { mapState, mapActions } from 'vuex'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Group,
      GroupTitle,
      Cell,
      Badge,
      Drawer,
      ButtonTab,
      ButtonTabItem,
      ViewBox,
      XHeader,
      Tabbar,
      TabbarItem,
      Loading,
      Actionsheet
    },
    created() {
      this.adminType = window.localStorage.getItem('adminType')
    },
    methods: {
      dothis() {
        console.log('this~')
      },
      onShowModeChange(val) {
        /** hide drawer before changing showMode **/
        this.drawerVisibility = false
        setTimeout(one => {
          this.showModeValue = val
        }, 400)
      },
      onPlacementChange(val) {
        /** hide drawer before changing position **/
        this.drawerVisibility = false
        setTimeout(one => {
          this.showPlacementValue = val
        }, 400)
      },
      onClickMore() {
        this.showMenu = true
      },
      ...mapActions([
        'updateDemoPosition'
      ])
    },
    mounted() {
      this.handler = () => {
//        if (this.path === '/demo') {
//          this.box = document.querySelector('#demo_list_box')
//          this.updateDemoPosition(this.box.scrollTop)
//        }
      }
    },
    beforeDestroy() {
      this.box && this.box.removeEventListener('scroll', this.handler, false)
    },
    watch: {
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        isLoading: state => state.isLoading,
        direction: state => state.direction
      }),
      isShowBar() {
        if (/component/.test(this.path)) {
          return true
        }
        return false
      },
      leftOptions() {
        return {
          showBack: this.route.path !== '/'
        }
      },
      headerTransition() {
        return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
      },
      componentName() {
        // debugger
//        if (this.route.path) {
//          const parts = this.route.path.split('/')
//          if (/component/.test(this.route.path) && parts[2]) return parts[2]
//        }
      },
      isDemo() {
        // return /component|demo/.test(this.route.path)
      },
      isTabbarDemo() {
        // return /tabbar/.test(this.route.path)
      },
      title() {
        console.log(this.route.path)
        if (this.route.path === '/') return '物联网卡管理系统'
        if (this.route.path === '/demo') return 'Demo list'
        return this.componentName ? `Demo/${this.componentName}` : 'Demo/~~'
      }
    },
    data() {
      return {
        drawerVisibility: false,
        showMode: 'push',
        showModeValue: 'push',
        showPlacement: 'right',
        showPlacementValue: 'right',
        userName: this.$store.state.userName,
        adminType: ''
      }
    }
  }
</script>

<style lang="less" scope>
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';
  @import "../../common/less/index.less";
  .iconfont {
    font-size: 20px !important;
    vertical-align: bottom;
    color: @middle-blue;
  }
  .vux-label{
    color: @middle-blue;
  }
  .vux-tap-active {
  &:hover{
     background: @light-blue;
  .iconfont{
    color: @blue;
  }
  .vux-label{
    color: @blue;
  }
  }
  }
  .weui-cell{
    pading: 7px 15px !important;
  }
  body {
    background-color: #fbf9fe;
  }
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  .demo-icon-22 {
    font-family: 'vux-demo';
    font-size: 22px;
    color: #888;
  }
  .weui-tabbar.vux-demo-tabbar {
    /** backdrop-filter: blur(10px);
    background-color: none;
    background: rgba(247, 247, 250, 0.5);**/
  }
  .vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
    color: #F70968;
  }
  .vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
    color: rgb(53, 73, 94);
  }
  .demo-icon-22:before {
    content: attr(icon);
  }
  .vux-demo-tabbar-component {
    background-color: #F70968;
    color: #fff;
    border-radius: 7px;
    padding: 0 4px;
    line-height: 14px;
  }
  .weui-tabbar__icon + .weui-tabbar__label {
    margin-top: 0!important;
  }
  .vux-demo-header-box {
    z-index: 100;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }
  @font-face {
    font-family: 'vux-demo';  /* project id 70323 */
    src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot');
    src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot?#iefix') format('embedded-opentype'),
    url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.woff') format('woff'),
    url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.ttf') format('truetype'),
    url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.svg#iconfont') format('svg');
  }
  .demo-icon {
    font-family: 'vux-demo';
    font-size: 20px;
    color: #04BE02;
  }
  .demo-icon-big {
    font-size: 28px;
  }
  .demo-icon:before {
    content: attr(icon);
  }
  .router-view {
    width: 100%;
    top: 46px;
  }
  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    top: 46px;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }
  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .menu-title {
    color: #888;
  }
</style>
