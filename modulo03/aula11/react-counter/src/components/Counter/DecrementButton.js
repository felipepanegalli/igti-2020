import React from 'react';

function DecrementButton(props) {
  const { onDecrement } = props;
  const handleButtonClick = () => {
    onDecrement('-');
  };
  return (
    <button
      onClick={handleButtonClick}
      className="waves-effect waves-light btn red darken-4"
    >
      -
    </button>
  );
}

export default DecrementButton;
