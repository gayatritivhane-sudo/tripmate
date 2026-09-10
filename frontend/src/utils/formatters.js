export function formatCurrency(amount, currency = 'USD') {
  if (amount == null) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatDateRange(startDate, endDate) {
  if (!startDate) return '';
  if (!endDate) return formatDate(startDate);
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startFormatted = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(start);
  const endFormatted = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(end);

  return `${startFormatted} – ${endFormatted}`;
}
