import React, { Component } from 'react';

export default class InputText extends Component {
  handleInputChange = (event) => {
    const newValue = event.target.value;
    this.props.onChange(newValue);
  };

  render() {
    const { label, labelFor, editable, value } = this.props;

    let style = this.props.style;
    if (!style) {
      style = {};
    }

    return (
      <div className="input-field">
        <input
          id={labelFor}
          type="text"
          value={value}
          readOnly={editable}
          style={style}
          onChange={this.handleInputChange}
        />
        <label htmlFor={labelFor}>{label}</label>
      </div>
    );
  }
}
