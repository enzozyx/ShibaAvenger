import * as dbService from '../services/databaseService';

export default {
   namespace: 'database',
   state: {
        db: [
            { label: 'test', value: 1, children: [
                { label: 'public', value: 1 }
            ] }
        ],
        tables: [],
        currentSchema: null,
        currentDatabase: null
   },
   reducers: {
        updateSchemas(state, { payload: data }){
            return {...state, db: data};
        },
        updateTables(state, { payload: tables }){
            return {...state, tables};
        },
        updateDatabaseSchema(state, { payload: { schema_id, database_id } }){
            return {...state, currentSchema: schema_id, currentDatabase: database_id};
        }
   },
   effects:{
        *loadSchemas(payload, { call, select, put }){
            const data = yield call(dbService.queryDatabaseWithSchema);
            yield put({
                type: 'updateSchemas',
                payload: data.map( db => {
                    return {
                        label: db.alias,
                        value: db.id,
                        children: db.schemas ? db.schemas.map( schema => {
                            return {
                                label: schema.alias,
                                value: schema.id
                            }
                        } ): []
                    }
                } )
            }); 
        },
        *querySchemaTables({ payload: {schema_id, database_id, index, size} }, { call, select, put }){
            const data = yield call(dbService.querySchemaTableWithFields, {schema_id, index, size});
            let schemaIndex = 1;
            yield put({
                type: 'updateDatabaseSchema',
                payload: {
                    schema_id,
                    database_id
                }
            });
            yield put({
                type: 'updateTables',
                payload: data.map( schema => {
                    let fieldIndex = 1;
                    return {
                        name: schema.name,
                        id: schema.id,
                        number: schemaIndex++,
                        alias: schema.alias,
                        statu: schema.statu,
                        comment: schema.comment,
                        field_count: schema.fields? schema.fields.length: 0,
                        fields: schema.fields ? schema.fields.map( field => {
                            return {
                                id: field.id,
                                name: field.name,
                                alias: field.alias,
                                field_type: field.type,
                                comment: field.comment,
                                statu: field.statu,
                                lasted: field.lasted,
                                number: fieldIndex++
                            }
                        } ): []
                    }
                } )
            });
        },
        *addField({payload: field}, { call, select, put }){
            yield call(dbService.addField, field);
            const {schema_id, database_id} = select(state => { return { schema_id: state.currentSchema, database_id: state.currentDatabase}});
            put({
                type: 'querySchemaTables',
                payload: {
                    database_id,
                    schema_id,
                    index: 1,
                    size: 10
                }
            });
        },
        *updateField({payload: field}, { call, select, put }){
            yield call(dbService.updateField, field);
            const {schema_id, database_id} = select(state => { return { schema_id: state.currentSchema, database_id: state.currentDatabase}});
            put({
                type: 'querySchemaTables',
                payload: {
                    database_id,
                    schema_id,
                    index: 1,
                    size: 10
                }
            });
        },
        *deleteField({payload: id}, { call, select, put }){
            yield call(dbService.deleteField, id);
            const {schema_id, database_id} = select(state => { return { schema_id: state.currentSchema, database_id: state.currentDatabase}});
            put({
                type: 'querySchemaTables',
                payload: {
                    database_id,
                    schema_id,
                    index: 1,
                    size: 10
                }
            });
        },
        *addDatabase({ payload: { name, alias, server_ip, server_port, category, location }}, {call, select, put}){
            yield call();
            yield put({
                tyep: 'loadSchemas'
            });
        },
        *updateDatabase({ payload: {id, name, alias, server_ip, server_port, category, location } }, {call, put}){
            yield call();
            yield put({
                tyep: 'loadSchemas'
            });
        },
        *deleteDatabase({ payload: { id } }, {call, put, select}){
            yield call();
            yield put({
                type: 'loadSchemas'
            });
        },
        *addSchema({ payload: { name, alias, db_id } }, { call, select, put }){
            yield call();
            yield put({
                type: 'loadSchemas'
            });
        },
        *updateSchema({ payload: {id, name, alias, db_id } }, { call, select, put }){
            yield call();
            yield put({
                type: 'loadSchemas'
            });
        },
        *deleteSchema({ payload: { id } }, { call, select, put }){
            yield call();
            yield put({
                type: 'loadSchemas'
            });
        },
        *addRelation({ payload: { name, alias, database_id, schema_id, comment } }, { call, select, put }){
            yield call();
            yield put({
                type: 'querySchemaTables',
                payload: { database_id, schema_id, index: 1, size: 10 }
            });
        },
        *updateRelation({ payload: { id, name, alias, database_id, schema_id, comment }}, { call, select, put }){
            yield call();
            yield put({
                type: 'querySchemaTables',
                payload: { database_id, schema_id, index: 1, size: 10 }
            });
        },
        *deleteRelation({payload: { id} }, { call, select, put }){
            yield call();
            const { database_id, schema_id } = yield select(state => { 
                return { database_id: state.currentDatabase, schema_id: state.currentSchema };
            });
            yield put({
                type: 'querySchemaTables',
                payload: { database_id, schema_id, index: 1, size: 10 }
            });
        }
   },
   subscriptions: {
        setupHistory({ dispatch, history }) {
            history.listen(location => {
                if(location.pathname === '/code/db')
                dispatch({
                    type: 'loadSchemas',
                    payload: {}
                })
            })
        },
   }
}