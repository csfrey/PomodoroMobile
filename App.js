import { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { buttonTypes, timerStates, runStates } from "./constants";
import Body from "./components/body";
import Buttons from "./components/buttons";

const FiveMinutes = 1000 * 60 * 5;
const FifteenMinutes = 1000 * 60 * 15;
const TwentyfiveMinutes = 1000 * 60 * 25;

let timerInterval;

export default function App() {
  const [set, setSet] = useState(1);
  const [round, setRound] = useState(1);
  const [timerState, setTimerState] = useState(timerStates.work);
  const [timerVal, setTimerVal] = useState(TwentyfiveMinutes);
  const [runState, setRunState] = useState(runStates.waiting); // "paused" means in the middle of a state

  const state = {
    set,
    setSet,
    round,
    setRound,
    timerState,
    setTimerState,
    timerVal,
    setTimerVal,
    runState,
    setRunState,
  };

  if (timerVal <= 0) {
    pauseTimer();
    progressTimerState(state);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "yellow",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Body state={state} />
      <Buttons
        state={state}
        isRunning={!!timerInterval}
        onButtonClick={(e) => handleButtonClick(e.target.value, state)}
      />
    </View>
  );
}

// const appStyles = StyleSheet.create({
//   container: {
//     backgroundColor: "lavender",
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   jetbrainsmonoRegular: {
//     fontFamily: "JetBrainsMono-Regular",
//     fontSize: 20,
//   },
// });

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
  const { set, timerState, setTimerState, setTimerVal, setRunState } = state;

  switch (timerState) {
    case timerStates.work:
      if (set % 4 === 0) {
        setTimerState(timerStates.longRest);
        setRunState(runStates.waiting);
        setTimerVal(FifteenMinutes);
      } else {
        setTimerState(timerStates.rest);
        setRunState(runStates.waiting);
        setTimerVal(FiveMinutes);
      }
      break;

    case timerStates.rest:
    case timerStates.longRest:
      setTimerState(timerStates.work);
      setRunState(runStates.waiting);
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
      handleStart(state);
      break;

    case buttonTypes.reset:
      handleReset(state);
      break;
  }
}

function handleStart(state) {
  startTimer(state);
  state.setRunState(runStates.running);
}

function handlePause(state) {
  pauseTimer();
  //   state.setTimerState(timerStates.pause);
  state.setRunState(runStates.paused);
}

function handleReset(state) {
  pauseTimer();
  state.setTimerState(timerStates.work);
  state.setRunState(runStates.waiting);
  state.setTimerVal(TwentyfiveMinutes);
}

// Same as start? Consider combining.
// function handleContinue(state) {
//   startTimer(state);
//   state.setRunState(runStates.running);
// }
