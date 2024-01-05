import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Grip } from "../../src/components/Grip";

export default function GripScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Grip" }} />
      <Grip diameter={50} color="#eee" />
      <Grip diameter={150} color="#eee" />
      <Grip diameter={300} color="#eee" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
  },
});
