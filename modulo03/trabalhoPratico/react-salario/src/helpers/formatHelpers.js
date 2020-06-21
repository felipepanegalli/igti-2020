const formatter = Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

function formatNumber(value) {
  return formatter.format(value);
}

function currencyFormat(value) {
  return 'R$' + formatNumber(value);
}

export { formatNumber, currencyFormat };
