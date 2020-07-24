import React from 'react';

export default function Day({ day }) {
  const { text, colSize } = styles;
  return (
    <div style={colSize}>
      <p style={text}>{day.toString().padStart(2, '0')}</p>
    </div>
  );
}

const styles = {
  text: {
    fontWeight: 'bold',
    fontSize: '1.3rem',
    margin: 0,
    padding: 0,
  },
  colSize: {
    width: '50px',
  },
};
