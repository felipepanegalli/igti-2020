window.addEventListener('load', start);

var inputR = null;
var inputG = null;
var inputB = null;

var rangeR = null;
var rangeG = null;
var rangeB = null;

var r = 0;
var g = 0;
var b = 0;

function start() {
  startValues();
  activateRange();
  render();
}

function startValues() {
  inputR = document.querySelector('#inputR');
  inputG = document.querySelector('#inputG');
  inputB = document.querySelector('#inputB');
  rangeR = document.querySelector('#rangeR');
  rangeG = document.querySelector('#rangeG');
  rangeB = document.querySelector('#rangeB');

  rangeR.value = 0;
  rangeG.value = 0;
  rangeB.value = 0;
  inputR.value = rangeR.value;
  inputG.value = rangeG.value;
  inputB.value = rangeB.value;

  rangeR.focus();
}

function render() {
  var divColor = document.querySelector('#color');
  divColor.style.backgroundColor = `rgb(${r},${g},${b})`;

  var colorDivSpan = document.querySelector('#colorDivSpan');
  colorDivSpan.textContent = `rgb(${r},${g},${b})`;
}

function activateRange() {
  function changeColor(event) {
    if (
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.type === 'click'
    ) {
      if (event.target.id === 'rangeR') {
        r = inputR.value = rangeR.value;
      }
      if (event.target.id === 'rangeG') {
        g = inputG.value = rangeG.value;
      }
      if (event.target.id === 'rangeB') {
        b = inputB.value = rangeB.value;
      }
      render();
    }
  }
  rangeR.addEventListener('keyup', changeColor);
  rangeR.addEventListener('click', changeColor);
  rangeG.addEventListener('keyup', changeColor);
  rangeG.addEventListener('click', changeColor);
  rangeB.addEventListener('keyup', changeColor);
  rangeB.addEventListener('click', changeColor);
}
