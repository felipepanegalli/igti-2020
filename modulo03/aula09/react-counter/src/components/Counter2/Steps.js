import React from 'react';
import css from './counter.module.css';

function Steps(props) {
  return <span className={css.counterValue}>({props.currentStep})</span>;
}

export default Steps;
