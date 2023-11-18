import { View, Text, useWindowDimensions } from "react-native";
import { JetBrainsMono_400Regular } from "@expo-google-fonts/jetbrains-mono";
import { useFonts } from "expo-font";
import { styles, timerStates } from "../constants";

const Body = (props) => {
  const { height, width } = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    JetBrainsMono_400Regular,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const state = props.state;
  const { set, round, timerVal, timerState } = state;

  const circleDiameter = width * 0.6;
  const circleMargin = (width - circleDiameter) / 2;

  const seconds = `${Math.floor((timerVal / 1000) % 60)}`;
  const minutes = `${Math.floor((timerVal / 1000 / 60) % 60)}`;
  const timeStr = `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;

  let bgColor;
  switch (timerState) {
    case timerStates.work:
      bgColor = styles.red;
      break;
    case timerStates.rest:
      bgColor = styles.blue;
      break;
    case timerStates.longRest:
      bgColor = styles.purple;
      break;
    default:
      bgColor = styles.red;
      break;
  }

  return (
    <View
      style={{
        backgroundColor: bgColor,
        height: height - width / 2,
        width: "100%",
        flexDirection: "column",
      }}
    >
      <View
        className="timer-container"
        style={{
          flex: 2,
        }}
      >
        <View
          className="timer-circle"
          style={{
            borderColor: "black",
            borderWidth: 6,
            borderRadius: circleDiameter / 2,
            width: circleDiameter,
            height: circleDiameter,
            marginTop: circleMargin * 0.5,
            marginLeft: circleMargin,
            justifyContent: "center",
            alignContent: "center",
            flexShrink: 1,
          }}
        >
          <Text
            className="timer-value"
            style={{
              textAlign: "center",
              fontSize: circleDiameter / 4,
              fontFamily: "JetBrainsMono_400Regular",
              justifyContent: "center",
              color: "white",
            }}
          >
            {timeStr}
          </Text>
        </View>
      </View>
      <View
        className="timer-state-container"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text
          className="timer-state"
          style={{
            textAlign: "center",
            fontFamily: "JetBrainsMono_400Regular",
            fontSize: circleDiameter / 4,
            color: "white",
          }}
        >
          {timerState}
        </Text>
      </View>
      <View
        className="set-round-container"
        style={{
          flex: 1,
          justifyContent: "center",
          fontFamily: "JetBrainsMono_400Regular",
          color: "white",
        }}
      >
        <Text
          className="set-count"
          style={{
            fontFamily: "JetBrainsMono_400Regular",
            color: "white",
            textAlign: "center",
          }}
        >
          Set: {set}
        </Text>
        <Text
          className="round-count"
          style={{
            fontFamily: "JetBrainsMono_400Regular",
            color: "white",
            textAlign: "center",
          }}
        >
          Round: {round}
        </Text>
      </View>
    </View>
  );
};

export default Body;
