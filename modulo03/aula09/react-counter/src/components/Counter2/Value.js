import React from 'react';
import css from './counter.module.css';

function Value(props) {
  return <span className={css.counterValue}>{props.value}</span>;
}

export default Value;
