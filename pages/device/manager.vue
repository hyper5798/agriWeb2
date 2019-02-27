<style lang="less">
@import '../../assets/css/common.less';
.type-item {
  height: 500px;
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
                    height="600"
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
                <p slot="title">
                    <Icon type="load-b"></Icon>
                    說明：點選左邊類型後, 以下會依選擇裝置篩選
                </p>
                <div >
                    <can-edit-table refs="table1" @on-delete="handleDel" v-model="tableData2" :columns-list="columnsList2"></can-edit-table>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
    </div>
</template>

<script>
import canEditTable from '~/components/tables/components/canEditTable.vue'
import iotData from '~/components/tables/components/iot_data.js'
export default {
  name: 'editable-table',
  components: {
    canEditTable
  },
  data() {
    return {
      columnsList: [],
      tableData: [],
      olumnsList2: [],
      tableData2: [],
      showCurrentTableData: false,
      mapList: []
    }
  },
  methods: {
    getData() {
      this.columnsList = iotData.testColumns
      this.tableData = this.$store.state.device.map
      this.columnsList2 = iotData.deviceColumns
      this.tableData2 = this.$store.state.device.list
      console.log('managergetData list:')
      console.log(this.tableData)
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
      let list = this.$store.state.device.list
      let data = []
      for(let i=0; i < list.length; ++i) {
        let obj = list[i]
        if(obj.fport == Number( selection.deviceType)) {
          data.push(obj)
        }
      }
      this.tableData2 = data
    }
  },
  created() {
    this.getData()
  }
}
</script>
