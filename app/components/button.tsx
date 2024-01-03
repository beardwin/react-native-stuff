import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Button } from "../../src/components/Button";

export default function ButtonScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Button" }} />
      <Button
        title="My button"
        onPress={() => {
          console.log("Button press");
        }}
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
