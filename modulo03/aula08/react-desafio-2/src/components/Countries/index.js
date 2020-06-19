import React, { Component } from 'react';
import Country from '../Country';
import css from './countries.module.css';

export default class Countries extends Component {
  render() {
    const { countries } = this.props;
    return (
      <div className={css.border}>
        <ul className={css.dFlex}>
          {countries.map((country) => {
            return (
              <li key={country.id} className={`${css.border_card}`}>
                <Country country={country} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
