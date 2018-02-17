import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { branch } from 'baobab-react/higher-order';
import AllEventsWithData from './components/AllEventsWithData';
import AllEvents from './components/AllEvents';

class App extends Component {

    constructor(props) {
        super(props);     
        this.state = {
          showAllEvents: true
        }         
        this.reload = this.reload.bind(this);
    }

    componentDidMount() {
      
    }  

    reload() {
        this.setState({key: Math.random()});
    }

  render() {
    var allEvents;

    if(this.state.showAllEvents) {
        allEvents = <AllEventsWithData key={this.state.key} blah={this.state.showAllEvents}/>
    } else {
        allEvents = <div>Hidden</div>
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p>
            <input type="button" value="Reload" onClick={this.reload} />
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {allEvents}
    </div>
    );
  }
}

export default App;
