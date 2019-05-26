export default {
    'GET /sa/db/schemas/list': {
        code: 200,
        msg: 'SUCCESS',
        data: [ 
            {name: 'db_test', alias: '测试', id: 1, schemas: [
                { name: 'public', alias: '公共', id: 1 },
                { name: 'shiba', alias: 'sa', id: 2 },
            ]}
        ]
    },
    'GET /sa/db/schemas/tables/detail_list': {
        code: 200,
        msg: 'SUCCESS',
        data: [
            { id: 1, name: 't_test', alias: '表1', lasted: '2019-05-02 12:00:00', statu: 1, comment: '测试', fields: [
                { id: 2, relation_id: 1,  name: 'id', alias: '主键ID', lasted: '2019-05-02 12:00:00', statu: 1, comment: '主键ID', type: 1 },
                { id: 3, relation_id: 1,  name: 'name', alias: '字段名', lasted: '2019-05-02 12:00:00', statu: 1, comment: '主键ID', type: 2 },
                { id: 4, relation_id: 1,  name: 'alias', alias: '字段中文名', lasted: '2019-05-02 12:00:00', statu: 1, comment: '主键ID', type: 2 },
                { id: 5, relation_id: 1,  name: 'type', alias: '字段类型', lasted: '2019-05-02 12:00:00', statu: 1, comment: '主键ID', type: 3 },
                { id: 6, relation_id: 1,  name: 'comment', alias: '字段说明', lasted: '2019-05-02 12:00:00', statu: 1, comment: '主键ID', type: 2 }
            ] }
        ],
        page: {
            index: 1,
            size: 5,
            total: 1
        }
    },
    'POST /sa/db/schemas/tables/field/add':  {
        code: 200,
        msg: 'SUCCESS',
        data: true
    },
    'POST /sa/db/schemas/tables/field/update':  {
        code: 200,
        msg: 'SUCCESS',
        data: true
    },
    'DELETE /sa/db/schemas/tables/field/delete':  {
        code: 200,
        msg: 'SUCCESS',
        data: true
    },

}