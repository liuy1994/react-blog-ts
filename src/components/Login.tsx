import * as React from 'react'
import './Login.scss'
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item
import request, { userForm, AxiosResponse } from '../services/request'
import { Link } from 'react-router-dom'
import cookie from '../utils/cookie'
import reducer from '../redux'

interface LoginRes extends AxiosResponse {
    jwt: string;
    userName: string;
}


class Login extends React.Component<any, any> {
    login = () => {
        this.props.form.validateFields((err: any, values: userForm) => {
            request.login(values).then( (res: AxiosResponse<LoginRes>) => {
                console.log(res)
                reducer.dispatch({
                    type: 'LOGIN',
                    userName: res.data.userName
                })
                cookie.setItem('max_blog', res.data.jwt)
                window.location.href = '#/list'
            })
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div className="login">
                <Form>
                    <FormItem label="用户名">
                        {getFieldDecorator('userName', {
                            initialValue: '测试用户',
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(<Input placeholder="请输入用户名" />)}
                    </FormItem>
                    <FormItem label="密码">
                        {getFieldDecorator('password', {
                            initialValue: '12345678',
                            rules: [{ required: true, message: 'Please input your password!' }],
                        })(<Input placeholder="密码" />)}
                    </FormItem>
                    <FormItem label="">
                        <div className="buttons">
                            <Button type="primary" onClick={this.login}>登录</Button>
                            <Link to="/sign/up">注册</Link>
                        </div>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Form.create()(Login)