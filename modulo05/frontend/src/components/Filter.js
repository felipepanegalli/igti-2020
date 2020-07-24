import React from 'react';

export default function Filter({ onChange, onClickNewTransaction }) {
  const { dFlex, input, button } = styles;

  const handleInputChange = (event) => {
    const newText = event.target.value;
    onChange(newText);
  };

  const handleClick = () => {
    onClickNewTransaction(true);
  };

  return (
    <div style={dFlex}>
      <button
        type="button"
        className="waves-effect waves-light btn"
        style={button}
        onClick={handleClick}
      >
        <i className="material-icons left">add</i>NOVO LANÇAMENTO
      </button>
      <div className="input-field" style={input}>
        <input
          id="filter"
          type="text"
          className="validate"
          onChange={handleInputChange}
        />
        <label htmlFor="filter">Filtro</label>
      </div>
    </div>
  );
}

const styles = {
  dFlex: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0 0 0',
  },
  input: {
    width: '100%',
    marginLeft: '10px',
  },
  button: {
    width: '40%',
  },
};
