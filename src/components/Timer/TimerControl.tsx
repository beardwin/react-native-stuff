import { Button, ColorValue, StyleSheet, Text } from "react-native";
import { TimerState } from "./types";

interface Props {
  state: TimerState;
  color?: ColorValue;
  onStart: () => void;
  onCancel: () => void;
  onReset: () => void;
}

export const TimerControl = ({
  state,
  color = "rgba(0,0,0,1)",
  onStart,
  onCancel,
  onReset,
}: Props) => {
  switch (state) {
    case "running":
      return <Button title="Cancel" onPress={onCancel} color={color} />;
    case "idle":
      return <Button title="Start" onPress={onStart} color={color} />;
    case "resetting":
    case "finished":
      return <Button title="Cancel" onPress={onStart} color={color} disabled />;
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    padding: 8,
    textAlign: "center",
  },
});
