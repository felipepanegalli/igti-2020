import React from 'react';
import Number from './Number';
import { formatCurrency, formatPercentage } from '../helpers/formatHelpers';

export default function Block({ parcel, accValue, income, rate }) {
  const {
    flexStyle,
    flexRow,
    borderStyle,
    plusFontStyle,
    // minusFontStyle,
    percentageStyle,
  } = styles;
  return (
    <div style={{ ...flexStyle, ...borderStyle }}>
      <Number number={parcel} />
      <div style={flexRow}>
        <span style={plusFontStyle}>{formatCurrency(accValue)}</span>
        <span style={plusFontStyle}>{formatCurrency(income)}</span>
        <span style={percentageStyle}>{formatPercentage(rate)}</span>
      </div>
    </div>
  );
}

const styles = {
  flexStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  borderStyle: {
    border: '1px solid lightgray',
    width: '150px',
    borderRadius: '5px',
    padding: '10px',
    margin: '5px 10px 5px 0',
  },
  plusFontStyle: {
    color: '#10ac84',
    fontWeight: 'bold',
  },
  minusFontStyle: {
    color: '#ee5253',
  },
  percentageStyle: {
    color: '#0abde3',
  },
};
