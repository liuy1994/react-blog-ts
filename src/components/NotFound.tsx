import * as React from 'react'

import { Link } from 'react-router-dom'
class NotFound extends React.Component {
  render() {
    return (
      <div>NOT FOUND
        <Link to="/">回到首页</Link>
      </div>
    )
  }
}
export default NotFound