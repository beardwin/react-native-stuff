import React from "react";
import { StyleSheet, View } from "react-native";
import { Circle, Defs, LinearGradient, Stop, Svg } from "react-native-svg";

interface Props {
  diameter?: number;
  thickness?: number;
}

export const Groove = ({ diameter = 300, thickness = 60 }: Props) => {
  const radius = diameter / 2;
  const center = diameter / 2;
  const shadowRadius = thickness / 5;

  return (
    <View style={[styles.container, { width: diameter }]}>
      <Svg width={diameter} height={diameter}>
        <Defs>
          <LinearGradient id="shadow" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="black" stopOpacity="0.2" />
            <Stop offset="0.5" stopColor="black" stopOpacity="0" />
          </LinearGradient>
          <LinearGradient id="highlight" x1="1" y1="1" x2="0" y2="0">
            <Stop offset="0" stopColor="white" stopOpacity="1" />
            <Stop offset="0.5" stopColor="white" stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Circle cx={center} cy={center} r={radius} fill="url(#shadow)" />
        <Circle cx={center} cy={center} r={radius} fill="url(#highlight)" />
      </Svg>
      <View style={styles.innerContainer}>
        <View
          style={[
            styles.center,
            styles.centerHighlight,
            {
              width: diameter - thickness * 2,
              shadowRadius,
              shadowOffset: { width: -shadowRadius, height: -shadowRadius },
            },
          ]}
        />
        <View
          style={[
            styles.center,
            styles.centerShadow,
            {
              width: diameter - thickness * 2,
              shadowRadius,
              shadowOffset: { width: shadowRadius, height: shadowRadius },
            },
          ]}
        />
      </View>
    </View>
  );
};

// const Dial =
const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    position: "absolute",
    aspectRatio: 1,
    backgroundColor: "#eee",
    borderRadius: 999,
  },
  centerHighlight: {
    shadowColor: "white",
    shadowOpacity: 1,
  },
  centerShadow: {
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
});
