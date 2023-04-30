import { Button, StyleSheet, Text } from "react-native";
import { TimerState } from "./types";

interface Props {
  state: TimerState;
  onStart: () => void;
  onCancel: () => void;
  onReset: () => void;
}

export const TimerControl = ({ state, onStart, onCancel, onReset }: Props) => {
  switch (state) {
    case "running":
      return <Button title="Cancel" onPress={onCancel} color={buttonColor} />;
    case "idle":
      return <Button title="Start" onPress={onStart} color={buttonColor} />;
    case "resetting":
    case "finished":
      return <Text style={styles.text}>Cancel</Text>;
  }
};

const buttonColor = "rgba(166, 225, 250, 0.7)";
const styles = StyleSheet.create({
  text: {
    color: "rgba(166, 225, 250, 0.1)",
    fontSize: 18,
    padding: 8,
    textAlign: "center",
  },
});
