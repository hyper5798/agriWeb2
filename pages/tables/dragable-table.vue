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
                <Option v-for="item in cityList" :value="item.deviceType" :key="item.deviceType">{{ item.typeName }})</Option>
            </Select>
          </Col>
          <Col span="6">
            
              起始日期
              <DatePicker type="date" 
                          v-model="findItem.start" 
                          placeholder="Select date" 
                          style="width: 200px" 
                          @on-change="handleChange"
                          format="yyyy-MM-dd"></DatePicker>
          
          </Col>
          <Col span="6">
            
              結束日期
              <DatePicker type="date" 
                          v-model="findItem.end" 
                          placeholder="Select date" 
                          style="width: 200px" 
                          @on-change="handleChange2"
                          format="yyyy-MM-dd"></DatePicker>
          
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
                    :columns="columnsList2"
                    :data="tableData2"
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
                          選擇裝置:{{findItem.mac}}
                    </col>
                    <Col span="4">
                          起始日期:{{findItem.start}}
                    </col>
                    <Col span="4">
                          結束日期:{{findItem.end}}
                    </col>
                    <Col span="8">
                      <ButtonGroup>
                        <Button type="info" ghost>
                          <Icon type="ios-grid-view"></Icon>
                          資料表
                        </Button>
                        <Button type="success">
                          <Icon type="ios-alarm"></Icon>
                          折線圖
                        </Button>
                      
                        <Button type="warning" ghost>
                          <Icon type="ios-refresh-empty"></Icon>
                          更新
                        </Button>
                        <Button type="primary">
                          <Icon type="ios-search"></Icon>
                          查詢
                        </Button>
                      </ButtonGroup>
                    </col>
                  </Row>
                </div>
                  
                <Table
                      height="350"
                      highlight-row
                      :columns="columnsList2"
                      :data="tableData2"
                      border>
                </Table>
                
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import DragableTable from '~/components/tables/components/dragableTable.vue'
import canEditTable from '~/components/tables/components/canEditTable.vue'
import iotData from '~/components/tables/components/iot_data.js'

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
      table2: {
        hasDragged: false,
        isDragging: false,
        oldIndex: 0,
        newIndex: 0,
        chooseRecord: []
      },
      selectType: '',
      cityList: [],
      findItem: {
        mac: '',
        start: '',
        end: ''
      }
    }
  },
  methods: {

    handleOnstart2(from) {
      
      this.table2.oldIndex = from
      this.table2.hasDragged = true
      this.table2.isDragging = true
    },
    handleOnend2(e) {
      this.table2.newIndex = e.to
      this.table2.isDragging = false
    },
    handleOnchoose2(from) {
      this.table2.chooseRecord.unshift(this.tableData[from].todoItem)
    },
    getData() {
      this.selectType = this.$store.state.device.map[0]['deviceType'] 
      this.cityList = this.$store.state.device.map
      this.columnsList2 = iotData.deviceColumns2
      console.log('this.cityList :')
      console.log(this.cityList)
      this.columnsList = [
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        },
        {
          title: '待办事项',
          key: 'todoItem'
        },
        {
          title: '备注',
          key: 'remarks'
        },
        {
          title: '拖拽',
          key: 'drag',
          width: 90,
          align: 'center',
          render: h => {
            return h('Icon', {
              props: {
                type: 'arrow-move',
                size: 24
              }
            })
          }
        }
      ]
      this.tableData = [
        {
          todoItem: '明天去后海玩',
          remarks: '估计得加班'
        },
        {
          todoItem: '后天去和妹子看电影',
          remarks: '可能没妹子'
        },
        {
          todoItem: '大后天去吃海天盛筵',
          remarks: '没钱就不去了'
        },
        {
          todoItem: '周末去看电影',
          remarks: '估计得加班'
        },
        {
          todoItem: '下个月准备回家看父母',
          remarks: '估计得加班'
        },
        {
          todoItem: '该买回家的票了',
          remarks: '可能没票了'
        },
        {
          todoItem: '过年不回家和父母视频聊天',
          remarks: '一定要记得'
        },
        {
          todoItem: '去车站接父母一起在北京过年',
          remarks: 'love'
        }
      ]
    },
    selectDevice (selection, row) {
      this.findItem.mac = selection.device_mac
    },
    handleChange (date) {
        this.findItem.start = date;
    },
    handleChange2 (date) {
        this.findItem.end = date;
    }
  },
  created() {
    // 可在此从服务端获取表格数据
    this.getData()
  },
  watch: {
      selectType (data) {
        
        let list = this.$store.state.device.list
        let arr = []
        for(let i=0; i < list.length; ++i) {
          let obj = list[i]
          if(Number(data) == obj.fport) {
            arr.push(obj)
          }
        }

        this.tableData2 = arr
        if(arr.length>0 && arr[0]['device_mac']) {
          this.findItem.mac = arr[0]['device_mac']
        } else {
          this.findItem.mac = ''
        }
        
      }
  }
}
</script>
