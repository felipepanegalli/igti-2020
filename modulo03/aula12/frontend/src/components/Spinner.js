import React from 'react';

export default function Spinner({ size, text }) {
  const { mt20, textStyle } = styles;
  return (
    <div className="center" style={mt20}>
      <div className={'preloader-wrapper ' + size + ' active'}>
        <div className="spinner-layer spinner-blue">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      <br />
      <span style={textStyle}>{text}</span>
    </div>
  );
}

const styles = {
  mt20: {
    margin: '20px 0 0 0',
  },
  textStyle: {
    fontSize: '1.5rem',
  },
};
