const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ name, exercise }) => {
  return (
    <p>
      {name}: {exercise}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <Part name={parts[0].name} exercise={parts[0].exercise} />
      <Part name={parts[1].name} exercise={parts[1].exercise} />
      <Part name={parts[2].name} exercise={parts[2].exercise} />
    </div>
  );
};

const Total = ({ parts }) => {
  let total = 0;
  for (let i = 0; i < parts.length; i++) {
    total += parts[i].exercise;
  }
  return (
    <p>
      <strong>Number of exercises: {total}</strong>
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    { name: "Fundamentals of React", exercise: 10 },
    { name: "Using props to pass data", exercise: 7 },
    { name: "State of a component", exercise: 14 },
  ];

  return (
    <>
      <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    </>
  );
};

export default App;
