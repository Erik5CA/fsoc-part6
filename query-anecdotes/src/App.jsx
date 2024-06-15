import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateVotes } from "./services/anecdotes";
import { useDispatchNotification } from "./context/NotificationContext";

const App = () => {
  const dispatchNotification = useDispatchNotification();
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateVotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    console.log("vote");
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    updateAnecdoteMutation.mutate(updatedAnecdote, {
      onSuccess: () => {
        dispatchNotification(`you vote ${anecdote.content}`);
      },
    });
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
