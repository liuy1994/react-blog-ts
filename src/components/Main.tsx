import * as React from 'react'
import './Main.scss'
import Edit from './Edit'
import List from './List'
import Detail from './Detail'
import User from './User'
import { Switch, Route, Redirect } from 'react-router-dom'

interface Props {
    match: {
        path: string
    }
}

class Main extends React.Component<Props, object> {

    render() {
        const { match } = this.props
        return <div className="content-main">
            <Switch>
                <Redirect exact path="/" to={{pathname: '/list'}} />
                <Route path={`${match.path}user`} component={User} />
                <Route path={`${match.path}list`} component={List} />
                <Route path={`${match.path}add`} component={Edit} />
                <Route path={`${match.path}edit/:id`} component={Edit} />
                <Route path={`${match.path}detail/:id`} component={Detail} />
            </Switch>
        </div>
    }
}

export default Main