import React from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Groove } from "./Groove";
import { Grip } from "../Grip";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { canvas2Cartesian } from "react-native-redash";
import { Line, Svg } from "react-native-svg";

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
  const cx = diameter / 2;
  const cy = diameter / 2;

  // measured in radians
  const theta = useSharedValue(toRadians(0));

  const updateTheta = (
    e: GestureUpdateEvent<PanGestureHandlerEventPayload>
  ) => {
    "worklet";

    const { x: rx, y: ry } = e;
    const dx = rx - cx;
    const dy = ry - cy;

    theta.value = Math.atan2(-dy, dx);
  };

  const pan = Gesture.Pan().onBegin(updateTheta).onUpdate(updateTheta);

  const offsets = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: Math.cos(theta.value) * radius,
        },
        {
          translateY: Math.sin(theta.value) * -radius,
        },
      ],
    };
  });

  return (
    <>
      <View style={[styles.container, { width: diameter }]}>
        <GestureDetector gesture={pan}>
          <Groove diameter={diameter} thickness={thickness} />
        </GestureDetector>
      </View>
      <Animated.View
        style={[styles.gripContainer, offsets]}
        pointerEvents="none"
      >
        <Grip diameter={gripSize} color="#eee" />
      </Animated.View>
    </>
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
  dot: {
    position: "absolute",
    backgroundColor: "blue",
    width: 5,
    aspectRatio: 1,
    borderRadius: 999,
  },
  gripContainer: {
    position: "absolute",
  },
});
