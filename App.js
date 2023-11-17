import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { buttonTypes, styles, timerStates } from "./constants";

const FiveMinutes = 1000 * 60 * 5;
const FifteenMinutes = 1000 * 60 * 15;
const TwentyfiveMinutes = 1000 * 60 * 25;

let timerInterval;

export default function App() {
  const [set, setSet] = useState(1);
  const [round, setRound] = useState(1);
  const [timerState, setTimerState] = useState(timerStates.begin);
  const [timerVal, setTimerVal] = useState(TwentyfiveMinutes);

  const state = {
    set,
    setSet,
    round,
    setRound,
    timerState,
    setTimerState,
    timerVal,
    setTimerVal,
  };

  if (timerVal <= 0) {
    pauseTimer();
    progressTimerState(state);
  }

  return (
    <View style={StyleSheet.container}>
      <Body set={set} round={round} time={time} />
      <Buttons
        timerState={timerState}
        isRunning={!!timerInterval}
        onButtonClick={(e) => handleButtonClick(e.target.value, state)}
      />
    </View>
  );
}

function startTimer(state) {
  const { timerVal, setTimerVal } = state;

  timerInterval = setInterval(() => {
    setTimerVal(timerVal - 1000);
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function progressTimerState(state) {
  const { set, timerState, setTimerState, setTimerVal } = state;

  switch (timerState) {
    case timerStates.work:
      if (set % 4 === 0) {
        setTimerState(timerStates.longRest);
        setTimerVal(FifteenMinutes);
      } else {
        setTimerState(timerStates.rest);
        setTimerVal(FiveMinutes);
      }
      break;

    case timerStates.rest:
    case timerStates.longRest:
      setTimerState(timerStates.work);
      setTimerVal(TwentyfiveMinutes);
      break;

    default:
      throw new Error("bad timer state progression");
  }
}

function handleButtonClick(buttonClicked, state) {
  switch (buttonClicked) {
    case buttonTypes.start:
      handleStart(state);
      break;

    case buttonTypes.pause:
      handlePause(state);
      break;

    case buttonTypes.cont:
      handleContinue(state);
      break;

    case buttonTypes.reset:
      handleReset(state);
      break;
  }
}

function handleStart(state) {
  startTimer(state);
}

function handlePause(state) {
  pauseTimer();
  state.setTimerState(timerStates.pause);
}

function handleReset(state) {
  pauseTimer();
  state.setTimerState(timerStates.begin);
  state.setTimerVal(TwentyfiveMinutes);
}

// Same as start? Consider combining.
function handleContinue(state) {
  startTimer(state);
}

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
