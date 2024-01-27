import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { SegmentControl } from "../../src/components/SegmentControl";
import { useState } from "react";

export default function ClickWheelScreen() {
  const options = ["One", "A second one", "Three"];
  const [value, setValue] = useState(options[2]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Segment Control" }} />
      <SegmentControl options={options} value={value} onChange={setValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
