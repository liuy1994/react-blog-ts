import * as React from 'react'
import './Main.less'
// import ContentEdit from './ContentEdit'
// import ContentList from './ContentList'
// import ContentItem from './ContentItem'
import { Switch, Route, Redirect } from 'react-router-dom'

interface Props {
  routePath: {
    path: string
  }
}
class Main extends React.Component<Props, object> {
  render() {
    // const { routePath } = this.props
    return (
      <div className="content-main">
      123456788865123568976543245689
        {/* <Link to="/">list&nbsp;&nbsp;&nbsp;&nbsp;</Link>
        <Link to="/add">add&nbsp;&nbsp;&nbsp;&nbsp;</Link>
        <Link to="/edit/344">edit&nbsp;&nbsp;&nbsp;&nbsp;</Link>
        <Link to="/detail">detail&nbsp;&nbsp;&nbsp;&nbsp;</Link> */}
        <Switch>
          <Redirect exact path="/" to={{ pathname: '/list' }} />
          {/* <Route path={`${routePath.path}list`} component={ContentList}></Route>
          <Route path={`${routePath.path}add`} component={ContentEdit}></Route>
          <Route path={`${routePath.path}edit/:id`} component={ContentEdit}></Route>
          <Route path={`${routePath.path}detail/:id`} component={ContentItem}></Route> */}
        </Switch>
      </div>
    )
  }
}
export default Main