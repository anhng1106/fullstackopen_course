const App = () => {
  const course = "Half Stack application development";
  const part1 = [{ name: "Fundamentals of React", exercise: 10 }];
  const part2 = [{ name: "Using props to pass data", exercise: 7 }];
  const part3 = [{ name: "State of a component", exercise: 14 }];

  return (
    <>
      <div>
        <h1>{course} </h1>
        <p>
          {part1[0].name}: {part1[0].exercise} <br />
          {part2[0].name}: {part2[0].exercise} <br />
          {part3[0].name}: {part3[0].exercise}
        </p>
        <p>
          Number of exercises:{" "}
          {part1[0].exercise + part2[0].exercise + part3[0].exercise}
        </p>
      </div>
    </>
  );
};

export default App;
