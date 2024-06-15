import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = async (content) => {
  const anecdote = { content, votes: 0 };
  try {
    const res = await axios.post(baseUrl, anecdote);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updateVotes = (anecdote) => {
  axios
    .put(`${baseUrl}/${anecdote.id}`, anecdote)
    .then((res) => res.data)
    .catch((error) => error);
};
