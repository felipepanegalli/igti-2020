import React, { useState } from 'react';
import Counter from './components/Counter';
import Counter2 from './components/Counter2';
import Band from './components/Band';

export default function App() {
  const [currentCounter, setCurrentCounter] = useState(3);
  const [steps, setSteps] = useState(0);

  const handleCount = (clickType) => {
    setCurrentCounter(
      clickType === '+' ? currentCounter + 1 : currentCounter - 1
    );
    setSteps(steps + 1);
  };

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
        onCount={handleCount}
        currentCounter={currentCounter}
        currentStep={steps}
      />
      <Counter2
        onCount={handleCount}
        currentCounter={currentCounter}
        currentStep={steps}
      />
      <Counter2
        onCount={handleCount}
        currentCounter={currentCounter}
        currentStep={steps}
      />
    </div>
  );
}
