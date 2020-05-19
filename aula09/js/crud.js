window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var globalInput = null;
var spanCount = null;
var currentIndex = null;
var isEditing = false;

function start() {
  globalInput = document.querySelector('#name');
  spanCount = document.querySelector('#spanCount');
  spanCount.textContent = globalNames.length;

  preventFormSubmit();
  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(name) {
    globalNames.push(name);
  }

  function updateName(name) {
    globalNames[currentIndex] = name;
  }

  function handleTyping(event) {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }
      isEditing = false;
      clearInput();
      render();
    }
  }
  globalInput.addEventListener('keyup', handleTyping);
  globalInput.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }

    var button = document.createElement('button');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      globalInput.value = name;
      globalInput.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement('span');
    span.textContent = name;
    span.addEventListener('click', editItem);
    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  var ul = document.createElement('ul');
  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];
    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  spanCount.textContent = globalNames.length;
  clearInput();
}

function clearInput() {
  globalInput.value = '';
  globalInput.focus();
}
