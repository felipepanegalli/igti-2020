const url = 'https://restcountries.eu/rest/v2/all';

let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let allFavorites = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationCountries = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');

  countCountries = document.querySelector('.countCountries');
  countFavorites = document.querySelector('.countFavorites');

  totalPopulationCountries = document.querySelector('.totalPopulation');
  totalPopulationFavorites = document.querySelector('.totalPopulationFavorite');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();
});

const fetchCountries = async () => {
  const countries = await fetch(url);
  const data = await countries.json();
  allCountries = data.map((country) => {
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: translations.pt,
      population,
      flag,
    };
  });

  allCountries.sort((a, b) => a.name.localeCompare(b.name));

  render();
};

const render = () => {
  renderCountryList();
  renderFavorites();
  renderSummary();
  handleCountryButtons();
};

const renderCountryList = () => {
  let countriesHTML = '<div>';
  allCountries.forEach((country) => {
    const { name, flag, id, population } = country;
    let countryHTML = `
      <div class="country">
        <div>
          <a id="${id}" class="waves-effect waves-light btn">+</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}">
        </div>
        <div>
        <ul>
          <li>${name}</li>
          <li>${formatNumber(population)}</li>
        </ul>
        </div>
      </div>
    `;
    countriesHTML += countryHTML;
  });
  countriesHTML += '</div>';
  tabCountries.innerHTML = countriesHTML;
};

const renderFavorites = () => {
  let favoritesHTML = '<div>';
  allFavorites.forEach((country) => {
    const { name, flag, id, population } = country;
    let favoriteHTML = `
      <div class="country">
        <div>
          <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}">
        </div>
        <div>
        <ul>
          <li>${name}</li>
          <li>${formatNumber(population)}</li>
        </ul>
        </div>
      </div>
    `;
    favoritesHTML += favoriteHTML;
  });
  favoritesHTML += '</div>';
  tabFavorites.innerHTML = favoritesHTML;
};

const renderSummary = () => {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = allFavorites.length;

  const populationCountries = allCountries.reduce(
    (acc, curr) => acc + curr.population,
    0
  );

  const populationFavorites = allFavorites.reduce(
    (acc, curr) => acc + curr.population,
    0
  );

  totalPopulationCountries.textContent = formatNumber(populationCountries);
  totalPopulationFavorites.textContent = formatNumber(populationFavorites);
};

const handleCountryButtons = () => {
  const countryButton = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoriteButton = Array.from(tabFavorites.querySelectorAll('.btn'));

  countryButton.forEach((button) => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  favoriteButton.forEach((button) => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });
};

const addToFavorites = (id) => {
  const countryToAdd = allCountries.find((country) => country.id === id);

  allFavorites = [...allFavorites, countryToAdd];

  allFavorites.sort((a, b) => a.name.localeCompare(b.name));

  allCountries = allCountries.filter((country) => country.id !== id);

  render();
};

const removeFromFavorites = (id) => {
  const countryToRemove = allFavorites.find((country) => country.id === id);

  allCountries = [...allCountries, countryToRemove];

  allCountries.sort((a, b) => a.name.localeCompare(b.name));

  allFavorites = allFavorites.filter((country) => country.id !== id);

  render();
};

const formatNumber = (number) => {
  return numberFormat.format(number);
};
