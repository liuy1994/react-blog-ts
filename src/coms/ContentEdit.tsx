import * as React from 'react'
import request from '../services/request'
import { Form, Input, Button, Switch } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import './ContentEdit.less'
import ContentInput from './ContentInput'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
const FormItem = Form.Item
export interface Props {
    form: {
        getFieldDecorator: any,
        validateFields: any
    },
    selectedNoteId: number,
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
                    id: this.state.id,
                    noteId: this.props.selectedNoteId
                }
                request.saveContentItem(params).then(() => {
                    window.location.href = '/#/list'
                })
            }
        })
    }
    getDetail(){
        let { id } = this.props.match.params
        request.getContentDetail(id).then((data: State) => {
            this.setState({
                name: data.name,
                brief: data.brief,
                content: data.content,
                id: data.id
            })
        })
    }
    inputContent = (content: string):any => {
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
        const { match, selectedNoteId } = this.props
        return (
            <div className="content-edit-form">
                <h3>{match.params.id ? '编辑' : '新增'}博文</h3>
                <Form layout="vertical">
                    <FormItem label="名称">
                        {getFieldDecorator('name', {
                            initialValue: name,
                            rules: [{ required: true, message: 'Please input your blog name!', }],
                        })(<Input placeholder="请输入名称"></Input> )}
                    </FormItem>
                    <FormItem label="简介">
                        {getFieldDecorator('brief', {
                            initialValue: brief,
                            rules: [{ required: true, message: 'Please input your brief!', }],
                        })(<Input placeholder="请输入简介"></Input> )}
                    </FormItem>
                    <FormItem label="正文">
                        {getFieldDecorator('content', {
                            initialValue: content,
                            rules: [{ required: true, message: 'Please input your content!', }],
                        })(<ContentInput noteId={selectedNoteId} content={content} onInput={this.inputContent}/>)}
                    </FormItem>
                    <FormItem label="直接发布" {...formItemLayout}>
                        {getFieldDecorator('publish', {
                            initialValue: true
                        })( <Switch defaultChecked />)}
                    </FormItem>
                    <FormItem label="">
                        <Link to='/list'><Button className="back-button">返回</Button></Link>
                        <Button type="primary" onClick={this.saveItem}>保存</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const MainAdd = Form.create()(AddForm)
const mapStateToProps = (state: { notelist: Props}) => {
  return {
    selectedNoteId: state.notelist.selectedNoteId
  }
}
export default connect(mapStateToProps)(MainAdd)