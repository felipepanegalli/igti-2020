import React from 'react';
import { currencyFormat } from '../helpers/formatter';

export default function Status({
  totalTransactions,
  totalIncome,
  totalExpenses,
  total,
}) {
  const { bold, border, redText, greenText } = styles;
  return (
    <div style={border}>
      <p style={bold}>
        Lançamentos: <span> {totalTransactions}</span>
      </p>
      <p style={bold}>
        Receitas: <span style={greenText}> {currencyFormat(totalIncome)}</span>
      </p>
      <p style={bold}>
        Despesas:
        <span style={redText}> {currencyFormat(totalExpenses)}</span>
      </p>
      <p style={bold}>
        Saldo:
        <span style={total < 0 ? redText : greenText}>
          {' '}
          {currencyFormat(total)}
        </span>
      </p>
    </div>
  );
}

const styles = {
  bold: {
    fontWeight: 'bold',
    margin: 0,
  },
  border: {
    border: '1px solid #cccccc',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    margin: '20px 0',
  },
  redText: {
    color: '#d63031',
  },
  greenText: {
    color: '#00b894',
  },
};
