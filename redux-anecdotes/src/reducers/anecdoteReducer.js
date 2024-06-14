import { createSlice } from "@reduxjs/toolkit";
import { createNew, getAll, updateVotes } from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteForAnecdote(state, action) {
      const id = action.payload.id;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : action.payload
      );
    },
    createNewAnecdote(state, action) {
      return [...state, action.payload];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteForAnecdote, createNewAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await createNew(content);
    dispatch(createNewAnecdote(anecdote));
  };
};

export const updateVotesToDB = (object) => {
  return async (dispatch) => {
    const anecdote = await updateVotes(object);
    dispatch(voteForAnecdote(anecdote));
  };
};

export default anecdoteSlice.reducer;
