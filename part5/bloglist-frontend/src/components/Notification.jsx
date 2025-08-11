const Notification = ({ notice }) => {
  if (!notice) return null;

  const base = {
    padding: "10px",
    border: "1px solid",
    marginBottom: 10,
  };

  const style =
    notice.type === "error"
      ? { ...base, color: "red", borderColor: "red" }
      : { ...base, color: "green", borderColor: "green" };

  return <div style={style}>{notice.text}</div>;
};

export default Notification;
