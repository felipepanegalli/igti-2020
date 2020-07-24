import React from 'react';
import { formatPeriod } from '../helpers/formatter';

export default function Periods({ periods, currentPeriod, onSelectChange }) {
  const handlePeriodChange = (event) => {
    onSelectChange(event.target.value);
  };

  return (
    <div>
      <select value={currentPeriod} onChange={handlePeriodChange}>
        {periods.map((period) => {
          return (
            <option value={period} key={period}>
              {formatPeriod(period)}
            </option>
          );
        })}
      </select>
    </div>
  );
}
