<template>
  <div id="app" style="height: 100%;">
    <router-view></router-view>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'
export default {
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './assets/theme.less';

body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  .vux-tab-ink-bar {
    position: absolute;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: @middle-blue;
    text-align: center;
  }
}
</style>
