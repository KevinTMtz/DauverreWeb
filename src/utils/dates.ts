export const dateNumToString = (dateNum: number): string => {
  return new Date(dateNum).toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
