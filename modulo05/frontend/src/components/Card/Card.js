import React from 'react';
import Day from './Day';
import Description from './Description';
import Value from './Value';
import Actions from './Actions';

let actualLine;

export default function Card({ transaction }) {
  const { border, bgRed, bgGreen } = styles;

  const bg = transaction.type === '-' ? bgRed : bgGreen;

  const separatorFunc = (value) => {
    if (value === actualLine) {
      return styles.m0;
    }
    actualLine = value;
    return styles.m5;
  };

  const separator = separatorFunc(transaction.day);

  return (
    <div style={{ ...border, ...bg }}>
      <Day day={transaction.day} />
      <Description
        description={transaction.description}
        category={transaction.category}
      />
      <Value value={transaction.value} />
      <Actions id={transaction._id} />
    </div>
  );
}

const styles = {
  border: {
    borderRadius: '5px',
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 10px',
  },
  bgGreen: {
    backgroundColor: '#00b894',
    color: '#ffffff',
  },
  bgRed: {
    backgroundColor: '#d63031',
    color: '#ffffff',
  },
  m0: {
    margin: '10px 0',
  },
  m5: {
    marginTop: '30px',
  },
};
