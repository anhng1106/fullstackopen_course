import { useState } from "react";
import React from "react";

function StatisticLine({ label, value }) {
  return (
    <p>
      {label} {value}
    </p>
  );
}

function Button({ onClick, text }) {
  return (
    <button onClick={onClick} style={{ marginRight: "10px" }}>
      {text}
    </button>
  );
}

function Statistics({ good, neutral, bad }) {
  const total = good + neutral + bad;
  const average = total ? (good - bad) / total : 0;
  const positive = total ? (good / total) * 100 : 0;

  if (total === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <>
        <StatisticLine label="good" value={good} />
        <StatisticLine label="neutral" value={neutral} />
        <StatisticLine label="bad" value={bad} />
        <StatisticLine label="all" value={total} />
        <StatisticLine label="average" value={average.toFixed(2)} />
        <StatisticLine label="positive" value={`${positive.toFixed(2)} %`} />
      </>
    );
  }
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <div>
        <h1>give feedback</h1>

        <Button onClick={() => setGood(good + 1)} text="good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button onClick={() => setBad(bad + 1)} text="bad" />

        <h1>statistic</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </>
  );
}

export default App;
