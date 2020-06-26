import React from 'react';

export default function Name({ children }) {
  const { textStyle } = styles;

  return <div style={textStyle}>{children}</div>;
}

const styles = {
  textStyle: {
    fontWeight: 'bold',
  },
};
