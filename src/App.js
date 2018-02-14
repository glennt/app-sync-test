import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { branch } from 'baobab-react/higher-order';

class App extends Component {
  render() {

    var events = this.props.events.map((event) => {
        return (
            <div>
                <li>id: {event.eventId}</li>
                <li>name: {event.name}</li>
                <li>where: {event.where}</li>
                <li>when: {event.when}</li>
                <li>description: {event.description}</li>
            </div>
        );
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Events</p>
          <div className="App-item">{events}</div>
      </div>
    );
  }
}

export default branch({
    events: ['events']
}, App);
