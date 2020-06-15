import React, { Component } from 'react';
import Counter from './components/Counter';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <h4>React Counter 01</h4>
        <Counter />
      </div>
    );
  }
}
