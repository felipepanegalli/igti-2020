window.addEventListener('load', start);

let inputFrequency = document.querySelector('#inputFrequency');
let inputRange = document.querySelector('#inputRange');
let divPodcast = document.querySelector('#divPodcast');

function start() {
  loadRadio();
  changeFrequency();
}

loadRadio = () => {
  inputRange.value = '87.7';
  inputFrequency.value = inputRange.value;
};

changeFrequency = () => {
  inputRange.addEventListener('input', changeFrequency);
  function changeFrequency(event) {
    var frequency = event.target.value;
    inputFrequency.value = frequency;
    foundFrequency(frequency);
  }
};

foundFrequency = (frequency) => {
  const podcast = realPodcasts.find((podcast) => {
    return podcast.id === frequency;
  });

  if (!podcast) {
    divPodcast.innerHTML = `<p>Nenhum podcast.</p>`;
    return;
  }

  divPodcast.innerHTML = '';
  divPodcast.innerHTML = `<img src="./img/${podcast.img}" />
  <h3>${podcast.title}</h3><p>${podcast.description}</p>`;
};
