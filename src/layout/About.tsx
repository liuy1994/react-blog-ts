import * as React from 'react'
import { Button } from 'antd'
import './About.less'
import docCookies from '../utils/docCookies'
import request from '../services/request'
class Main extends React.Component {
  logout = () => {
    request.logout().then(() => {
      docCookies.removeItem('max_blog')
      window.location.href = '/#/sign/in'
    })
  }
  render() {
    return (
      <div className="content-about">
        <Button type="primary" onClick={this.logout}>注销</Button>
      </div>
    )
  }
}
export default Main