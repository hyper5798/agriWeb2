<style lang="less">
@import '../../assets/css/common.less';
.add-btn {
  float: right;
  margin-right: 10px;
}
.device-item {
  padding: 0 0 0 10px;
  height: 550px;
  border-bottom: 1px dashed #c3c3c3;
}
.edittable-test-con {
  height: 160px;
}
.edittable-table-height-con {
  height: 190px;
}
.edittable-con-1 {
  box-sizing: content-box;
  padding: 15px 0 0;
  height: auto;
}
.edittable-table-get-currentdata-con {
  height: 190px !important;
}
.exportable-table-download-con1 {
  padding: 16px 0 16px 20px;
  border-bottom: 1px dashed #c3c3c3;
  margin-bottom: 16px;
}
.exportable-table-download-con2 {
  padding-left: 20px;
}
.show-image {
  padding: 20px 0px;
}
.show-image img {
  display: block;
  width: 100%;
  height: auto;
}
.searchable-table {
  &-con1 {
    height: 230px !important;
  }
}
</style>

<template>
    <div>
        <Row>
          <Col span="5">
            <div class="device-item">
              <Table
                    height="550"
                    highlight-row
                    :columns="columnsList"
                    :data="tableData"
                    border
                    @on-row-click="selectMap">
              </Table>
            </div>
            
          </Col>
          <Col span="19">
            <div class="device-item">
              <Card>
                <div slot="title">
                    <Icon type="load-b"></Icon>
                    說明：點選左邊類型後, 以下會依選擇裝置篩選
                    <Tooltip class="add-btn" v-bind:content="addTitle">
                        <Button class="add-btn" 
                                type="primary" 
                                shape="circle" 
                                icon="android-add-circle"
                                @click="addDevice">
                        </Button>
                    </Tooltip>
                    
                </div>
                
                <div >
                    <can-edit-table 
                          refs="table1" 
                          @on-delete="handleDel" 
                          v-model="tableData2" 
                          :columns-list="columnsList2"
                          @on-test="handleTest">
                    </can-edit-table>
                </div>
              </Card>
            </div>
            <Modal
              v-model="modal1"
              v-bind:title="addTitle"
              :loading="loading"
              @on-ok="checkNew"
              @on-cancel="cancel">
              <Input v-model="params.d" style="width: 300px">
                <span slot="prepend">裝置識別碼(字元長度16) </span>
              </Input>
            </Modal>
          </Col>
        </Row>
    </div>
</template>

<script>
import canEditTable from '~/components/tables/components/canEditTable.vue'
import iotData from '~/components/tables/components/iot_data.js'
import { addDevice, deleteDevice } from '~/libs/api'
export default {
  name: 'editable-table',
  components: {
    canEditTable
  },
  data() {
    return {
      loading: false,
      columnsList: [],
      tableData: [],
      columnsList2: [],
      tableData2: [],
      showCurrentTableData: false,
      mapList: [],
      addTitle: '新增裝置',
      targetMap: {},
      modal1: false,
      data: [],
      params: {
        token: this.$store.state.user.token,
        d: '00000000',
        type: 'LoRaM',
        fport: ''
      }
    }
  },
  methods: {
    async handleTest (devices, index) {
      let device = devices[index]
      /* alert(device.device_mac)
      let list = this.$store.state.device.list
      let flag = 0
      for(let i=0; i < list.length; i++) {
        if (list[i].device_mac === device.device_mac) {
          break;
        }
        ++flag
      }
      list.splice(flag, 1) */
      // alert(JSON.stringify(device))
      let params = {
                      token: this.$store.state.user.token,
                      delDeviceId: device.deviceId,
                      mac: device.device_mac,
                      name: this.$store.state.user.info.name
                   }
      // alert(JSON.stringify(params))
      let req = await deleteDevice(this.params)
      // alert(JSON.stringify(JSON.stringify(req)))
      this.$router.push({
        path:this.$route.fullPath, // 获取当前连接，重新跳转
        query:{
        _time:new Date().getTime()/1000 // 时间戳，刷新当前router
        }
      })
    },
    async checkNew() {
      if(this.params.d.length != 16){
        this.$Message.error({
          content: '裝置識別碼字元長度 '+this.params.d.length + ' ,不正確請再次輸入',
          duration: 2,
          closable: true
        })
      }
      let req = await addDevice(this.params)
      console.log('deleye result :', JSON.stringify(req))
      if (req.data.responseCode == '000') {
        this.$Message.success({
          content: '裝置識別碼字元長度 '+this.params.d.length + ' ,新增裝置成功',
          duration: 2,
          closable: true
        })
        this.getDeviceList()
      }
    },
    async getDeviceList() {
      let params = {token: this.$store.state.user.token}
      let req2 = await getSensorList(params)
      /* if(req2.data && req2.data.mList) {
        store.commit('device/SET_LIST', req2.data.mList)
      } */
      this.$router.push({
        path:this.$route.fullPath, // 获取当前连接，重新跳转
        query:{
        _time:new Date().getTime()/1000 // 时间戳，刷新当前router
        }
      })
    },
    cancel() {

    },
    addDevice() {
      this.modal1= true
    },
    getData() {
      this.columnsList = iotData.testColumns
      this.tableData = this.$store.state.device.map
      this.columnsList2 = iotData.deviceColumns
      let list = this.$store.state.device.list
      // console.log('managergetData list:')
      // console.log(this.tableData)
      this.targetMap = this.tableData[0]
      this.setMapDevice()
    },
    setMapDevice() {
      this.data = []
      let list = this.$store.state.device.list
      for(let i=0; i < list.length; ++i) {
        let obj = list[i]
        if(obj.fport == Number( this.targetMap.deviceType)) {
          this.data.push(obj)
        }
      }
      this.tableData2 = this.data
      this.addTitle = '增加' + this.targetMap.typeName + '裝置'
      this.params.fport = Number( this.targetMap.deviceType)
    },
    handleNetConnect(state) {
      this.breakConnect = state
    },
    handleLowSpeed(state) {
      this.lowNetSpeed = state
    },
    getCurrentData() {
      this.showCurrentTableData = true
    },
    handleDel(val, index) {
      this.$Message.success('删除了第' + (index + 1) + '行数据')
    },
    handleCellChange(val, index, key) {
      this.$Message.success(
        '修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据'
      )
    },
    handleChange(val, index) {
      this.$Message.success('修改了第' + (index + 1) + '行数据')
    },
    selectMap (selection, row) {
      this.targetMap = selection
      this.setMapDevice()
    }
  },
  created() {
    this.getData()
  }
}
</script>
