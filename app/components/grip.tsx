import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Grip } from "../../src/components/Grip";

export default function GripScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Grip" }} />
      <Grip size={50} color="#eee" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
  },
});
