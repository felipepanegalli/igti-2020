import React from 'react';
import css from './counter.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import Value from './Value';
import Steps from './Steps';

function Counter2(props) {
  const { currentCounter, currentStep, onCount } = props;

  const handleButtonClick = (clickType) => {
    onCount(clickType);
  };

  return (
    <div className={css.counterContainer}>
      <DecrementButton onDecrement={handleButtonClick} />
      <Value value={currentCounter} />
      <IncrementButton onIncrement={handleButtonClick} />
      <Steps currentStep={currentStep} />
    </div>
  );
}

export default Counter2;
