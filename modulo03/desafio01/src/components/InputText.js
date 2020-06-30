import React from 'react';

export default function InputText({
  id,
  type,
  label,
  value,
  onValueChange,
  step,
}) {
  const handleChangeValue = (event) => {
    onValueChange(event.target.value);
  };
  return (
    <div>
      <div className="input-field">
        <input
          id={id}
          type={type}
          step={step ? step : 1}
          onChange={handleChangeValue}
          value={value}
        />
        <label htmlFor={id} className="active">
          {label}
        </label>
      </div>
    </div>
  );
}
