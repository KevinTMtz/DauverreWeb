export const phoneToMail = (phone: string): string => `${phone}@example.com`;

export const dateToPass = (date: Date): string => {
  return Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .formatToParts(date)
    .filter((part) => part.type !== 'literal')
    .map((part) => part.value)
    .join('');
};
