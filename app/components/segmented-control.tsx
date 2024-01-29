import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { SegmentControl } from "../../src/components/SegmentedControl";
import { useState } from "react";

export default function SegmentedControlScreen() {
  const options = ["One", "A second one", "Three"];
  const [selectedIndex, setSelectedIndex] = useState(2);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Segment Control" }} />
      <SegmentControl
        options={options}
        selectedIndex={selectedIndex}
        onSelectedIndexChange={setSelectedIndex}
      />
      <SegmentControl
        color="rgba(255,0,0,1)"
        highlightColor="rgba(255,0,0,0.1)"
        options={["This", "One", "Is", "Red"]}
        selectedIndex={0}
      />
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
