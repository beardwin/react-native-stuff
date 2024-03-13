import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Button } from "../../src/components/Button";
import { VStack } from "../../src/components/Stack";
import { Piechart } from "../../src/components/Piechart";

export default function PiechartScreen() {
  return (
    <VStack style={styles.container}>
      <Stack.Screen options={{ title: "Piechart" }} />
      <Piechart
        segments={[
          { id: "1", label: "Restaurants", portion: 0.15 },
          { id: "2", label: "Savings", portion: 0.35 },
          { id: "3", label: "Bills", portion: 0.2 },
          { id: "4", label: "Mortgage", portion: 0.3 },
        ]}
      />
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
