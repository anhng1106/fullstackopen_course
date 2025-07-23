const Notification = ({ message, type }) => {
  if (!message) return null;
  console.log("Message:", message, "Type:", type);

  const style = {
    color: type === "success" ? "green" : "red",
    background: "lightgrey",
    fontSize: 20,
    border: `2px solid ${type === "success" ? "green" : "red"}`,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
