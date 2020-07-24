const formatter = Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const MONTHSEXTENDED = [
  '---',
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

const formatPeriod = (period) => {
  let splitted = period.split('-');
  const year = splitted[0];
  const month = Number(splitted[1]);
  return `${MONTHSEXTENDED[month]}/${year}`;
};

function formatNumber(value) {
  return formatter.format(value);
}

function currencyFormat(value) {
  return 'R$ ' + formatNumber(value);
}

// Normaliza o texto em lowerCase e remove acentos
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export { formatPeriod, formatNumber, currencyFormat, normalizeText };
