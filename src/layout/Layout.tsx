import * as React from 'react';
import Header from './Header';
// import Content from './Content';
import Footer from './Footer';
import Login from './Login';

class Layout extends React.Component {
  render() {
    return (
      <div className="layout">
        <Header></Header>
        {/* <Content></Content> */}
        <Login></Login>
        <Footer></Footer>
      </div>
    )
  }
}

export default Layout