<template lang="html">
  <div class="news-detail">
    <vheader></vheader>
    <div class="border-1px"></div>
    <img :src="url" width="100%">
  </div>
</template>
<script type="text/ecmascript-6">
  import vheader from '../Header/Header'
  import axios from 'axios'
  import qs from 'qs'
  export default{
    components: {
      vheader
    },
    data() {
      return {
        url: ''
      }
    },
    created() {
      this.getNewInfo()
    },
    methods: {
      getNewInfo() {
        axios.post('/publicActivity/queryById', qs.stringify({
          activityId: this.$store.state.activitiesId
        })).then(res => {
          this.url = res.data.fullcontent
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import url('../../common/less/index.less');
</style>
