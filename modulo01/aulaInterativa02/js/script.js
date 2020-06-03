const userApi = 'https://randomuser.me/api/?results=100&seed=promisse&nat=us,fr,au,br';
const countryApi = 'https://restcountries.eu/rest/v2/all';

let globalCountries = [];
let globalUsers = [];
let globalUsersCountries = [];

let divUsers = null;


window.addEventListener('load', () => {
    fetchUsers();
    fetchCountries();
    joinUsersAndCountries();
    render();
});

const fetchUsers = async () => {
    const res = await fetch(userApi);
    const json = await res.json()
    globalUsers = json.results.map(({picture, name, nat}) => {
        return {
            name: name.first,
            country: nat,
            picture: picture.large,
        };
    });
}

const fetchCountries = async () => {
    const res = await fetch(countryApi);
    const json = await res.json();
    globalCountries = json.map(({alpha2Code, flag}) => {
        return {
            code: alpha2Code,
            flag: flag,
        };
    });
}

const joinUsersAndCountries = () => {
    globalUsers.forEach((user) => {
        const userCountry = globalCountries.find((country) => {
            return country.code === user.country;
        });
        if (userCountry) {
            globalUsersCountries.push({...user, ...userCountry});
        }
    });
};

const renderUserInfo = () => {
    divUsers = document.querySelector('#divUsers');
    let usersHtml = '<div class="col-sm-12 col-md-3 col-lg-4">';
    globalUsersCountries.forEach((user) => {
        let userHtml = `
      <div class="user">
        <div class="picture">
          <img src="${user.picture}">
        </div>
        <div class="data">
          <span>${user.name}</span>
          <img src="${user.flag}">
        </div>
      </div>
    `;
        usersHtml += userHtml;
    });

    usersHtml += '</div>';
    tabUsers.innerHTML = usersHtml;
    console.log(usersHtml)
};

const render = () => {
    renderUserInfo();
};
