import React, { Component } from 'react';
import Countries from './components/Countries';
import Header from './components/Header';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: '',
    };
  }

  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await res.json();

    const allCountries = data.map(({ name, numericCode, flag, population }) => {
      return {
        id: numericCode,
        name,
        filterName: name.toLowerCase(),
        flag,
        population,
      };
    });

    this.setState({
      allCountries,
      filteredCountries: Object.assign([], allCountries),
      filteredPopulation: this.calculateTotalPolpulationFrom(allCountries),
    });
  }

  calculateTotalPolpulationFrom = (countries) => {
    const totalPopulation = countries.reduce((acc, curr) => {
      return acc + curr.population;
    }, 0);

    return totalPopulation;
  };

  handelChangeFilter = (newText) => {
    this.setState({ filter: newText });
    const filterText = newText.toLowerCase();
    const filteredCountries = this.state.allCountries.filter((coutry) => {
      return coutry.filterName.includes(filterText);
    });
    this.setState({
      filteredCountries,
      filteredPopulation: this.calculateTotalPolpulationFrom(filteredCountries),
    });
  };

  render() {
    const { filteredCountries, filteredPopulation, filter } = this.state;
    return (
      <div className="container">
        <h3 style={{ textAlign: 'center' }}>React Countries</h3>
        <Header
          filter={filter}
          countryCount={filteredCountries.length}
          population={filteredPopulation}
          onChangeFilter={this.handelChangeFilter}
        />
        <Countries countries={filteredCountries} />
      </div>
    );
  }
}
