import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Timer } from "./components/Timer";

export default function Page() {
  return (
    <View style={styles.container}>
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
