import * as React from 'react'
import './User.less'
import request, { UserInfo } from '../services/request'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
const FormItem = Form.Item
interface Props{
  form: {
    getFieldDecorator: any,
    validateFields: any
  },
  userId: number,
  match: {
    path: string,
    params: {
      id: number
    }
  }
}

class UserForm extends React.Component<Props & FormComponentProps, UserInfo>{
  constructor(props: Props & FormComponentProps) {
    super(props)
    this.state = {
      name: '',
      email: '',
      mobile: '',
      wechat: ''
    }
  }
  saveUserInfo = () => {
    this.props.form.validateFields((err: any, values: UserInfo) => {
      if (!err) {
        let params = {
          ...values,
          name: this.state.name
        }
        request.updateUserInfo(params).then(() => {
          this.getUserInfo()
        })
      }
    })
  }
  getUserInfo = () => {
    request.getUserInfo().then((data: UserInfo) => {
      this.setState({
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        wechat: data.wechat
      })
    })
  }
  componentDidMount() {
    this.getUserInfo()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    let {name,email,mobile,wechat} = this.state
    return (
      <div className="user">
        <Form layout="vertical">
          <FormItem label="用户名">
            <p>{name}</p>
          </FormItem>
          <FormItem label="邮箱">
            {getFieldDecorator('email', {
              initialValue: email,
              // rules: [{ required: true, message: 'Please input your email!', }],
            })(<Input placeholder="请输入邮箱"></Input>)}
          </FormItem>
          <FormItem label="手机号">
            {getFieldDecorator('mobile', {
              initialValue: mobile,
              // rules: [{ required: true, message: 'Please input your mobile!', }],
            })(<Input placeholder="请输入邮箱"></Input>)}
          </FormItem>
          <FormItem label="微信号">
            {getFieldDecorator('wechat', {
              initialValue: wechat,
              // rules: [{ required: true, message: 'Please input your wechat!', }],
            })(<Input placeholder="请输入微信号"></Input>)}
          </FormItem>
          <FormItem label="">
            <Button type="primary" onClick={this.saveUserInfo}>保存</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const User = Form.create()(UserForm)
export default User