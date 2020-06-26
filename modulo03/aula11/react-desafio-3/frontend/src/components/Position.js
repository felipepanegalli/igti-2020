import React from 'react';

export default function Position({ children }) {
  const { textStyle } = styles;

  return <div style={textStyle}>{children}</div>;
}

const styles = {
  textStyle: {
    marginRight: '15px',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
};
