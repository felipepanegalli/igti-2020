// Manipulação com queryselector
let title = document.querySelector('h1');
title.textContent = 'Felipe S. Panegalli';

// Manipulação dom queryselect all
let data = Array.from(document.querySelectorAll('.data'));
console.log(data);
for (i = 0; i < data.length; i++) {
  var currentElement = data[i];
  // Usado para adicionar style com js
  currentElement.classList.add('emphasys');
  // Elemento.classList.add() -> adiciona classe ao elemento
  // Elemento.classList.remove() -> remove classe do elemento
}
