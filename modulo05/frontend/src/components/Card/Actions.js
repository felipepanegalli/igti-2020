import React from 'react';

export default function Actions({ id }) {
  const { buttonCustom, colSize } = styles;
  return (
    <div style={colSize}>
      <a
        href="#!"
        className="btn-small waves-effect waves-light"
        style={buttonCustom}
      >
        <i className="material-icons">edit</i>
      </a>

      <a
        href="#!"
        className="btn-small waves-effect waves-light"
        style={buttonCustom}
      >
        <i className="material-icons">delete_forever</i>
      </a>
    </div>
  );
}

const styles = {
  colSize: {
    width: '200px',
    textAlign: 'right',
  },
  buttonCustom: {
    margin: '0 5px',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
};
