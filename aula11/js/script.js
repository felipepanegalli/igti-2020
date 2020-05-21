'use strict'; //O javascript acusa mais errros

// Manipulação de arrays
window.addEventListener('load', () => {
  doMap();
  doFilter();
  doForEach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
});

// Manipulação com map
function doMap() {
  const nameEmailArray = people.results.map((person) => {
    return {
      name: person.name,
      email: person.email,
    };
  });
  // console.log(nameEmailArray);
  return nameEmailArray;
}

// Manipulação com filter
function doFilter() {
  const olderThan50 = people.results.filter((person) => {
    return person.dob.age > 50;
  });
  // console.log(olderThan50);
  return olderThan50;
}

// Manipulação com foreach (adicionando novos campos)
function doForEach() {
  const mappedPeople = doMap();
  mappedPeople.forEach((person) => {
    person.nameSize =
      person.name.title.length +
      person.name.first.length +
      person.name.last.length;
  });
  // console.log(mappedPeople);
  return mappedPeople;
}

// Manipulação com reduce (somar as idades)
function doReduce() {
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);
  // console.log(totalAges);
  return totalAges;
}

// Manipulação com find (retorna apenas o primeiro)
function doFind() {
  const found = people.results.find((person) => {
    return person.location.state === 'Minas Gerais';
  });

  // console.log(found);
  return found;
}

// Manipulação com some (similar o find mas retorna true ou false)
function doSome() {
  const found = people.results.some((person) => {
    return person.location.state === 'Rio Grande do Sul';
  });
  return found;
}

// Manipulação com every (verifica se todos os objetos possuem algo em igual)
function doEvery() {
  const every = people.results.every((person) => {
    // aqui está pesquisando se todos são do Brasil
    return person.nat === 'BR';
  });

  // console.log(every);
  return every;
}

// Manipulação com cost
function doSort() {
  const mappedFirstName = people.results
    .map((person) => {
      return {
        name: person.name.first,
      };
    })
    .filter((person) => {
      return person.name.startsWith('A');
    })
    .sort((a, b) => {
      // return a.name.localeCompare(b.name);
      // return a.name.length - b.name.length;
      return b.name.length - a.name.length;
    });
  console.log(mappedFirstName);
}
