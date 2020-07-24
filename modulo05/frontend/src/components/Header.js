import React from 'react';

export default function Header() {
  const { title, subtitle } = styles;
  return (
    <div className="center">
      <p style={title} className="center">
        Desafio Final do Bootcamp Full Stack
      </p>
      <p style={subtitle} className="center">
        Controle Financeiro Pessoal
      </p>
    </div>
  );
}

const styles = {
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    margin: 0,
  },
  subtitle: {
    fontSize: '25px',
  },
};
