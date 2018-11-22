import * as React from 'react'
import { Button } from 'antd'
import './About.less'
import docCookies from '../utils/docCookies'
import request from '../services/request'
import { connect } from 'react-redux'

interface Props {
  userName: string
}

class About extends React.Component<Props> {
  logout = () => {
    request.logout().then(() => {
      docCookies.removeItem('max_blog')
      window.location.href = '/#/sign/in'
    })
  }
  render() {
    let {userName} = this.props
    return (
      <div className="content-about">
        <p>hello, {userName}</p>
        <p><Button type="primary" onClick={this.logout}>注销</Button></p>
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
export default connect(mapStateToProps)(About)