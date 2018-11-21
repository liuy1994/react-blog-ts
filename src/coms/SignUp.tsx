import * as React from 'react'
import request, { SignForm } from '../services/request'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import './signup.less'
const FormItem = Form.Item

class SignUpForm extends React.Component<any, object> {
    constructor(props:any){
        super(props)
        this.state = {form: this.props.form}
    }
    signup = () => {
        this.props.form.validateFields((err: any, values: SignForm): void => {
            if (!err) {
                request.signup(values).then(() => {
                    window.location.href = '/#/list'
                })
            }
        })
    }
    checkName = (rule: object, value:string, callback:any): void => {
        if(!value) {
            callback('Please input your username!')
        } else {
            request.checkName(value).then((data: {uid: number}) => {
                if(data.uid) {
                    callback('账号已存在')
                } else{
                    callback()
                }
            })
        }
        
    }
    validPassword = (rule:object, value:string, callback:any) => {
        let password = this.props.form.getFieldValue('password')
        if(!value) {
            callback('Please input your password again!')
        } else {
            if(password !== value) {
                callback('两次密码输入不一致！')
            } else {
                callback()
            }
        }
    }
    formRules = {
        userName: [
            { required: true, validator: this.checkName }
        ],
        password: [
            { required: true, message: 'Please input your password!' }
        ],
        rePass: [
            { required: true, validator: this.validPassword }
        ]
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className="signup">
                <Form>
                    <FormItem label="用户名">
                        {getFieldDecorator('userName', { rules: this.formRules.userName })(
                            <Input placeholder="请输入用户名" onBlur={this.checkName.bind(this)}></Input>
                        )}
                    </FormItem>
                    <FormItem label="密码">
                        {getFieldDecorator('password', { rules: this.formRules.password })(
                            <Input placeholder="密码"></Input>
                        )}
                    </FormItem>
                    <FormItem label="确认密码">
                        {getFieldDecorator('rePass', { required: true, rules: this.formRules.rePass })(
                            <Input placeholder="再次输入密码"></Input>
                        )}
                    </FormItem>
                    <FormItem label="">
                        <div className="buttons">
                            <Button type="primary" onClick={this.signup}>注册</Button>
                            <Link to="/sign/in">登陆</Link>
                        </div>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const SignUp = Form.create()(SignUpForm)
export default SignUp