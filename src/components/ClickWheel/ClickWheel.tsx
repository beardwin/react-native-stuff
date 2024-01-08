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
import { Gesture, GestureDetector } from "react-native-gesture-handler";
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
  const window = useWindowDimensions();

  const radius = diameter / 2;
  const gripSize = thickness * 1.5;

  const [_center, _setCenter] = React.useState<Coordinate>({ x: 0, y: 0 });
  const center = useSharedValue<Coordinate | null>(null);

  // measured in radians
  const theta = useSharedValue(toRadians(0));

  const onLayout = (e: LayoutChangeEvent) => {
    const { x, y, width, height } = e.nativeEvent.layout;
    const val = { x: x + width / 2, y: y + height / 2 };
    center.value = val;
    _setCenter(val);
  };

  const pan = Gesture.Pan().onUpdate((e) => {
    if (!center.value) return;

    const { absoluteX: x, absoluteY: y, x: rx, y: ry } = e;
    const { x: cx, y: cy } = center.value;
    const dx = x - cx;
    const dy = y - cy;

    console.log({ x, y, cx, cy, dx, dy, rx, ry });
    theta.value = Math.atan2(-dy, dx);
  });

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
      <View style={[styles.container, { width: diameter }]} onLayout={onLayout}>
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
      <Animated.View
        style={[styles.dot, { backgroundColor: "red" }, offsets]}
      ></Animated.View>
      <View
        style={[
          styles.dot,
          { left: _center.x - 5 / 2, top: _center.y - 5 / 2 },
        ]}
      />
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Svg>
          <Line
            x1="0"
            y1={_center.y - 100}
            x2={window.width}
            y2={_center.y - 100}
            stroke="rgba(0,0,255,0.2)"
          />
          <Line
            x1="0"
            y1={_center.y}
            x2={window.width}
            y2={_center.y}
            stroke="rgba(255,0,0,0.2)"
          />
          <Line
            x1="0"
            y1={_center.y + 100}
            x2={window.width}
            y2={_center.y + 100}
            stroke="rgba(0,0,255,0.2)"
          />
          <Line
            x1="0"
            y1={_center.y}
            x2={window.width}
            y2={_center.y}
            stroke="rgba(255,0,0,0.2)"
          />
          <Line
            x1={window.width / 2}
            y1="0"
            x2={window.width / 2}
            y2={window.height}
            stroke="rgba(255,0,0,0.2)"
          />
        </Svg>
      </View>
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
