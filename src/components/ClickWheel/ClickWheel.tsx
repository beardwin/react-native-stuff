import React from "react";
import { StyleSheet, View } from "react-native";
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
  const gripSize = thickness * 1.5;

  const origin = useSharedValue<undefined | Coordinate>(undefined);
  const current = useSharedValue<undefined | Coordinate>(undefined);

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
    if (!origin.value || !current.value) return {};

    return {
      transform: [
        { translateX: current.value.x - origin.value.x },
        { translateY: current.value.y - origin.value.y },
      ],
    };
  });

  return (
    <View style={{ borderWidth: 0 }}>
      <Groove diameter={diameter} thickness={thickness} />
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            styles.gripContainer,
            { bottom: (gripSize - thickness) / -2 },
            offsets,
          ]}
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
