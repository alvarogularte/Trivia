export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const ADD_SCORE = 'ADD_SCORE';
export const CLEAR_STORE = 'CLEAR_STORE';

export const addEmail = (state) => ({
  type: ADD_EMAIL,
  state,
});

const getQuestions = async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const fetchAPI = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const json = await fetchAPI.json();
  return json;
};

export function addQuestions() {
  return async (dispatch) => (
    dispatch({
      type: ADD_QUESTIONS,
      result: await getQuestions(),
    })
  );
}

export const addScore = (score) => ({ type: ADD_SCORE, score });

export const clearStore = () => ({ type: CLEAR_STORE });
