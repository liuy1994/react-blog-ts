import * as React from 'react'
import './Footer.less'
import { Icon, Popover } from 'antd'
import { iconUrl } from '../utils/constant'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: iconUrl,
})

class Footer extends React.Component {
  render() {
    const wechat = (
      <div className="wechat-img">
        <img src="http://liuy1994.oss-cn-hongkong.aliyuncs.com/blog/wechat.jpg" width="256" height="256" alt="wechat"/>
      </div>
    )
    return (
      <div className="footer">
        <div className="content">
          <a href="https://github.com/liuy1994/react-blog-ts" title="github" target="_blank" rel="noopener"><IconFont type="icon-github" /></a>
          <a href="javascript: void(0);"><Popover content={wechat}><IconFont type="icon-wechat" /></Popover></a>
          <a href="mailto:liuy1994@outlook.com" title="outlook"><IconFont type="icon-OUTLOOK" /></a>
        </div>
      </div>
    )
  }
}
export default Footer