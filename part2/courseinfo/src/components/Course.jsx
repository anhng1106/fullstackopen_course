const Header = ({ course }) => {
  console.log("header", course);
  return <h1>{course}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name}: {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    console.log("what is happening", sum, part);
    return sum + part.exercises;
  }, 0);

  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  );
};

const Course = ({ course }) => {
  console.log("course", course);
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
