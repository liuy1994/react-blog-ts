import * as React from 'react'
// import request from '../services/request'
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item
import request from "../services/request";

interface Props {
  form: any
}
interface LoginForm {
  userName: string,
  password: string
}

class Login extends React.Component<any, any> {
  constructor(props: Props){
    super(props)
  }
  login = () => {
    this.props.form.validateFields((err: object, values: LoginForm) => {
      if (!err) {
        request.login(values).then(() => {
          // docCookies.setItem('max_blog', data)
          window.location.href = '#/list'
        })
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <Form>
          <FormItem label="用户名">
            {getFieldDecorator('userName', {
              initialValue: '测试444444',
              rules: [{ required: true, message: 'Please input your username!', }],
            })(<Input placeholder="请输入用户名"></Input>)}
          </FormItem>
          <FormItem label="密码">
            {getFieldDecorator('password', {
              initialValue: '12345678',
              rules: [{ required: true, message: 'Please input your password!', }],
            })(<Input placeholder="密码"></Input>)}
          </FormItem>
          <FormItem label="">
            <div className="buttons">
              <Button type="primary" onClick={this.login}>登陆</Button>
              {/* <Link to="/sign/up">注册</Link> */}
            </div>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const LoginForm = Form.create()(Login)
export default LoginForm