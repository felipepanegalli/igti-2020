// Requisições HTTP

const url = 'https://api.github.com/users/felipepanegalli';

window.addEventListener('load', () => {
  divisionPromise(5, 2)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  divisionPromise(5, 0)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  doFetch();
  doFetchAsync();
});

// Promise
const divisionPromise = (a, b) => {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Não é possível dividir por 0');
    }

    resolve(a / b);
  });
};

// Requisições HTTP com fetch
const doFetch = () => {
  const user = document.querySelector('#user');
  fetch(url)
    .then((res) => {
      res.json().then((data) => {
        const { login, name } = data;
        user.textContent = `Login:${login} || Nome: ${name}`;
      });
    })
    .catch((error) => {
      user.textContent = error;
    });
};

// Refatoração com async await
const doFetchAsync = async () => {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
};
