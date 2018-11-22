import * as React from 'react'
import './Footer.less'
import { Icon } from 'antd'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_930533_nzsh6cy2fm.js',
})

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="content">
          <a href="" title="node"><IconFont type="icon-Nodejs" /></a>
          <a href="" title="react"><IconFont type="icon-React" /></a>
          <a href="" title="webpack"><IconFont type="icon-webpack" /></a>
          <a href="" title="redux"><IconFont type="icon-redux" /></a>
          <a href="" title="github" target="_blank" rel="noopener"><IconFont type="icon-github" /></a>
        </div>
      </div>
    )
  }
}
export default Footer