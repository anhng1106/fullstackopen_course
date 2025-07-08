const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <p key={index}>
          {part.name}: {part.exercise}
        </p>
      ))}
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
