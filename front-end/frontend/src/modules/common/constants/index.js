export const boardLinkCreator = (id) => {
  return `${process.env.REACT_APP_URL}/board/${id}`;
};

export const device = {
  tablet: '(max-width: 1100px)',
  tabletM: '(max-width: 800px)',
  mobile: '(max-width: 425px)',
}
