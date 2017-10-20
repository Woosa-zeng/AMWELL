<template lang="html">
  <div class="waiting">
    <section class="waiting-content">
      <img src="./06.png" width="133">
      <p>服务项目尚未启动<br>敬请期待</p>
    </section>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    created() {
    },
    methods: {}
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
.waiting{
  height: 100%;
  overflow: hidden;
  .waiting-content{
    margin-top: 50%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-size: 13px;
    color: #666;
  }
}
</style>
