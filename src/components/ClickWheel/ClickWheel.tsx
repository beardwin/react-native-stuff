import React from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { Groove } from "./Groove";
import { Grip } from "../Grip";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

interface Props {
  diameter?: number;
  thickness?: number;
}

interface Coordinate {
  x: number;
  y: number;
}

const toRadians = (degrees: number) => {
  "worklet";
  return (degrees * Math.PI) / 180;
};

export const ClickWheel = ({ diameter = 300, thickness = 40 }: Props) => {
  const radius = diameter / 2 - thickness / 2;
  const gripSize = thickness * 1.5;

  const theta = useSharedValue(30);

  const pan = Gesture.Pan()
    .onBegin((e) => {})
    .onUpdate((e) => {});

  const offsets = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: Math.cos(toRadians(theta.value)) * radius,
        },
        {
          translateY: Math.sin(toRadians(theta.value)) * -radius,
        },
      ],
    };
  });

  return (
    <View style={[styles.container, { width: diameter }]}>
      <Groove diameter={diameter} thickness={thickness} />
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.gripContainer, offsets]}>
          <Grip diameter={gripSize} color="#eee" />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

// const Dial =
const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  gripContainer: {
    position: "absolute",
  },
});
