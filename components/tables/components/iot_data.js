export const typeColumns = [
  {
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
  },
  {  
    title: '類型名稱',
    align: 'center',
    key: 'typeName',
    editable: true
  },
  {
    title: '類型代號',
    align: 'center',
    key: 'deviceType'
  },
  {
    title: '創建日期',
    align: 'center',
    key: 'createTime',
    render: function (h) {
      return h('div', 
        this.row.createTime)
    }
  },
  {
    title: '創建人員',
    align: 'center',
    key: 'createUser'
  }/* ,
  {
    title: '操作',
    align: 'center',
    width: 240,
    key: 'handle'
  } */
];

export const parseColumns = [
  {
    title: '欄位',
    align: 'center',
    key: 'field',
    editable: true
  },
  {
    title: '啟始前一位',
    align: 'center',
    width: 120,
    key: 'start',
    editable: true
  },
  {  
    title: '結束位置',
    align: 'center',
    width: 120,
    key: 'end',
    editable: true
  },
  {
    title: '公式',
    align: 'center',
    key: 'operation',
    editable: true
  },
  {
    title: '欄位名稱',
    align: 'center',
    width: 300,
    key: 'fieldName',
    editable: true
  },
  {
    title: '操作',
    align: 'center',
    width: 240,
    key: 'handle',
    handle: ['edit', 'delete']
  }
];

export const deviceColumns = [
  {
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
  },
  {  
    title: '名稱',
    align: 'center',
    key: 'device_name',
    editable: true
  },
  {
    title: '識別碼',
    align: 'center',
    key: 'device_mac'
  },
  {
    title: '裝置狀態',
    align: 'center',
    key: 'device_status',
    editable: true
  },
  {
    title: '是否啟用',
    align: 'center',
    key: 'statusDesc'
  },
  {
    title: '類型代號',
    align: 'center',
    key: 'fport'
  },
  {
    title: '操作',
    align: 'center',
    width: 240,
    key: 'handle',
    handle: ['edit', 'delete']
  }
];


const tableData = {
  typeColumns: typeColumns,
  parseColumns: parseColumns,
  deviceColumns: deviceColumns
};

export default tableData;
