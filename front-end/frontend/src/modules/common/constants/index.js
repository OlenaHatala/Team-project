export const boardLinkCreator = (id) => {
  return `${process.env.REACT_APP_URL}/board/${id}`;
};

export const device = {
  tablet: '(max-width: 1100px)',
  tabletM: '(max-width: 800px)',
  mobile: '(max-width: 425px)',
}

export const weekIndexContants = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  firstIndex: 0,
  lastIndex: 5
}
