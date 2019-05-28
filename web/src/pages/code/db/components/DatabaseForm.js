import React from 'react';
import { Form, Input, Select } from 'antd';

export default Form.create()( ({ form, database={}, dbList }) => {
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: {span: 16}
    };

    const dbCategoryDict = [
        { label: 'Mysql', value: 1 },
        { label: 'Postgresql', value: 2 },
        { label: 'Oracle', value: 3 },
        { label: 'SqlServer', value: 4 },
    ];

    const { getFieldDecorator, validateFields, getFieldsValue } = form;

    return (
        <Form {...formItemLayout} >
            { dbList ? (<Form.Item label='数据库'>
                    {getFieldDecorator('id', {
                        initialValue: database.id
                    })(
                        <Select key='key'>
                            {dbList.map(db => ( <Select.Option value={db.value}>{db.label}</Select.Option> ))}
                        </Select>)}
            </Form.Item>): '' }
            <Form.Item label='数据库类型'>
                { getFieldDecorator('category', {
                    initialValue: database.category,
                    rules: [
                        {required: true, message: '数据库类型不允许为空'}
                    ]
                })(
                    <Select key='category'>
                        {dbCategoryDict.map( category => (<Select.Option value={category.value}>{category.label}</Select.Option>) )}
                    </Select>
                ) }
            </Form.Item>
            <Form.Item label='名称'>
                { getFieldDecorator('name', {
                    initialValue: database.name,
                    rules: [
                        {required: true, message: '数据库name不允许为空'}
                    ]
                })(
                    <Input key='name'/>
                ) }
            </Form.Item>
            
            <Form.Item label='中文名'>
                { getFieldDecorator('alias', {
                    initialValue: database.alias,
                    rules: [
                        {required: true, message: '数据库中文名必填'}
                    ]
                })(
                    <Input key='alias' type='text'/>
                ) }
            </Form.Item>
            <Form.Item label='服务IP'>
                { getFieldDecorator('server_ip', {
                    initialValue: database.server_ip ? database.server_ip:'127.0.0.1',
                    rules: [
                        {required: true, message: '服务器IP必填'}
                    ]
                })(
                    <Input key='server_ip' type='text'/>
                ) }
            </Form.Item>
            <Form.Item label='服务端口'>
                { getFieldDecorator('server_port', {
                    initialValue: database.server_port,
                    rules: [
                        {required: true, message: '服务端口不允许为空'}
                    ]
                })(
                    <Input key='server_port'/>
                ) }
            </Form.Item>
            <Form.Item label='存储路径'>
                { getFieldDecorator('location', {
                    initialValue: database.location,
                })(
                    <Input key='location' type='text'/>
                ) }
            </Form.Item>
        </Form>
    );
});