import * as React from 'react';
import './App.css';
import Hello from './Hello'
import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <Hello name='max' />
        </div>
      </div>
    );
  }
}

export default App;
