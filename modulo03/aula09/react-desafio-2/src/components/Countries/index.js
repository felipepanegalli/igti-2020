import React from 'react';
import Country from '../Country';
import css from './countries.module.css';

export default function Countries({ countries }) {
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
