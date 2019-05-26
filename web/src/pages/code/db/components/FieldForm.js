import React from 'react';
import { Form, Input, Select, Button } from 'antd';


export default Form.create()((props) => {
    const { record, onSubmit, onCancel, form: { getFieldDecorator, validateFields, getFieldsValue } } = props;

    const fieldTypeDict = [
        { label: '整型', value: 1 },
        { label: '字符串', value: 2 },
        { label: '短整型', value: 3 },
        { label: '日期(yyyy-MM-dd)', value: 4 },
        { label: '时间(HH:mm:ss)', value: 5 },
        { label: '时间戳(yyyy-MM-dd HH:mm:ss)', value: 6 },
        { label: '浮点数', value: 7 },
        { label: '其它', value: 8 }
    ];
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    }

    return (
        <Form  onSubmit={onSubmit}>
            <Form.Item {...formItemLayout} label='id' style={{display: 'none'}}>
                {getFieldDecorator('id', {
                    initialValue: record.id
                })(
                    <Input key='id'/>
                )}
            </Form.Item>
            <Form.Item {...formItemLayout} label='relation_id' style={{display: 'none'}}>
                {getFieldDecorator('relation_id', {
                    initialValue: record.relation_id
                })(
                    <Input key='relation_id'/>
                )}
            </Form.Item>
            <Form.Item {...formItemLayout} label={(<span>字段名</span>)} >
                {getFieldDecorator('name', {
                        rules: [
                            {required: true, message: '字段名必填，请使用英文编码' }
                        ],
                        initialValue: record.name
                    })(
                        <Input key='name' type='text'  />
                    )}
            </Form.Item>
            <Form.Item {...formItemLayout} label={(<span>字段中文名</span>)}>
                    {getFieldDecorator('alias', {
                        rules: [
                            {required: true, message: '中文名必填' }
                        ],
                        initialValue: record.alias
                    })(
                        <Input key='alias' type='text' />
                    )}
            </Form.Item>
            <Form.Item {...formItemLayout} label={(<span>字段类型</span>)}>
                    {getFieldDecorator('type', {
                        rules: [
                            {required: true, message: '字段类型不允许为空' }
                        ],
                        initialValue: record.field_type
                    })(
                        <Select key='type'  >
                            {fieldTypeDict.map(type => ( <Select.Option value={type.value}>{type.label}</Select.Option> ))}                           
                        </Select>
                    )}
            </Form.Item>
            <Form.Item {...formItemLayout} label={(<span>注释</span>)}>
                    {getFieldDecorator('comment', {
                        initialValue: record.comment
                    })(
                        <Input key='comment' />
                    )}
            </Form.Item>
            <Form.Item style={{textAlign: "right"}}>
                <Button style={{ marginRight: '5px' }} type='cancel' onClick={onCancel}>取消</Button>
                <Button type='primary' onClick={() => {
                    validateFields( (err) => {
                        console.log(err);
                        if(!err)
                            onSubmit(getFieldsValue());
                    } );
                    }} >提交</Button>
            </Form.Item>
        </Form>
    );

});