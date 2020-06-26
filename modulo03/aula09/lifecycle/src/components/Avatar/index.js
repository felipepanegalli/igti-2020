import React from 'react';
import css from './avatar.module.css';

function Avatar({ user }) {
  const { name, picture } = user;

  return (
    <div className={css.flexRow}>
      <img src={picture.large} alt={name.first} className={css.avatar} />
      <span>{name.first}</span>
    </div>
  );
}

export default Avatar;
