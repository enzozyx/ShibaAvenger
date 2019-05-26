
import styles from './index.css';
import { Row, Col, Cascader, Table, Divider, Modal } from 'antd';
import Toolbar from './components/Toolbar';
import { connect } from 'dva';
import FieldForm from './components/FieldForm';
import SchemaForm from './components/SchemaForm';
import DatabaseForm from './components/DatabaseForm';
import RelationForm from './components/RelationForm';

function mapPropsToState( {database} ){
    return database;
}

export default connect(mapPropsToState)(function( props ) {
  
  const dbMenus = [
    { type: 'plus', event: () => {
      let modal = Modal.confirm({
        title: '添加数据库',
        content: (<DatabaseForm />)
      });
      modal.update();
    } },
    { type: 'edit', event: () => {
      let modal = Modal.confirm({
        title: '修改数据库',
        content: (<DatabaseForm />)
      });
      modal.update();
    } },
    { type: 'delete', event: () => {
      let modal = Modal.confirm({
        title: '确认删除',
        content: `确认删除数据库`
      });
      modal.update();
    } }
  ];
  const schemaMenus = [
    { type: 'plus', event: () => {
      let modal = Modal.confirm({
        title: '添加模式',
        content: ( <SchemaForm /> )
      });
      modal.update();
    } },
    { type: 'edit', event: () => {
      let modal = Modal.confirm({
        title: '修改模式',
        content: ( <SchemaForm /> )
      });
      modal.update();
    } },
    { type: 'delete', event: () => {
      let modal = Modal.confirm({
        title: '删除模式',
        content: `确认删除模式`
      });
      modal.update();
    } }
  ];
  const tableMenus = [
    { type: 'plus', event: () => {
      let modal = Modal.confirm({
        title: '添加关系表',
        content: ( <RelationForm /> )
      });
      modal.update();
    } },
    { type: 'edit', event: () => {
      let modal = Modal.confirm({
        title: '修改关系',
        content: ( <RelationForm /> )
      });
      modal.update();
    }},
    { type: 'delete', event: () => {
      let modal = Modal.confirm({
        title: '确认删除',
        content: ( <RelationForm /> )
      });
      modal.update();
    } }
  ];

  const tableDisplayColumns = [
    { title: '序号', dataIndex: 'number', key: 'number' },
    { title: '关系名', dataIndex: 'name', key: 'name' },
    { title: '表名', dataIndex: 'alias', key: 'alias' },
    { title: '状态', dataIndex: 'statu', key: 'statu' },
    { title: '字段数量', dataIndex: 'field_count', key: 'field_count' },
    { title: '备注', dataIndex: 'comment', key: 'comment' },
    { title: '操作', dataIndex: 'actions', render: (text, record) => (
        <span>
          <a onClick={ () => {
              let modal = Modal.confirm(
                {
                  title: '添加字段',
                  content: (<FieldForm record={{relation_id: record.id}} onCancel={ () => modal.destroy() } onSubmit={(value) => {
                        props.dispatch({
                          type: 'database/addField',
                          payload: value
                        });
                        modal.destroy();
                    }}/>),
                  cancelButtonProps: { style: {display: 'none'} },
                  okButtonProps: { style:{display: 'none'} }
                }
              );
              modal.update();
            }}>添加字段</a>
        </span>
    )},
  ];

  function addColumn(record){
    console.log('add column ' + record.id);
  }

  function updateColumn(record){
    console.log('update column ' + record);
  }

  function deleteColumn(record){
    console.log('delete column ' + record);
  }

  function updateTables(selectSchema){
    if(props.dispatch){
      props.dispatch({
        type: 'database/querySchemaTables',
        payload: {
          database_id: selectSchema[0],
          schema_id: selectSchema[1],
          index: 1,
          size: 10
        }
      });
    }
  }

  function expendColumnTable(record){

    let colColumns = [
      { title: '序号', dataIndex: 'number', key: 'number' },
      { title: '字段名', dataIndex: 'name', key: 'name' },
      { title: '字段中文名', dataIndex: 'alias', key: 'alias' },
      { title: '字段类型', dataIndex: 'field_type', key: 'field_type' },
      { title: '状态', dataIndex: 'statu', key: 'statu' },
      { title: '备注', dataIndex: 'comment', key: 'comment' },
      { title: '操作', dataIndex: 'actions', render: (text, record) => (
          <span>
            <a onClick={ () => {
                let modal = Modal.info({
                  title: '修改字段',
                  content: (<FieldForm record={record}  onCancel={ () => modal.destroy() } onSubmit={(value) => {
                        props.dispatch({
                          type: 'database/updateField',
                          payload: value
                        });
                        modal.destroy();
                    }}/>),
                  cancelButtonProps: { style: {display: 'none'} },
                  okButtonProps: { style:{display: 'none'} }
                });
                modal.update();
              }  
            }>修改字段</a>
            <Divider type='verticcal'/>
            <a onClick={ () => {
                let modal = Modal.confirm({
                  title: '确认删除',
                  content: `确认删除字段 ${record.alias}`,
                  onCancel: () => modal.destroy(),
                  onOk: () => {
                    props.dispatch({
                      type: 'database/deleteField',
                      payload: record.id
                    });
                    modal.destroy();
                  }
                });
                modal.update();
              } }>删除字段</a>
          </span>
      )},
    ];

    return (
      <Table 
        columns={colColumns}
        dataSource={record.fields? record.fields: []}
        pagination={false}
      />
    );
  }
  
  return (
    <div >
      <Row style={{ textAlign: 'left', marginTop:'5px' }}>
          <Toolbar menus={dbMenus} toggleType="database" defaultToggel={true}/>
          <Toolbar menus={schemaMenus} toggleType="tags" defaultToggel={true}/>
          <Toolbar menus={tableMenus} toggleType="table" defaultToggel={true}/>
      </Row>
      <Row >
        <Row >
          <Col span={8} style={{marginLeft: '10px'}}>
            <Cascader options={props.db} placeholder='请选择数据库/模式' onChange={updateTables}/>
          </Col>
        </Row>
        <Table 
            columns={tableDisplayColumns}
            expandedRowRender={expendColumnTable}
            dataSource={props.tables}
        />
      </Row>
    </div>
  );
});
