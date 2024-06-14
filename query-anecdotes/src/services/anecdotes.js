import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (content) => {
  const anecdote = { content, votes: 0 };
  axios.post(baseUrl, anecdote).then((res) => res.data);
};

export const updateVotes = (anecdote) => {
  axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then((res) => res.data);
};
