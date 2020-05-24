let globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
let globalInput = null;
let spanCount = null;
let currentIndex = null;
let isEditing = false;

window.addEventListener('load', () => {
  globalInput = document.querySelector('#name');
  spanCount = document.querySelector('#spanCount');
  spanCount.textContent = globalNames.length;

  preventFormSubmit();
  activateInput();
  render();
});

const preventFormSubmit = () => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
};

const activateInput = () => {
  const insertName = (name) => {
    globalNames = [...globalNames, name];
  };

  const updateName = (name) => {
    globalNames[currentIndex] = name;
  };

  const handleTyping = (event) => {
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
  };
  globalInput.addEventListener('keyup', handleTyping);
  globalInput.focus();
};

const render = () => {
  const createDeleteButton = (index) => {
    const deleteName = () => {
      globalNames = globalNames.filter((name, i) => i !== index);
      render();
    };

    var button = document.createElement('button');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  };

  const createSpan = (name, index) => {
    const editItem = () => {
      globalInput.value = name;
      globalInput.focus();
      isEditing = true;
      currentIndex = index;
    };
    var span = document.createElement('span');
    span.textContent = name;
    span.addEventListener('click', editItem);
    return span;
  };

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
};

const clearInput = () => {
  globalInput.value = '';
  globalInput.focus();
};
