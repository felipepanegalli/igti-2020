window.addEventListener('load', start);

const clickArray = [];

function start() {
  const button = document.querySelector('#clickButton');
  button.addEventListener('click', handleButtonClick);
}

const handleButtonClick = () => {
  const now = new Date();
  clickArray.push(getNewTimestamp());
  render();
};

const render = () => {
  const ul = document.querySelector('#data');
  ul.innerHTML = '';
  let lis = '';
  clickArray.map((item) => {
    lis += `<li>${item}</li>`;
  });

  ul.innerHTML = lis;
  document.title = clickArray.length;
};
