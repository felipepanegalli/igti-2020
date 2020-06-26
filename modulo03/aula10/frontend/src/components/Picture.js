import React from 'react';

export default function Picture({ imagesSource, description }) {
  const { pictureStyle } = styles;
  return (
    <div>
      <img
        src={imagesSource}
        alt={description}
        title={description}
        style={pictureStyle}
      />
    </div>
  );
}

const styles = {
  pictureStyle: {
    width: '80px',
    height: '80px',
    borderRadius: '50px',
    boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.3)',
    marginRight: '20px',
  },
};
