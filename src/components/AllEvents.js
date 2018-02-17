import React, { Component } from 'react';
import '../App.css';
import { branch } from 'baobab-react/higher-order';

class AllEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            where: '',
            when: '',
            description: ''
        };
    }

    componentDidMount() {
      
    }

 

    handleFieldOnChange(field, e) {
        var obj = {};
        obj[field] = e.target.value;
        this.setState(obj);
    }


    handleCreateClick() {
        var event = {
            name: this.state.name,
            where: this.state.where,
            when: this.state.when,
            description: this.state.description
        }      

        this.props.createEvent(event);

        this.setState({
            name: '',
            where: '',
            when: '',
            description: ''
        });
    }

  render() {

    var key = 0;
    var events = this.props.events.map((event) => {
        return (
            <div className="App-item" key={key++}> 
                <li>id: {event.id}</li>
                <li>name: {event.name}</li>
                <li>where: {event.where}</li>
                <li>when: {event.when}</li>
                <li>description: {event.description}</li>
            </div>
        );
    });

    return (
    <div>
        <div>
            <p>Create an event</p>
            <table>
                <tbody>
                    <tr>
                        <td>
                            Name
                        </td>
                        <td>
                            <input type="text" value={this.state.name} onChange={this.handleFieldOnChange.bind(this, 'name')}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Where
                        </td>
                        <td>
                            <input type="text" value={this.state.where} onChange={this.handleFieldOnChange.bind(this, 'where')}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            When
                        </td>
                        <td>
                            <input type="text" value={this.state.when} onChange={this.handleFieldOnChange.bind(this, 'when')}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Description
                        </td>
                        <td>
                            <input type="text" value={this.state.description} onChange={this.handleFieldOnChange.bind(this, 'description')}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <input type="button" value="Add Event" onClick={this.handleCreateClick.bind(this)} />
        </div>
        <p>Events</p>
          <div>{events}</div>
      </div>
    );
  }
}

export default branch({
    events: ['events']
}, AllEvents);
