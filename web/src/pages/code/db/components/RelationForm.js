import React from 'react';
import { Form, Input, Cascader } from 'antd';

export default Form.create()( ({ form, relation={}, dbList }) => {
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: {span: 16}
    };
    const { getFieldDecorator, validateFields, getFieldsValue } = form;

    return (
        <Form {...formItemLayout} >
            <Form.Item label='选择所属模式'>
                {getFieldDecorator('db_schema_id', {
                    initialValue: [relation.db_id, relation.schema_id]
                })(
                    <Cascader key='db_schema' options={dbList}/>
                )}
            </Form.Item>
            <Form.Item label='名称'>
                { getFieldDecorator('name', {
                    initialValue: relation.name,
                })(
                    <Input key='name'/>
                ) }
            </Form.Item>
            <Form.Item label='中文名'>
                { getFieldDecorator('alias', {
                    initialValue: relation.alias,
                })(
                    <Input key='alias'/>
                ) }
            </Form.Item>
            <Form.Item label='说明'>
                { getFieldDecorator('comment', {
                    initialValue: relation.comment,
                })(
                    <Input key='comment'/>
                ) }
            </Form.Item>
        </Form>
    );
});