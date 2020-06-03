const apiUrl =
  'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo';

// const apiUrl = 'http://localhost:3000/users';
let allUsers = [];
let showUsers = [];

let tabUsers = null;
let usersFound = null;
let resultDiv = null;
let resultsDivNone = null;

let maleSpan = null;
let femaleSpan = null;
let sumAgeSpan = null;
let avgAgeSpan = null;

let searchInput = null;
let searchBtn = null;
let loaderContainer = null;

let chartFemale = 0;
let chartMale = 0;

let chart = null;

window.addEventListener('load', () => {
  tabUsers = document.querySelector('#tabUsers');
  loaderContainer = document.querySelector('.loader-container');
  searchDiv = document.querySelector('.searchDiv');
  resultDiv = document.querySelector('.results');
  resultsDivNone = document.querySelector('.results-none');

  usersFound = document.querySelector('#usersFound');
  maleSpan = document.querySelector('#maleSpan');
  femaleSpan = document.querySelector('#femaleSpan');
  sumAgeSpan = document.querySelector('#sumAgeSpan');
  avgAgeSpan = document.querySelector('#avgAgeSpan');

  searchInput = document.querySelector('#searchInput');
  searchBtn = document.querySelector('#searchBtn');

  searchInput.addEventListener('keyup', makeSearch);
  searchBtn.addEventListener('click', filterUser);
  searchBtn.disabled = true;
  chartOptions();
  fetchUsers();
});

const fetchUsers = async () => {
  const users = await fetch(apiUrl);
  const data = await users.json();
  allUsers = data.results.map((user) => {
    const { name, dob, picture, gender } = user;
    return {
      name: `${name.first} ${name.last}`,
      age: dob.age,
      picture: picture.thumbnail,
      gender: gender,
    };
  });
  allUsers.sort((a, b) => a.name.localeCompare(b.name));
  showUsers = allUsers;
  setTimeout(() => {
    loaderContainer.classList.add('hide');
    searchDiv.classList.remove('hide');
  }, 500);
};

const render = () => {
  renderUsersList();
  renderStatistic();
};

const renderUsersList = () => {
  let usersHTML = '<div>';

  showUsers.forEach((user) => {
    const { picture, name, age } = user;
    let userHTML = `
    <div class="avatar">
      <img src="${picture}" alt="${name}" />
      <p>${name}, ${age} anos</p>
    </div>
    `;
    usersHTML += userHTML;
  });
  usersHTML += '</div>';
  tabUsers.innerHTML = usersHTML;
  usersFound.textContent = showUsers.length;
};

const renderStatistic = () => {
  const female = showUsers.filter((user) => user.gender === 'female');
  const male = showUsers.filter((user) => user.gender === 'male');
  const sumAge = showUsers.reduce((acc, curr) => acc + curr.age, 0);
  const avgAge = parseInt(sumAge) / showUsers.length;

  femaleSpan.textContent = female.length;
  maleSpan.textContent = male.length;
  sumAgeSpan.textContent = sumAge;
  avgAgeSpan.textContent = avgAge;

  chartUpdate(male.length, female.length);
};

const makeSearch = (event) => {
  if (event.key === 'Enter' && event.target.value.length > 0) {
    filterUser();
  } else {
    showUsers = allUsers;
  }
  buttonBehavior();
};

const filterUser = () => {
  const filteredUsers = allUsers.filter((user) => {
    return user.name.toLowerCase().includes(searchInput.value.toLowerCase());
  });
  showUsers = filteredUsers;
  resultDiv.classList.remove('hide');
  resultsDivNone.classList.add('hide');
  render();
};

const buttonBehavior = () => {
  if (searchInput.value.length > 0) {
    return (searchBtn.disabled = false);
  }
  return (searchBtn.disabled = true);
};

const chartUpdate = (male, female) => {
  chart.updateSeries([male, female]);
};

const chartOptions = () => {
  let options = {
    chart: {
      type: 'donut',
    },
    series: [],
    labels: ['Masculino', 'Feminino'],
  };

  chart = new ApexCharts(document.querySelector('#chart'), options);
  chart.render();
};
