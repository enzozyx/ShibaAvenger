import request from '../../../../utils/request';

export function queryDatabaseWithSchema(){
    return request('/sa/db/schemas/list', { method: 'get' });
}

export function querySchemaTableWithFields({ schema_id, index, size }){
    return request('/sa/db/schemas/tables/detail_list', { schema_id, index, size } );
}

export function updateField({ id, alias, name, type, comment, relation_id }){
    return request('/sa/db/schemas/tables/field/update', {
        method: 'post',
        body: JSON.stringify({ id, alias, name, type, comment, relation_id }),
        header: new Headers({
            'Content-Type': 'application/json'
        })
    });
}

export function addField({ alias, name, type, comment, relation_id }){
    return request('/sa/db/schemas/tables/field/add', {
        method: 'post',
        body: JSON.stringify({ alias, name, type, comment, relation_id }),
        header: new Headers({
            'Content-Type': 'application/json'
        })
    });
}

export function deleteField(id){
    return request('/sa/db/schemas/tables/field/delete', {
        method: 'delete',
        id
    });
}