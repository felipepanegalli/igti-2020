import React from 'react';

const STARS = {
  empty: '☆',
  full: '★',
};

const MAX_STARS = 10;

export default function Popularity({ value }) {
  const { textStyle } = styles;
  const fullStars = STARS.full.repeat(value);
  const emptyStars = STARS.empty.repeat(MAX_STARS - value);
  return (
    <div style={textStyle}>
      {fullStars}
      {emptyStars}
    </div>
  );
}

const styles = {
  textStyle: {
    fontSize: '1.5rem',
    color: '#f39c12',
  },
};
