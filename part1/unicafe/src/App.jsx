import { useState } from "react";
import React from "react";

function Statistics({ good, neutral, bad }) {
  const total = good + neutral + bad;
  const average = total ? (good - bad) / total : 0;
  const positive = total ? (good / total) * 100 : 0;

  if (total === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {average.toFixed(2)}</p>
        <p>positive {positive.toFixed(2)} %</p>
      </div>
    );
  }
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <>
      <div>
        <h1>give feedback</h1>

        <button onClick={handleGoodClick} style={{ marginRight: "10px" }}>
          good
        </button>
        <button onClick={handleNeutralClick} style={{ marginRight: "10px" }}>
          neutral
        </button>
        <button onClick={handleBadClick}>bad</button>

        <h1>statistic</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </>
  );
}

export default App;
