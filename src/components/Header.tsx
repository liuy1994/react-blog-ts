import * as React from 'react'
import reducer from '../redux'
import cookie from '../utils/cookie'
import request from '../services/request'
import { Button } from 'antd'
import { connect } from 'react-redux'
import './Header.scss'
interface Props {
    userName: string
}

class Header extends React.Component<Props> {
    logout = (): void => {
        request.logout().then(() => {
            reducer.dispatch({
                type: 'LOGOUT'
            })
            cookie.removeItem('max_blog')
            window.location.href = '/#/sign/in'
        })
    }
    render() {
        let { userName } = this.props
        return (
            <div className="header">
                <div className="content">
                    {/*<div className="logo">*/}
                        {/*<Link to='/list'>This is a logo</Link>*/}
                    {/*</div>*/}
                    <div>Hello,&nbsp;&nbsp;
                        {userName ?
                            (<span><a href="/#/user">{userName}</a> <Button type="primary" size="small" onClick={this.logout}>注销</Button></span>)
                            : <a href="/#/sign/in">请先登录</a>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
interface StateProps {
    user: {
        userName: string
    }
}
const mapStateToProps = (state: StateProps) => {
    return {
        userName: state.user.userName
    }
}
export default connect(mapStateToProps)(Header)