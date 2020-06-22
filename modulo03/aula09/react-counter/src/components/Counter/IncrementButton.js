import React from 'react';

function IncrementButton(props) {
  const handleButtonClick = () => {
    props.onIncrement('+');
  };
  return (
    <button
      onClick={handleButtonClick}
      className="waves-effect waves-light btn green darken-4"
    >
      +
    </button>
  );
}

export default IncrementButton;
