const formatter = Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
  currency: 'BRL',
});

function formatNumber(value) {
  return formatter.format(value);
}

function formatPercentage(value) {
  const stringValue = value.toFixed(2);
  return stringValue.replace('.', ',') + '%';
}

function formatCurrency(value) {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export { formatNumber, formatPercentage, formatCurrency };
