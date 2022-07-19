export const generateNewId = (list: Array<number>): number => {
  list.sort((a, b) => a - b);
  list.reverse();
  return list.length > 0 ? list[0] + 1 : 1;
};
