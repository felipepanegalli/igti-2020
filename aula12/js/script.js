'use strict'; //O javascript acusa mais erros

// Manipulação de arrays
window.addEventListener('load', () => {
  doSpread();
  doRest();
  doDestructuring();
});

function doSpread() {
  const marriedMen = people.results.filter(
    (person) => person.name.title === 'Mr'
  );
  const marriedWoman = people.results.filter(
    (person) => person.name.title === 'Ms'
  );

  const marriedPeople = [...marriedMen, ...marriedWoman];
  console.log(marriedMen);
  console.log(marriedWoman);
  console.log(marriedPeople);
}

// DoRest
function doRest() {
  console.log(infiniteSum(1, 2, 3, 4, 5, 6));
}

function infiniteSum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
// Fim doRest

// Uso do Destructuring
function doDestructuring() {
  const user = people.results[0];

  // const username = user.login.username;
  // const password = user.login.password;

  // usando o destructuring
  const { username, password } = user.login;
  console.log(user);
  console.log(username);
  console.log(password);
}
