import { useState } from "react";
import React from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positive = total === 0 ? 0 : (good / total) * 100;

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
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {average.toFixed(2)}</p>
        <p>positive {positive.toFixed(2)} %</p>
      </div>
    </>
  );
}

export default App;
