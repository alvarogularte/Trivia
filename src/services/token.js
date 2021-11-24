export const saveToken = (token) => {
  localStorage
    .setItem('token', JSON.stringify(token));
};

export const readToken = () => JSON.parse(localStorage.getItem('token'));
