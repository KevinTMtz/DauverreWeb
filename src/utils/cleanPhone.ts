const cleanPhone = (telephone: string): string =>
  telephone
    .split('')
    .filter((ch) => /\d/.test(ch))
    .join('');

export default cleanPhone;
