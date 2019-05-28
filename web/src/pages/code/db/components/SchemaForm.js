import React from 'react';
import { Form, Input, Cascader, Select } from 'antd';

export default Form.create()( ({ form, schema={}, dbList, isAdd=true }) => {
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: {span: 16}
    };
    const { getFieldDecorator, validateFields, getFieldsValue } = form;

    return (
        <Form {...formItemLayout} >
            {
                !isAdd 
                ? (<Form.Item label='选择模式'>
                    {getFieldDecorator('schema', {
                        initialValue: [ schema.db_id ,schema.id],
                        rules: [{
                            required: true, message: '必选选择修改的模式'
                        }]
                    })(
                        <Cascader options={dbList} disabled/>
                    )}
                    </Form.Item>) 
                : (<Form.Item label='选择数据库'>
                    {getFieldDecorator('db_id', {
                        initialValue: schema.db_id,
                        rules: [{
                            required: true, message: '必选选择所属数据库'
                        }]
                    })(
                        <Select key='db_id'>
                            {dbList.map( db => (<Select.Option value={db.value}>{db.label}</Select.Option>) )}
                        </Select>
                    )}
                    </Form.Item>) 
            }
            <Form.Item label='名称'>
                { getFieldDecorator('name', {
                    initialValue: schema.name,
                })(
                    <Input key='name' type='text'/>
                ) }
            </Form.Item>
            <Form.Item label='中文名'>
                { getFieldDecorator('alias', {
                    initialValue: schema.name,
                })(
                    <Input key='alias' type='text'/>
                ) }
            </Form.Item>
        </Form>
    );
});