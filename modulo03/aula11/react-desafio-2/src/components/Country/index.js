import React from 'react';
import css from './country.module.css';

export default function Country({ country }) {
  const { name, flag } = country;

  return (
    <div className={css.org}>
      <img src={flag} alt={name} className={css.image} />
      <span>{country.name}</span>
    </div>
  );
}
