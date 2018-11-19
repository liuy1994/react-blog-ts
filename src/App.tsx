import * as React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Layout from './layout/Layout'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Layout />
      </div>
    );
  }
}

export default App;
