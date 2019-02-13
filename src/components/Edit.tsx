import * as React from 'react'
import request, { AxiosResponse } from '../services/request'
import { Form, Input, Button, Switch } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import './Edit.scss'
import ContentInput from './Editor'
import { Link } from 'react-router-dom'
const FormItem = Form.Item

export interface Props {
    form: {
        getFieldDecorator: any,
        validateFields: any
    },
    match: {
        path: string,
        params: {
            id: number
        }
    }
}
interface State {
    name: string,
    brief: string,
    content: string,
    id: any
}
class AddForm extends React.Component<Props & FormComponentProps, State> {
    constructor(props: Props & FormComponentProps) {
        super(props)
        this.state = {
            name: '',
            brief: '',
            content: '',
            id: null
        }
    }
    saveItem = () => {
        this.props.form.validateFields((err: any, values: State) => {
            if (!err) {
                let params = {
                    ...values,
                    id: this.state.id
                }
                request.saveContentItem(params).then(() => {
                    window.location.href = '/#/list'
                })
            }
        })
    }
    getDetail(){
        let { id } = this.props.match.params
        request.getContentDetail(id).then((res: AxiosResponse<State>) => {
            this.setState({
                name: res.data.name,
                brief: res.data.brief,
                content: res.data.content,
                id: res.data.id
            })
        })
    }
    inputContent = (content: string) => {
        this.setState({
            content
        })
    }
    componentWillMount() {
        if(this.props.match.path !== '/add') this.getDetail()
    }
    
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20, align: "left" },
        }
        let { name, brief, content} = this.state
        const { match } = this.props
        // const { match } = this.props
        return (
            <div className="content-edit-form">
                <h3>{match.params.id ? '编辑' : '新增'}博文</h3>
                <Form layout="vertical">
                    <FormItem label="名称">
                        {getFieldDecorator('name', {
                            initialValue: name,
                            rules: [{ required: true, message: 'Please input your blog name!', }],
                        })(<Input placeholder="请输入名称" /> )}
                    </FormItem>
                    <FormItem label="简介">
                        {getFieldDecorator('brief', {
                            initialValue: brief,
                            rules: [{ required: true, message: 'Please input your brief!', }],
                        })(<Input placeholder="请输入简介" /> )}
                    </FormItem>
                    <FormItem label="正文">
                        {getFieldDecorator('content', {
                            initialValue: content,
                            rules: [{ required: true, message: 'Please input your content!', }],
                        })(<ContentInput onInput={this.inputContent} text={content} />)}
                    </FormItem>
                    <FormItem label="直接发布" {...formItemLayout}>
                        {getFieldDecorator('publish', {
                            initialValue: true
                        })( <Switch defaultChecked />)}
                    </FormItem>
                    <FormItem label="">
                        <Button type="primary" onClick={this.saveItem}>保存</Button>
                        <Link to='/list'><Button className="back-button">返回</Button></Link>
                    </FormItem>
                    <div className="blank" />
                </Form>
            </div>
        )
    }
}

export default Form.create()(AddForm)