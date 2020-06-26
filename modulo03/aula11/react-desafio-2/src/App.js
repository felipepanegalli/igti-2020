import React, { useState, useEffect } from 'react';
import Countries from './components/Countries';
import Header from './components/Header';

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setFilteredPopulation] = useState(0);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all');
      const data = await res.json();
      const allCountries = data.map(
        ({ name, numericCode, flag, population }) => {
          return {
            id: numericCode,
            name,
            filterName: name.toLowerCase(),
            flag,
            population,
          };
        }
      );

      setAllCountries(allCountries);
      setFilteredCountries(Object.assign([], allCountries));
      setFilteredPopulation(calculateTotalPolpulationFrom(allCountries));
    };
    fetchCountries();
  }, []);

  const calculateTotalPolpulationFrom = (countries) => {
    const totalPopulation = countries.reduce((acc, curr) => {
      return acc + curr.population;
    }, 0);

    return totalPopulation;
  };

  const handelChangeFilter = (newText) => {
    setFilter(newText);
    const filterText = newText.toLowerCase();
    const filteredCountries = allCountries.filter((coutry) => {
      return coutry.filterName.includes(filterText);
    });
    setFilteredCountries(filteredCountries);
    setFilteredPopulation(calculateTotalPolpulationFrom(filteredCountries));
  };

  return (
    <div className="container">
      <h3 style={{ textAlign: 'center' }}>React Countries</h3>
      <Header
        filter={filter}
        countryCount={filteredCountries.length}
        population={filteredPopulation}
        onChangeFilter={handelChangeFilter}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
}
