import React from 'react';

export default function Description({ description, category }) {
  const { title, colSize, subtitle } = styles;

  return (
    <div style={colSize}>
      <p style={title}>{category}</p>
      <p style={subtitle}>{description}</p>
    </div>
  );
}

const styles = {
  title: {
    fontWeight: 'bold',
    fontSize: '1.4rem',
    margin: 0,
    padding: 0,
  },
  subtitle: {
    margin: 0,
    padding: 0,
  },
  colSize: {
    width: '100%',
  },
};
