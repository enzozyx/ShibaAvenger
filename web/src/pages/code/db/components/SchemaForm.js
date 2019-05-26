import React from 'react';
import { Form, Input } from 'antd';

export default Form.create()( ({ form, schema={} }) => {
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: {span: 16}
    };
    const { getFieldDecorator, validateFields, getFieldsValue } = form;

    return (
        <Form {...formItemLayout} >
            <Form.Item label='名称'>
                { getFieldDecorator('name', {
                    initialValue: schema.name,
                })(
                    <Input key='name'/>
                ) }
            </Form.Item>
        </Form>
    );
});