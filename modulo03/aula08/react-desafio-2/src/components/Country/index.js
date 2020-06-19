import React, { Component } from 'react';
import css from './country.module.css';

export default class Country extends Component {
  render() {
    const { country } = this.props;
    const { name, flag } = country;

    return (
      <div className={css.org}>
        <img src={flag} alt={name} className={css.image} />
        <span>{country.name}</span>
      </div>
    );
  }
}
