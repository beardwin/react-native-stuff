import { StyleSheet, View } from "react-native";
import { ClickWheel } from "../../src/components/ClickWheel";
import { Stack } from "expo-router";

export default function ClickWheelScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Clickwheel" }} />
      <ClickWheel />
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
