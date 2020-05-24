// Utilização do setTimeout, setInterval e clearInterval

window.addEventListener('load', () => {
  const timer = document.querySelector('#timer');
  let count = 0;

  const interval = setInterval(() => {
    timer.textContent = ++count;

    // Finaliza após 10s
    if (count === 10) {
      this.clearInterval(interval);
      return;
    }

    // Exibe 0,5s a cada múltiplo de 5
    if (count % 5 === 0) {
      setTimeout(() => {
        timer.textContent = count + ',5';
      }, 500);
    }
  }, 1000);
});
