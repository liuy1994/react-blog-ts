import * as React from 'react'
import './Header.less'
import { connect } from 'react-redux'
import docCookies from '../utils/docCookies'
import request from '../services/request'
import store from '../redux/store'
interface Props {
  userName: string
}
class Header extends React.Component<Props> {
  logout = (): void => {
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
          <div>Hello, <a href="/#/user">{userName}</a> <a href="javascript: void(0);" onClick={this.logout}>注销</a></div>
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