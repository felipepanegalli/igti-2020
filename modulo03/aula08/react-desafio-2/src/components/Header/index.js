import React, { Component } from 'react';
import { formatNumber } from '../../helpers/formatHelpers';
import css from '../Header/header.module.css';

export default class Header extends Component {
  handleInputChange = (event) => {
    const newText = event.target.value;
    this.props.onChangeFilter(newText);
  };

  render() {
    const { filter, countryCount, population } = this.props;
    return (
      <div className={(css.flexRow, css.border)}>
        <input
          style={{ width: '300px' }}
          type="text"
          placeholder="Filtro..."
          value={filter}
          onChange={this.handleInputChange}
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
}
