<template lang="html">
  <div>
    <div class="msg-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="消息文本" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="submitForm('ruleForm')" :disabled="!simObj.model.msisdn">立即发送</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary"
               @click="selectLayer">
      选择sim号
    </el-button>
    <el-button type="primary"
               @click="toLeadLayer">
      导入sim号
    </el-button>
    <div v-show="selectLayerFlag" :class="{selectLayerFlag}">
      <div class="selectLayerWrapper">
        <el-input v-model="startSIM" placeholder="SIM开始" class="mb10" style="width: 200px;"></el-input>
        <el-input v-model="endSIM" placeholder="SIM结束" style="width: 200px;"></el-input>
        <el-button type="primary"
                   @click="searchSIM">
          搜索
        </el-button>
      </div>
    </div>
    <div v-show="toLeadLayerFlag" :class="{toLeadLayerFlag}">
      <div class="toLeadLayerWrapper">
        <el-upload
          class="upload"
          action="/up/uploadExcel"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">请根据模板上传，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
    <div class="mt20">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="msisdn"
          label="sim卡号">
        </el-table-column>
      </el-table>
    </div>
    <div :class="{layer}" @click.self="closeLayer"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    props: {
      simObj: {
        type: Object
      }
    },
    data() {
      return {
        all: [],
        fileList: [],
        startSIM: '',
        endSIM: '',
        layer: true,
        selectLayerFlag: true,
        toLeadLayerFlag: false,
        multipleSelection: [],
        tableData3: [],
        ruleForm: {
          desc: ''
        },
        rules: {
          desc: [
            { required: true, message: '请填写消息内容', trigger: 'blur' }
          ]
        }
      }
    },
    created() {},
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange(val) {
        this.multipleTable = val
        this.all = []
        for (let i = 0; i < val.length; i++) {
          this.all.push(this.tableData3[i].msisdn)
        }
      },
      submitForm(formName) {
        console.log(`desc===${this.ruleForm.desc}`)
        if (!this.ruleForm.desc.length) {
          this.$message.error('消息内容不能为空!!')
          return false
        }
        if (this.all.length < 1) {
          this.$message.error('SIM卡号不能为空!!')
          return false
        }
        console.log('allsim=== ' + this.all)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/msg/sendMassMsg', {
              arrMsisdn: this.all.toString(),
              content: this.ruleForm.desc
            }).then((res) => {
              res = res.body
              if (res.status === 'ok') {
                this.resetForm('ruleForm')
                this.$message({
                  type: 'success',
                  message: '消息发送成功！'
                })
              } else {
                this.$message.error(res.msg)
              }
            }, res => {
              this.$message.error('error: ' + res)
            })
          } else {
            this.$message.error('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      searchSIM() {
        this.$http.post('/simBaseInfo/querySimBaseInfo', {
          startMsisdn: this.startSIM,
          endMsisdn: this.endSIM
        }).then(res => {
          if (res.body.obj.length) {
            this.tableData3 = res.body.obj
            this.$message({
              type: 'success',
              message: `查询成功，共${res.body.obj.length}条数据`
            })
            this.closeLayer()
          } else {
            this.$message.error('没有查到数据~')
          }
          console.log(this.tableData3)
        })
      },
      selectLayer() {
        this.layer = true
        this.selectLayerFlag = true
      },
      toLeadLayer() {
        this.layer = true
        this.toLeadLayerFlag = true
      },
      closeLayer() {
        this.layer = false
        this.selectLayerFlag = false
        this.toLeadLayerFlag = false
        this.startSIM = ''
        this.endSIM = ''
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handleSuccess(res) {
        if (res.length) {
          this.tableData3 = res
          this.$message({
            type: 'success',
            message: `读取成功，共${res.length}条数据`
          })
          this.closeLayer()
        } else {
          this.$message.error('读取数据出错，请按模板上传~')
        }
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scope>
  .mt20{
    margin-top: 20px;
  }
  .layer{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 666;
    background: #000;
    opacity: 0.5;
  }
  .selectLayerFlag,.toLeadLayerFlag{
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    min-width: 600px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    margin-bottom: 50px;
    z-index: 777;
  }
  .selectLayerWrapper,.toLeadLayerWrapper{
    margin: 60px auto;
    width: 500px;
  }
</style>
