import React from 'react';
import { currencyFormat } from '../../helpers/formatter';

export default function Value({ value }) {
  const { title, colSize } = styles;

  return (
    <div style={colSize}>
      <p style={title}>{currencyFormat(value)}</p>
    </div>
  );
}

const styles = {
  title: {
    fontWeight: 'bold',
    fontSize: '1.4rem',
    margin: 0,
    padding: 0,
    textAlign: 'right',
  },
  colSize: {
    width: '150px',
  },
};
