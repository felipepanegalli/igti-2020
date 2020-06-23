import React from 'react';
import css from './counter.module.css';

function Value(props) {
  const { value } = props;
  return <span className={css.counterValue}>{value}</span>;
}

export default Value;
