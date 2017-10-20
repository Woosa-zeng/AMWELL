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
          simType: 'warn',
          num: 3 // title 图标
        }
      }
    },
    created() {
      this.$store.commit('SIM_TYPE', {simType: 'warn'}) // sim_type
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
