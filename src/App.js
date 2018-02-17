import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { branch } from 'baobab-react/higher-order';
import AllEvensWithData from './components/AllEventsWithData';

class App extends Component {

    constructor(props) {
        super(props);      
    }

    componentDidMount() {
      
    }  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <AllEvensWithData />
    </div>
    );
  }
}

export default App;
