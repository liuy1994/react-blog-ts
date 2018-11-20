import * as React from 'react'
import './Content.css'
import Side from './Side'
// import Main from '../components/Main'
import About from './About'

class Content extends React.Component<any,any> {
  render() {
    // const {match} = this.props
    return (
      <div className="content">
        <Side></Side>
        {/* <Main routePath={match}></Main> */}
        <About></About>
      </div>
    )
  }
}
export default Content