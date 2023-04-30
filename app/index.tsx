import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { Circle } from "react-native-svg";
import { Timer } from "./components/Timer";

export default function Page() {
  return (
    <View style={styles.container}>
      <Timer radius={100} duration={5000} strokeWidth={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#44486f",
  },
});
