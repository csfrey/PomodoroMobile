import { View, useWindowDimensions } from "react-native";
import { runStates, styles } from "../constants";

const Buttons = (props) => {
  const { state, onButtonClick } = props;
  const { runState } = state;

  const { height, width } = useWindowDimensions();

  let start = <div className="start-btn">START</div>;

  let continueOrReset = (
    <div className="two-btn-container">
      <div className="continue-btn">CONTINUE</div>
      <div className="reset-btn">RESET</div>
    </div>
  );

  let pause = <div className="pause-btn">PAUSE</div>;

  let content;

  switch (runState) {
    case runStates.waiting:
      content = start;
      break;

    case runStates.paused:
      content = continueOrReset;
      break;

    case runStates.running:
      content = pause;
      break;

    default:
      throw new Error("bad run state");
  }

  return (
    <View
      style={{
        backgroundColor: styles.green,
        height: width / 2,
        width: "100%",
      }}
    ></View>
  );
};

export default Buttons;
