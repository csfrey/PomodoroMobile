import { useState, useEffect } from "react";
import { View } from "react-native";
import { buttonTypes, timerStates, runStates } from "./constants";
import Body from "./components/body";
import Buttons from "./components/buttons";

const ShortRest = 1000 * 60 * 5; // 5 minutes
const LongRest = 1000 * 60 * 15; // 15 minutes
const WorkPeriod = 1000 * 60 * 25; // 25 minutes

// let timerInterval;

export default function App() {
  const [set, setSet] = useState(1);
  const [round, setRound] = useState(1);
  const [timerState, setTimerState] = useState(timerStates.work);
  const [runState, setRunState] = useState(runStates.waiting);
  const [timerVal, setTimerVal] = useState(WorkPeriod);

  useEffect(() => {
    let timerInterval = setInterval(() => {
      if (runState === runStates.running) {
        setTimerVal(timerVal - 1000);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  });

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

  if (timerVal < 0) {
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
        onButtonClick={(btn) => handleButtonClick(btn, state)}
      />
    </View>
  );
}

function progressTimerState(state) {
  const {
    set,
    setSet,
    round,
    setRound,
    timerState,
    setTimerState,
    setTimerVal,
    setRunState,
  } = state;

  handlePause(state);

  switch (timerState) {
    case timerStates.work:
      if (set % 4 === 0) {
        setTimerState(timerStates.longRest);
        setRunState(runStates.waiting);
        setTimerVal(LongRest);
      } else {
        setTimerState(timerStates.rest);
        setRunState(runStates.waiting);
        setTimerVal(ShortRest);
      }
      break;

    case timerStates.rest:
      setSet(set + 1);
      setTimerState(timerStates.work);
      setRunState(runStates.waiting);
      setTimerVal(WorkPeriod);
      break;

    case timerStates.longRest:
      setRound(round + 1);
      setSet(1);
      setTimerState(timerStates.work);
      setRunState(runStates.waiting);
      setTimerVal(WorkPeriod);
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

    case buttonTypes.skip:
      handleSkip(state);
      break;

    case buttonTypes.continue:
      handleStart(state);
      break;

    case buttonTypes.reset:
      handleReset(state);
      break;
  }
}

function handleStart(state) {
  state.setRunState(runStates.running);
}

function handlePause(state) {
  state.setRunState(runStates.paused);
}

function handleSkip(state) {
  progressTimerState(state);
}

function handleReset(state) {
  const { setSet, setRound, setTimerState, setRunState, setTimerVal } = state;
  setSet(1);
  setRound(1);
  setTimerState(timerStates.work);
  setRunState(runStates.waiting);
  setTimerVal(WorkPeriod);
}
