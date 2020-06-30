import React from 'react';

export default function Number({ number }) {
  const { numberStyle } = styles;
  return (
    <div>
      <p style={numberStyle}>{number}</p>
    </div>
  );
}

const styles = {
  numberStyle: {
    fontWeight: 'bold',
    marginRight: '20px',
  },
};
