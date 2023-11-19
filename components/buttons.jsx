import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { buttonTypes, runStates, styles } from "../constants";

const Buttons = (props) => {
  const { width } = useWindowDimensions();
  const { state, onButtonClick } = props;
  const { runState } = state;

  const baseText = {
    fontFamily: "JetBrainsMono_400Regular",
    textAlign: "center",
    color: "black",
  };

  const baseBtn = {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  };

  let start = (
    <TouchableOpacity
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        backgroundColor: styles.green,
      }}
      onPress={() => onButtonClick(buttonTypes.start)}
    >
      <Text
        className="start-btn"
        style={{
          ...baseText,
          fontSize: width / 8,
        }}
      >
        START
      </Text>
    </TouchableOpacity>
  );

  let pause = (
    <View
      style={{
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }}
    >
      <TouchableOpacity
        style={{
          ...baseBtn,
          backgroundColor: styles.yellow,
        }}
        onPress={() => onButtonClick(buttonTypes.pause)}
      >
        <Text
          style={{
            ...baseText,
            fontSize: width / 12,
          }}
        >
          PAUSE
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          height: "100%",
          justifyContent: "center",
          backgroundColor: styles.orange,
        }}
        onPress={() => onButtonClick(buttonTypes.skip)}
      >
        <Text
          style={{
            ...baseText,
            fontSize: width / 12,
          }}
        >
          SKIP
        </Text>
      </TouchableOpacity>
    </View>
  );

  let continueOrReset = (
    <View
      style={{
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          height: "100%",
          justifyContent: "center",
          backgroundColor: styles.yellow,
        }}
        onPress={() => onButtonClick(buttonTypes.continue)}
      >
        <Text
          style={{
            ...baseText,
            fontSize: width / 12,
          }}
        >
          CONTINUE
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          height: "100%",
          justifyContent: "center",
          backgroundColor: styles.orange,
        }}
        onPress={() => onButtonClick(buttonTypes.reset)}
      >
        <Text
          style={{
            ...baseText,
            fontSize: width / 12,
          }}
        >
          RESET
        </Text>
      </TouchableOpacity>
    </View>
  );

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
        height: width / 2,
        width: "100%",
      }}
    >
      {content}
    </View>
  );
};

export default Buttons;
