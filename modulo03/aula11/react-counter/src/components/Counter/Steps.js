import React from 'react';
import css from './counter.module.css';

function Steps(props) {
  const { currentStep } = props;
  return <span className={css.counterValue}>({currentStep})</span>;
}

export default Steps;
