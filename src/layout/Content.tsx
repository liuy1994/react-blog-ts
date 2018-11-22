import * as React from 'react'
import './Content.less'
import Side from './Side'
import Main from './Main'

class Content extends React.Component<any,any> {
  render() {
    const {match} = this.props
    return (
      <div className="content">
        <Side></Side>
        <Main routePath={match}></Main>
      </div>
    )
  }
}
export default Content