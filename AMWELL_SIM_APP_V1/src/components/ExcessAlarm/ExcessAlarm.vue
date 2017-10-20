<template lang="html">
  <div id="enable">
    <contentc :parentObj="simTypeObj"></contentc>
  </div>
</template>
<script>
  import contentc from '../Content/Content'
  export default{
    data() {
      return {
        simTypeObj: {
          simType: 'exceed',
          num: 4 // title 图标
        }
      }
    },
    created() {
      this.$store.commit('SIM_TYPE', {simType: 'exceed'}) // sim_type
    },
    methods: {
    },
    components: {
      contentc
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
</style>
