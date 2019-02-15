import * as React from 'react'
import Header from './Header'
import Footer from './Footer'
import NoLogin from './NoLogin';
import NotFound from './NotFound';
import { Switch, Route } from 'react-router-dom'
import Main from './Main'
import './Layout.scss'
class Layout extends React.Component<any, any> {
    render() {
        const {match} = this.props
        return <div className='layout'>
            <Header />
            <div className="layout-content">
                <Switch>
                    <Route path='/sign' component={NoLogin} />
                    <Route exact path='' component={Main} />
                    <Route path='*' component={NotFound} />
                </Switch>
            </div>
            <Footer />
        </div>
    }
}
export default Layout
