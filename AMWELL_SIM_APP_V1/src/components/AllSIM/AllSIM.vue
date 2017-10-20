<template lang="html">
  <div id="allSIM">
    <contentc :parentObj="simTypeObj"></contentc>
  </div>
</template>
<script>
  import contentc from '../Content/Content'
  export default{
    data() {
      return {
        simTypeObj: {
          simType: '',
          num: 0 // title 图标
        }
      }
    },
    created() {
      this.$store.commit('SIM_TYPE', {simType: ''}) // sim_type
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
