import { View, StyleSheet } from "react-native";
import { Timer } from "../../src/components/Timer";
import { Stack } from "expo-router";

export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Timer" }} />
      <Timer radius={140} duration={10000} strokeWidth={20} />
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
