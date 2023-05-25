import React, { Component } from 'react';
import logo from './logo.svg';
import '../AccountBalance/AccountBalance.css'

export default class AppHeader extends Component {
  render() {
    return (
<       header className="App-header">
            <img src={logo} alt="React Logo" className="App-logo" />
            <h2 className="App-title">Coin Exchange</h2>
        </header>
    )
  }
}
