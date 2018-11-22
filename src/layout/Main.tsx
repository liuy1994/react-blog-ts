import * as React from 'react'
import './Main.less'
import ContentEdit from '../coms/ContentEdit'
import ContentList from '../coms/ContentList'
import ContentItem from '../coms/ContentItem'
import User from '../coms/User'
import { Switch, Route, Redirect } from 'react-router-dom'

interface Props {
  routePath: {
    path: string
  }
}
class Main extends React.Component<Props, object> {
  render() {
    const { routePath } = this.props
    return (
      <div className="content-main">
        {/* <Link to="/">list&nbsp;&nbsp;&nbsp;&nbsp;</Link>
        <Link to="/add">add&nbsp;&nbsp;&nbsp;&nbsp;</Link>
        <Link to="/edit/344">edit&nbsp;&nbsp;&nbsp;&nbsp;</Link>
        <Link to="/detail">detail&nbsp;&nbsp;&nbsp;&nbsp;</Link> */}
        <Switch>
          <Redirect exact path="/" to={{ pathname: '/list' }} />
          <Route path={`${routePath.path}user`} component={User}></Route>
          <Route path={`${routePath.path}list`} component={ContentList}></Route>
          <Route path={`${routePath.path}add`} component={ContentEdit}></Route>
          <Route path={`${routePath.path}edit/:id`} component={ContentEdit}></Route>
          <Route path={`${routePath.path}detail/:id`} component={ContentItem}></Route>
        </Switch>
      </div>
    )
  }
}
export default Main