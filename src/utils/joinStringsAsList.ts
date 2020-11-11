const joinStringsAsList = (list: string[]): string => {
  let name = list.pop() || '';
  if (list.length >= 1) {
    name = `${list.pop()} y ${name}`;
  }
  while (list.length !== 0) {
    name = `${list.pop()}, ${name}`;
  }
  return name;
};

export default joinStringsAsList;
