<style lang="less">
@import '../../assets/css/common.less';
.seletc-item {
  background-color: #ffffff;
  width: 100%;
  height: 50px;
  padding: 0px 10px;
  line-height: 50px;
}
.dragging-tip-con {
  display: block;
  text-align: center;
  width: 100%;
  height: 50px;
}
.dragging-tip-con span {
  font-size: 18px;
}
.record-tip-con {
  display: block;
  width: 100%;
  height: 292px;
  overflow: auto;
}
.record-item {
  box-sizing: content-box;
  display: block;
  overflow: hidden;
  height: 24px;
  line-height: 24px;
  padding: 8px 10px;
  border-bottom: 1px dashed gainsboro;
}
.record-tip-con span {
  font-size: 14px;
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
  height: 196px;
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
        <Row class="seletc-item">
          <Col span="6">
            選擇類型
            <Select v-model="selectType" style="width:200px">
                <Option v-for="item in mapList" :value="item.deviceType" :key="item.deviceType">{{ item.typeName }})</Option>
            </Select>
          </Col>
          <Col span="6">
            起始日期：
            <DatePicker type="date" 
                        v-model="start" 
                        placeholder="選擇起始日期" 
                        style="width: 200px" 
                        @on-change="handleChange"
                        format="yyyy-MM-dd">
            </DatePicker>
          </Col>
          <Col span="6">
            結束日期：
            <DatePicker type="date" 
                        v-model="end" 
                        placeholder="選擇結束日期" 
                        style="width: 200px" 
                        @on-change="handleChange2"
                        format="yyyy-MM-dd">
            </DatePicker>
          </Col>
        </Row>
        <Row class="margin-top-10">
            <Col span="5" class="height-100">
            <Card>
                <p slot="title">
                    <Icon type="clipboard"></Icon>
                     選擇裝置
                </p>
                <Table
                    height="350"
                    highlight-row
                    :columns="columnsList"
                    :data="tableData"
                    border
                    @on-row-click="selectDevice">
                </Table>
            </Card>
            </Col>
            <Col span="19" class="padding-left-10">
            <Card>
                <div slot="title" >
                  <Row >
                    <Col span="6">
                          <Icon type="clipboard"></Icon>
                          選擇裝置:{{findItem.macAddr}}
                    </col>
                    <Col span="4">
                          起始日期:{{start}}
                    </col>
                    <Col span="4">
                          結束日期:{{end}}
                    </col>
                    <Col span="8">
                      <ButtonGroup>
                        <Button type="primary" ghost>
                          <Icon type="ios-grid-view"></Icon>
                          資料表
                        </Button>
                        <Button type="primary">
                          <Icon type="ios-alarm"></Icon>
                          折線圖
                        </Button>
                      
                        <Button type="primary">
                          <Icon type="ios-refresh-empty"></Icon>
                          更新
                        </Button>
                        <Button type="primary" @click="toFind">
                          <Icon type="ios-search" ></Icon>
                          查詢
                        </Button>
                      </ButtonGroup>
                    </col>
                  </Row>
                </div>
                <div>
                  <Table
                      height="350"
                      highlight-row
                      :columns="columnsList2"
                      :data="tableData2"
                      border>
                  </Table>
                </div>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import DragableTable from '~/components/tables/components/dragableTable.vue'
import canEditTable from '~/components/tables/components/canEditTable.vue'
import iotData from '~/components/tables/components/iot_data.js'
import { getEventList } from '~/libs/api'
import util from '~/libs/util.js'

export default {
  name: 'dragable-table',
  components: {
    DragableTable,
    canEditTable
  },
  data() {
    return {
      columnsList: [],
      tableData: [],
      columnsList2: [],
      tableData2: [],
      allList: {},
      table2: {
        hasDragged: false,
        isDragging: false,
        oldIndex: 0,
        newIndex: 0,
        chooseRecord: []
      },
      selectType: '',
      selectedMap: {},
      mapList: [],
      start: '2018-10-01',
      end: '',
      findItem: {
        macAddr: '',
        from: '',
        to: '',
        paginate: false, 
        limit: 5000
      }
    }
  },
  methods: {
    getData() {
      this.selectType = this.$store.state.device.map[0]['deviceType'] 
      this.mapList = this.$store.state.device.map
      this.columnsList = iotData.deviceColumns2
      
      let list = this.$store.state.device.list
      let arr = []
      for(let i=0; i < list.length; ++i) {
        let obj = list[i]
        let type = obj.fport
        if(this.allList[type] == undefined) {
          this.allList[type] = []
        }
        (this.allList[type]).push(obj)
      }
      console.log(JSON.stringify(this.allList))
    },
    selectDevice (selection, row) {
      this.findItem.macAddr = selection.device_mac
    },
    handleChange (date) {
        this.start = date;
    },
    handleChange2 (date) {
        this.end = date;
    },
    async toFind () {
      // 取得table header -- start
      let keys = Object.keys(this.selectedMap.fieldName)
      let values = Object.values(this.selectedMap.fieldName)
      this.columnsList2 = JSON.parse(JSON.stringify(iotData.eventColumns))
      for(let i = 0; i < values.length; ++i) {
        let obj = {
          title: values[i],
          align: 'center',
          key: 'information',
          render: function (h) {
            return h('div', this.row.information[keys[i]]);
          }
        }
        this.columnsList2.push(obj)
      } 
      console.log('keys :', JSON.stringify(keys))
      console.log('values :', JSON.stringify(values))
      console.log('values :', JSON.stringify(this.columnsList2))
      this.findItem.token = this.$store.state.user.token
      this.findItem.from = this.start + ' 00:00:00Z+8'
      this.findItem.to = this.end + ' 00:00:00Z+8'
      
      this.findItem.macAddr = this.findItem.macAddr.toLowerCase();
      let req = await getEventList(this.findItem)
      if(req.data && req.data.data) {
        this.tableData2 = req.data.data
      }
    },
    getMapAndDevice (type) {
      // type選中的類型代號
      // 取得選中的類型
      for(let i = 0; i < this.mapList.length; i++) {
        let map = this.mapList[i]
        if(map.deviceType == type) {
          this.selectedMap = map
        }
      }
      //取得類型下裝置
      this.tableData = this.allList[type]
      //取得類型下裝置列表第一個裝置mac
      if(this.tableData.length>0 && this.tableData[0]['device_mac']) {
        this.findItem.macAddr = this.tableData[0]['device_mac']
      } else {
        this.findItem.macAddr = ''
      }
    }
  },
  created() {
    // 可在此从服务端获取表格数据
    this.getData()
  },
  watch: {
      selectType (data) {
        this.getMapAndDevice(data)
      }
  }
}
</script>
