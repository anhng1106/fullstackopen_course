import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  // const handleNextAnecdote = () => {
  //   const nextIndex = Math.floor(Math.random() * anecdotes.length);
  //   setSelected(nextIndex);
  // };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const handleNextAnecdote = () => {
    const nextIndex = (selected + 1) % anecdotes.length;
    setSelected(nextIndex);
  };

  const maxVotes = Math.max(...votes);
  const maxIndex = votes.indexOf(maxVotes);

  return (
    <div>
      <h1>Anecdote of the Day</h1>

      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote} style={{ marginRight: "10px" }}>
        Vote
      </button>
      <button onClick={handleNextAnecdote}>Next Anecdote</button>

      <h1>Anecdote with the most votes</h1>
      {maxVotes === 0 ? (
        <p>No votes yet</p>
      ) : (
        <div>
          <p>{anecdotes[maxIndex]}</p>
          <p>has {maxVotes} votes</p>
        </div>
      )}
    </div>
  );
};

export default App;
