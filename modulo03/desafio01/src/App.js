import React, { useState, useEffect } from 'react';
import InputText from './components/InputText';
import Block from './components/Block';

export default function App() {
  const { flexStyle, containerFlexStyle } = styles;
  const [initialValue, setInitialValue] = useState(1000);
  const [monthRate, setMonthRate] = useState(0.5);
  const [period, setPeriod] = useState(15);
  const [parcels, setParcels] = useState([]);

  const handleValueChange = (value) => {
    setInitialValue(value);
  };

  const handleRateChange = (value) => {
    setMonthRate(value);
  };

  const handlePeriodChange = (value) => {
    setPeriod(value);
  };

  useEffect(() => {
    const parcels = Array.from({ length: period }).map((parcel, index) => {
      if (index < period) {
        let qtd = index + 1;

        // Rendimento Juros Compostos
        const amount = initialValue * Math.pow(1 + monthRate / 100, qtd);

        // Valor Juros Compostos
        const rate = Math.pow(1 + monthRate / 100, qtd);

        return {
          parcel: qtd,
          accValue: amount,
          income: amount - initialValue,
          rate: rate * 100 - 100,
        };
      }
    });

    setParcels(parcels);
  }, [initialValue, monthRate, period]);

  return (
    <div className="container">
      <h3 className="center">React - Juros Compostos</h3>
      <br />
      <div style={flexStyle}>
        <InputText
          id="initialValue"
          type="number"
          value={initialValue}
          label="Montante inicial:"
          onValueChange={handleValueChange}
        />
        <InputText
          id="monthRate"
          type="number"
          value={monthRate}
          step="0.1"
          label="Taxa de juros mensal:"
          onValueChange={handleRateChange}
        />
        <InputText
          id="period"
          type="number"
          value={period}
          label="Período (meses):"
          onValueChange={handlePeriodChange}
        />
      </div>
      <div style={containerFlexStyle}>
        {parcels.map(({ parcel, accValue, income, rate }) => (
          <Block
            key={parcel}
            parcel={parcel}
            accValue={accValue}
            income={income}
            rate={rate}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  flexStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    contentAlign: 'center',
  },
  containerFlexStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
};
