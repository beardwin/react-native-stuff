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

export const ClickWheel = ({ diameter = 300, thickness = 40 }: Props) => {
  const center = useSharedValue<undefined | Coordinate>(undefined);
  const centerRad = diameter / 2 - thickness / 2;

  const gripSize = thickness * 1.5;
  const gripTop = (thickness - gripSize) / 2;
  const gripBottom = (gripSize - thickness) / -2;

  const clickwheelPosition = useSharedValue<undefined | Coordinate>(undefined);
  const origin = useSharedValue<undefined | Coordinate>(undefined);
  const current = useSharedValue<undefined | Coordinate>(undefined);

  const onLayout = (e: LayoutChangeEvent) => {
    const {
      nativeEvent: {
        layout: { x, y },
      },
    } = e;

    clickwheelPosition.value = {
      x,
      y,
    };

    center.value = {
      x: x + diameter / 2,
      y: y + diameter / 2,
    };
  };

  const pan = Gesture.Pan()
    .onBegin((e) => {
      if (!origin.value) {
        origin.value = {
          x: e.absoluteX,
          y: e.absoluteY,
        };
      }
    })
    .onUpdate((e) => {
      current.value = {
        x: e.absoluteX,
        y: e.absoluteY,
      };
    });

  const offsets = useAnimatedStyle(() => {
    if (!origin.value || !current.value || !clickwheelPosition.value) return {};

    const translateBounds = {
      x: {
        lower: (diameter - gripSize - (thickness - gripSize)) / -2,
        upper: (diameter - gripSize - (thickness - gripSize)) / 2,
      },
      y: {
        lower: (diameter - thickness) * -1,
        upper: 0,
      },
    };

    let translateX = current.value.x - origin.value.x;
    let translateY = current.value.y - origin.value.y;

    if (translateX < translateBounds.x.lower) {
      translateX = translateBounds.x.lower;
    } else if (translateX > translateBounds.x.upper) {
      translateX = translateBounds.x.upper;
    }

    if (translateY < translateBounds.y.lower) {
      translateY = translateBounds.y.lower;
    } else if (translateY > translateBounds.y.upper) {
      translateY = translateBounds.y.upper;
    }

    return {
      transform: [{ translateX }, { translateY }],
    };
  });

  return (
    <View style={{ borderWidth: 0 }} onLayout={onLayout}>
      <Groove diameter={diameter} thickness={thickness} />
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[styles.gripContainer, { bottom: gripBottom }, offsets]}
        >
          <Grip diameter={gripSize} color="#eee" />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

// const Dial =
const styles = StyleSheet.create({
  gripContainer: {
    position: "absolute",
    alignSelf: "center",
  },
});
