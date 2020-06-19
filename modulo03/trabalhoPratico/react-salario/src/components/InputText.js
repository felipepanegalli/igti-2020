import React, { Component } from 'react';

export default class InputText extends Component {
  render() {
    const { label, labelFor, editable, value } = this.props;
    return (
      <div className="input-field">
        <input id={labelFor} type="text" value={value} readOnly={editable} />
        <label htmlFor={labelFor}>{label}</label>
      </div>
    );
  }
}
