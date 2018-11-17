import * as React from 'react'
import NoteList from '../coms/NoteList'
// import './Side.less'
class Side extends React.Component {
  render() {
    return (
      <div className="content-side">
        <NoteList></NoteList>
      </div>
    )
  }
}
export default Side