'use strict'; //O javascript acusa mais errros

// functions vs arrow functions

// Standart function
function sum(a, b) {
  return a + b;
}
console.log(sum(1, 2));

// Arrow function
const sumArrow = (a, b) => a + b;
console.log(sumArrow(1, 5));

// Template string
const name = 'Felipe';
const surName = 'Panegalli';
console.log(`${name} ${surName}`);

// Default var value
// The first var need a default value
// const sumDefArrow: (a?: number, b?: number) => number
const sumDefArrow = (a = 0, b = 0) => a + b;
console.log(sumDefArrow(1, 5));
