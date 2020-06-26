import React from 'react';
import { formatNumber } from '../../helpers/formatHelpers';
import css from '../Header/header.module.css';

export default function Header(props) {
  const { filter, countryCount, population, onChangeFilter } = props;

  const handleInputChange = (event) => {
    const newText = event.target.value;
    onChangeFilter(newText);
  };

  return (
    <div className={(css.flexRow, css.border)}>
      <input
        style={{ width: '300px' }}
        type="text"
        placeholder="Filtro..."
        value={filter}
        onChange={handleInputChange}
      />{' '}
      |
      <span className={css.info}>
        Países: <strong>{countryCount}</strong>{' '}
      </span>{' '}
      |
      <span className={css.info}>
        População: <strong>{formatNumber(population)}</strong>{' '}
      </span>
    </div>
  );
}
