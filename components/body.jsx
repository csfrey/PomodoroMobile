export default Body = (props) => {
  const state = props.state;
  const { set, round, timerVal, timerState } = state;

  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);

  const timeStr = `${pad(minutes.toString(), 2)}:${pad(seconds.toString(), 2)}`;

  return (
    <div className="timer-body">
      <div className="timer-circle">{timeStr}</div>
      <div className="timer-state">{timerState}</div>
      <div className="set-count">Set: {set}</div>
      <div className="round-count">Round: {round}</div>
    </div>
  );
};
