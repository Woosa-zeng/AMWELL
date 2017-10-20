<template lang="html">
  <div id="ct">
    <!--<p class="text">{{parentObj.simType}}</p>-->

    <div id="simTree">
      <div class="title-wrapper">
        <div class="search-box">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
        </div>
        <div class="export">
          <a href="http://sim.zuchezaixian.net/export/exportSimbase"><el-button type="primary">导出所有</el-button></a>
        </div>
      </div>
      <div class="tree-box" id="treeBox">
        <el-tree highlight-current
          class="filter-tree"
          :data="companyData"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree2" @node-click="handleNodeClick">
        </el-tree>
      </div>
    </div>
    <div id="container">
      <div class="search-table" style="text-align: right">
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="SIM卡号" prop="msisdn">
            <el-input v-model="formInline.msisdn" placeholder="SIM卡号"></el-input>
          </el-form-item>
          <el-form-item label="ICCID" prop="iccid">
            <el-input v-model="formInline.iccid" placeholder="ICCID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetForm('formInline')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div id="simTable">
        <el-table
          :data="tableData"
          highlight-current-row
          @row-click ="handleRowClick"
          border
          style="width: 100%">
          <el-table-column
            prop="msisdn"
            label="SIM卡号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="iccid"
            label="ICCID">
          </el-table-column>
          <el-table-column
            prop="serviceStartDate"
            label="服务开始时间">
          </el-table-column>
          <el-table-column
            prop="serviceEndDate"
            label="服务结束时间">
          </el-table-column>
          <!--<el-table-column
            prop="totalFlow"
            label="流量消耗 (M)">
          </el-table-column>-->
          <el-table-column
            prop="totalFlow"
            label="总流量 (M)">
          </el-table-column>
          <el-table-column
            prop="usedFlow"
            label="已使用流量 (M)">
          </el-table-column>
          <el-table-column
            prop="address"
            label="余额">
          </el-table-column>
        </el-table>
      </div>
      <div id="paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="totalPages">
        </el-pagination>
      </div>
      <div id="simDetail">
        <el-tabs type="border-card" @tab-click="tabClick">
          <el-tab-pane label="SIM卡信息">
            <simInfo :simObj="simDetail"></simInfo>
          </el-tab-pane>
          <el-tab-pane label="指令发送">
            <sendingInstruction :simObj="simDetail"></sendingInstruction>
          </el-tab-pane>
          <el-tab-pane label="发送记录">
            <messageRecord :simObj="simDetail"></messageRecord>
          </el-tab-pane>
          <el-tab-pane label="接收记录">
            <receiveRecord :simObj="simDetail"></receiveRecord>
          </el-tab-pane>
          <el-tab-pane label="短信群发">
            <batchMsg :simObj="simDetail"></batchMsg>
          </el-tab-pane>
          <!--<el-tab-pane label="月度情况">-->
            <!--<monthly></monthly>-->
          <!--</el-tab-pane>-->
          <!--<el-tab-pane label="年度情况">-->
            <!--<annual></annual>-->
          <!--</el-tab-pane>-->
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
  import simInfo from '../simInfo/simInfo'
  import sendingInstruction from '../sendingInstruction/sendingInstruction'
  import messageRecord from '../messageRecord/messageRecord'
  import receiveRecord from '../receiveRecord/receiveRecord'
  import monthly from '../monthly/monthly'
  import annual from '../annual/annual'
  import batchMsg from '../batchMsg/batchMsg'

  export default{
    props: {
      parentObj: {
        type: Object
      }
    },
    computed: {
    },
    created() {
      this.loadNode()
    },
    data() {
      return {
        allsim: {},
        tableLength: 0,
        currentPage: this.parentObj.pageNum,
        pageSize: 5,
        totalPages: 0,
        currentId: '',
        companyName: '',
        companyData: [], // 公司数据树
        filterText: '', // 搜索条件过滤
        defaultProps: { // 公司数据树属性
          children: 'children',
          label: 'shortName'
        },
        currentCompanyProps: { // 当前选择公司属性
          name: '',
          companyId: '',
          simIds: ''
        },
        defaltCompanyId: '',
        defaltTableRowId: null,
        clickCompanyId: null,
        tableData: [],
        simDetail: {
          message: {},
          model: {}
        }, // 传给子组件的sim信息
        regions: [],
        props: {
          label: 'name',
          children: 'zones'
        },
        count: 1,
        formInline: {
          iccid: '',
          msisdn: ''
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },
    mounted() {
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.shortName.indexOf(value) !== -1
      },
      handleRowClick(data) {
        let id = data ? data.id : this.defaltTableRowId
        this.$http.post('/simBaseInfo/querySimBaseInfoById', {
          id: id
        }).then((res) => {
          this.simDetail = res.body
          if (res.body.code === -100) { // 登录超时，跳转到登录页面
            this.$router.push({name: 'login'})
          }
        }, (res) => {
          this.$message.error(res)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.$http.post('/simBaseInfo/queryall', {
          iccid: this.formInline.iccid,
          msisdn: this.formInline.msisdn,
          companyId: this.currentId,
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          type: this.parentObj.simType
        }).then((res) => {
          res = res.body
          if (res.obj.list.length) {
            this.tableData = res.obj.list
            this.totalPages = res.obj.total
            this.handleRowClick(this.tableData[0]) // 默认查询第一行
          } else {
            this.clearData()
          }
          if (res.code === -100) { // 登录超时，跳转到登录页面
            this.$router.push({name: 'login'})
          }
        }, (res) => {
          this.$message.error(res)
        })
      },
      handleNodeClick(data) {
        this.currentId = data ? data.id : this.defaltCompanyId
        this.currentPage = 1
        this.$http.post('/simBaseInfo/queryall', {
          companyId: this.currentId,
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          type: this.parentObj.simType,
          iccid: this.formInline.iccid,
          msisdn: this.formInline.msisdn
        }).then((res) => {
          res = res.body
          if (res.obj.list.length) {
            this.tableData = res.obj.list
            this.totalPages = res.obj.total
            this.defaltTableRowId = this.tableData[0].id // 默认查询第一行
            this.handleRowClick()
          } else {
            this.clearData()
          }
          if (res.code === -100) { // 登录超时，跳转到登录页面
            this.$router.push({name: 'login'})
          }
        }, (res) => {
          this.$message.error(res)
        })
      },
      loadNode() {
        this.$http.post('/simcompany/querySimCompanyStatTree', {
          type: this.parentObj.simType
        }).then((res) => {
          this.companyData = []
          this.companyData.push(res.body.obj)
          if (!this.clickCompanyId) {
            this.defaltCompanyId = this.companyData[0].id
            this.handleNodeClick()
            this.clickCompanyId = this.companyData[0].id
          }
          if (res.body.code === -100) { // 登录超时，跳转到登录页面
            this.$router.push({name: 'login'})
          }
        })
      },
      onSubmit() {
        this.handleCurrentChange(1)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.formInline.daterange = ''
      },
      clearData() {
        let simData = {
          message: {},
          model: {}
        }
        this.$message.error('暂无数据!')
        this.defaltTableRowId = []
        this.simDetail = simData
        this.tableData = []
        this.totalPages = 0
      },
      tabClick(obj) {
        if (obj.index === '2' || obj.index === '3') { // 查看发送记录或接收记录
          this.defaltTableRowId = this.tableData[0].id
          this.handleRowClick()
        }
      }
    },
    components: {
      simInfo,
      sendingInstruction,
      messageRecord,
      receiveRecord,
      monthly,
      annual,
      batchMsg
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .title-wrapper{
    display: flex;
    .export{
      flex: 0 0 95px;
      width: 95px;
      margin-top: 10px;
    }
    .search-box{
      flex: 1;
    }
  }
  #ct{
    display: flex;
  }
  #simTree {
    width: 375px;
    flex: 375px 0 0;
    height:100%;
  .input-box,.tree-box{
    margin: 10px;
  }
  .input-box{
  .el-icon-search{
    cursor: pointer;
  }
  }
  .search-box{
    margin: 10px;
  }
  .tree-box{
    margin: 12px;
    max-height: 640px;
    overflow-y: auto;
  .el-tree{
    border: none;
  }
  }
  }
  #container{
    flex: 1;
    margin: 10px;
  #paging{
    text-align: right;
    margin: 20px;
  }
  #simDetail{

  }
  }
</style>
