import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    messages: [],
    error: null,
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages = async () => {
    try {
      const messages = await axios.get('/api/v1/messages');
      this.setState({ error: null, messages });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { messages, error } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          {messages.map(message => (
            <li key={message._id}>
              {message.content}
            </li>
          ))}
        </ul>
        <button onClick={this.fetchMessages}>
          Reload
        </button>
      </div>
    );
  }
}

export default App;
