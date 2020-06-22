import React, { Component } from 'react';
import Counter from './components/Counter';
import Counter2 from './components/Counter2';
import Band from './components/Band';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentCounter: 3,
      steps: 0,
    };
  }

  handleCount = (clickType) => {
    const { currentCounter, steps } = this.state;
    this.setState({
      currentCounter:
        clickType === '+' ? currentCounter + 1 : currentCounter - 1,
      steps: steps + 1,
    });
  };

  render() {
    const { currentCounter, steps } = this.state;
    return (
      <div className="container">
        <h4>Band</h4>
        <Band />
        <hr />
        <h4>
          React Counter <small>(Estado Isolado)</small>
        </h4>
        <Counter />
        <Counter />
        <Counter />
        <hr />
        <h4>
          React Counter 02 <small>(Estado compartilhado)</small>
        </h4>
        <Counter2
          onCount={this.handleCount}
          currentCounter={currentCounter}
          currentStep={steps}
        />
        <Counter2
          onCount={this.handleCount}
          currentCounter={currentCounter}
          currentStep={steps}
        />
        <Counter2
          onCount={this.handleCount}
          currentCounter={currentCounter}
          currentStep={steps}
        />
      </div>
    );
  }
}
