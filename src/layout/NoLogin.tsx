import * as React from 'react'
import Login from '../coms/Login'
import SignUp from '../coms/SignUp'
// import './NoLogin.less'

interface Props {
  match: {
    path: string
  }
}

import { Switch, Route, Redirect } from 'react-router-dom'
class NoLogin extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    const { match } = this.props
    return (
      <div className="noLogin">
        <Switch>
          <Redirect exact path="/" to={{ pathname: '/in' }} />
          <Route path={`${match.path}/in`} component={Login}></Route>
          <Route path={`${match.path}/up`} component={SignUp}></Route>
        </Switch>
      </div>
    )
  }
}
export default NoLogin
