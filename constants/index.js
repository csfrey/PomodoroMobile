const buttonTypes = {
  start: "START",
  pause: "PAUSE",
  skip: "SKIP",
  continue: "CONTINUE",
  reset: "RESET",
};

const runStates = {
  waiting: "WAITING", // waiting to start
  paused: "PAUSED", // paused mid-process
  running: "RUNNING",
};

const styles = {
  red: "#E74C3C",
  green: "#2ECC71",
  yellow: "#F1C40F",
  orange: "#E67E22",
  blue: "#3498DB",
  purple: "#9B59B6",
};

const timerStates = {
  begin: "BEGIN",
  work: "WORK",
  rest: "REST",
  longRest: "BREAK",
};

export { buttonTypes, runStates, styles, timerStates };
