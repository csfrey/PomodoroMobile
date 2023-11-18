import { View, Text, useWindowDimensions, Pressable } from "react-native";
import { buttonTypes, runStates, styles } from "../constants";

const Buttons = (props) => {
  const { width } = useWindowDimensions();
  const { state, onButtonClick } = props;
  const { runState } = state;

  let start = (
    <Pressable
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
          fontFamily: "JetBrainsMono_400Regular",
          color: "black",
          fontSize: width / 8,
          textAlign: "center",
        }}
      >
        START
      </Text>
    </Pressable>
  );

  let pause = (
    <View
      style={{
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }}
    >
      <Pressable
        style={{
          flex: 1,
          height: "100%",
          justifyContent: "center",
          backgroundColor: styles.yellow,
        }}
        onPress={() => onButtonClick(buttonTypes.pause)}
      >
        <Text
          style={{
            fontFamily: "JetBrainsMono_400Regular",
            color: "black",
            fontSize: width / 12,
            textAlign: "center",
          }}
        >
          PAUSE
        </Text>
      </Pressable>
      <Pressable
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
            fontFamily: "JetBrainsMono_400Regular",
            color: "black",
            fontSize: width / 12,
            textAlign: "center",
          }}
        >
          SKIP
        </Text>
      </Pressable>
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
      <Pressable
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
            fontFamily: "JetBrainsMono_400Regular",
            color: "black",
            fontSize: width / 12,
            textAlign: "center",
          }}
        >
          CONTINUE
        </Text>
      </Pressable>
      <Pressable
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
            fontFamily: "JetBrainsMono_400Regular",
            color: "black",
            fontSize: width / 12,
            textAlign: "center",
          }}
        >
          RESET
        </Text>
      </Pressable>
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
