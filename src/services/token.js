export const saveToken = (token) => {
  localStorage
    .setItem('token', JSON.stringify(token));
};

export const readToken = () => JSON.parse(localStorage.getItem('token'));

export const saveRanking = (array) => {
  localStorage
    .setItem('ranking', JSON.stringify(array));
};
