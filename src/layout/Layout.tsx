import * as React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import NoLogin from './NoLogin';
import NotFound from './NotFound';
import { Switch, Route } from 'react-router-dom'
// 
class Layout extends React.Component {
  render() {
    return (
      <div className="layout">
        <Header></Header>
        <Switch>
          <Route path='/sign' component={NoLogin}></Route>
          <Route exact path='' component={Content}></Route>
          <Route path='*' component={NotFound}></Route>
        </Switch>
        <Footer></Footer>
      </div>
    )
  }
}

export default Layout