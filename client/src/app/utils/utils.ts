export function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleString('eng', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
