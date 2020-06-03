// Manipulação de formulários com value
// var nomeEdt = document.querySelector('#nome');
// nomeEdt.value = 'Felipe Panegalli';

window.addEventListener('load', start);

function start() {
  var edit = document.querySelector('#nome');
  edit.addEventListener('keyup', countName);
  var form = document.querySelector('form');
  form.addEventListener('submit', preventSubmit);
}

function countName(event) {
  var count = event.target.value;
  var span = document.querySelector('#nameLength');
  span.textContent = count.length;
}

function preventSubmit(event) {
  event.preventDefault();
  var nameInput = document.querySelector('#nome');
  if (nameInput.value <= 0) {
    alert('Erro: Campo nome não pode ficar em branco!');
    return false;
  }
  alert(nameInput.value + ' cadastrado com sucesso!');
}
