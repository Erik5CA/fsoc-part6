import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/anecdotes";
import { useDispatchNotification } from "../context/NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatchNotification = useDispatchNotification();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate(content, {
      onError: (error) => {
        dispatchNotification(error.message);
      },
      onSuccess: () => {
        dispatchNotification(`you create ${content}`);
      },
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
