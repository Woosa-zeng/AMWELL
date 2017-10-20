<template lang="html">
<div>
  <group>
    <cell :title="item.shortName" is-link v-for="item in cellItems" @click.native="goSIMpage(item.id, item.shortName)"></cell>
  </group>
</div>
</template>
<script type="text/ecmascript-6">
  import { Group, Cell, CellBox, Search } from 'vux'
  import axios from 'axios'
  export default{
    components: {
      Search,
      Group,
      Cell,
      CellBox
    },
    data() {
      return {
        cellItems: []
      }
    },
    created() {
      this.loadNode()
    },
    methods: {
      loadNode() {
        axios.get('/simcompany/querySimCompanyTree').then((res) => {
          res = res.data
          if (res.code) {
            this.cellItems = res.obj.children
          }
        })
      },
      goSIMpage(id, name) {
        console.log('id===' + id + 'name===' + name)
        this.$store.commit('SIM_COMPANY_ID', {simCompanyId: id})
        this.$store.commit('SIM_COMPANY_NAME', {simCompanyName: name})
        this.$router.push({name: 'SIMAllocation'})
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">

</style>
