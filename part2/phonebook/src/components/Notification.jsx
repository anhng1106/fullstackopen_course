const Notification = ({ message }) => {
  if (!message) return null;

  const style = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    border: "2px solid green",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
