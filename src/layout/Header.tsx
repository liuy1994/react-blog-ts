import * as React from 'react'
import './Header.less'
import { Button } from 'antd'
import { connect } from 'react-redux'
import docCookies from '../utils/docCookies'
import request from '../services/request'
import store from '../redux/store'
interface Props {
  userName: string
}
class Header extends React.Component<Props> {
  logout = () => {
    request.logout().then(() => {
      store.dispatch({
        type: 'LOGOUT'
      })
      docCookies.removeItem('max_blog')
      window.location.href = '/#/sign/in'
    })
  }
  render() {
    let { userName } = this.props
    return (
      <div className="header">
        <div className="content">
            <div className="logo">
              This is a logo
            </div>
            {userName ? (
              <div className="about">
                Hello, userName,
                <Button type="primary" onClick={this.logout}>注销</Button>
              </div>
            ) : (
              <div>Hello, 请登录.</div>
            )
          }
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