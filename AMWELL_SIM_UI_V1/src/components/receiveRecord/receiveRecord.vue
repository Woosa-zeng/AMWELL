<template lang="html">
 <div id="receiveRecord">
    <el-button type="primary"
    @click="refresh"
    >点击刷新</el-button>
    <el-table
     :data="tableData"
     border
     style="width: 100%">
     <el-table-column label="ICCID" width="200">
       <template scope="scope">{{ scope.row.iccid }}</template>
     </el-table-column>
     <el-table-column label="SIM卡号" width="145">
       <template scope="scope">{{ scope.row.mobile }}</template>
     </el-table-column>
     <el-table-column label="接收状态" width="100">
       <template scope="scope">{{ scope.row.status_msg }}</template>
     </el-table-column>
     <el-table-column label="短信内容">
       <template scope="scope">{{ scope.row.content }}</template>
     </el-table-column>
     <el-table-column label="原因" width="180">
       <template scope="scope">{{ scope.row.reason }}</template>
     </el-table-column>
     <el-table-column label="时间" width="180">
       <template scope="scope">{{ scope.row.createDate_s }}</template>
     </el-table-column>
     <el-table-column label="流水号" width="180">
       <template scope="scope">{{ scope.row.serialNumber }}</template>
     </el-table-column>
     <el-table-column label="推送成功标识" width="180">
       <template scope="scope">{{ scope.row.pushResult }}</template>
     </el-table-column>
   </el-table>
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
 </div>
</template>
<script>
  export default{
    props: {
      simObj: {
        type: Object
      }
    },
    data() {
      return {
        currentPage: 1,
        pageSize: 5,
        totalPages: null,
        tableData: []
      }
    },
    watch: {
      simObj() {
        this.getMsgData()
      }
    },
    methods: {
      refresh() {
        this.$http.post('/recv/flushSimRecvData', {
          iccid: this.simObj.model.iccid
        }).then((res) => {
          this.getMsgData()
          this.currentPage = 1
          this.$message({
            message: '刷新成功！',
            type: 'success'
          })
        })
      },
      getMsgData() {
        this.$http.post('/recv/queryByPage', {
          pageNum: 1,
          pageSize: this.pageSize,
          iccid: this.simObj.model.iccid
        }).then((res) => {
          res = res.body
          this.tableData = res.obj.list
          this.totalPages = res.obj.total
        }, res => {
          this.$message.error('error: ' + res)
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.$http.post('/recv/queryByPage', {
          iccid: this.simObj.model.iccid,
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }).then((res) => {
          res = res.body
          console.log(res)
          this.tableData = res.obj.list
        }, (res) => {
          this.$message.error(res)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
#receiveRecord{
  button{
    margin-bottom: 10px;
  }
  .blue{
    color:#20A0FF;
  }
  .green{
    color: #13CE66;
  }
  .red{
    color: #FF4949;
  }
  #paging{
    margin-top: 10px;
  }
  table{ 
    tr:nth-child(odd){
      background: #f5f8fc;
    }
    th{
      background: #f2f5fa;
    }
    td,th{
      height:28px;
      line-height: 28px;
      font-size: 14px;
      text-align: center;
      border: 1px solid #dfe6ec;
    }
  }
}
</style>
