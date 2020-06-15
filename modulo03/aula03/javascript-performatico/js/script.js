window.addEventListener('load', start);

const clickArray = [];

function start() {
  const button = document.querySelector('#clickButton');
  button.addEventListener('click', handleButtonClick);
}

const handleButtonClick = () => {
  const item = getNewTimestamp();
  clickArray.push(item);
  render(item);
};

const render = (item) => {
  const ul = document.querySelector('#data');
  const li = document.createElement('li');
  li.textContent = item;
  ul.appendChild(li);
  document.title = clickArray.length;
};
