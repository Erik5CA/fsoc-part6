import { useDispatch, useSelector } from "react-redux";
import { updateVotesToDB } from "../reducers/anecdoteReducer";
import {
  // revomeNotification,
  setNotification,
  // setNotificationVote,
} from "../reducers/notificationReducer";

export const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((anecdote) => anecdote.content.includes(filter));
  });
  const sortAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const vote = (id) => {
    const a = anecdotes.find((anec) => anec.id === id);
    const anecdoteWitVotesUpdated = {
      ...a,
      votes: a.votes + 1,
    };
    dispatch(updateVotesToDB(anecdoteWitVotesUpdated));
    dispatch(setNotification(`you vote ${a.content}`, 5));
  };
  return (
    <>
      {sortAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
