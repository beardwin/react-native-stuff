import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

interface Props {
  leftOption?: JSX.Element;
  rightOption?: JSX.Element;
  children: React.ReactNode;
}

export const SwipeableRow = ({ leftOption, rightOption, children }: Props) => {
  const translateX = useSharedValue(0);
  const swipeRightEnabled = Boolean(leftOption);
  const swipeLeftEnabled = Boolean(rightOption);
  // const leftBg = leftOption?.backgroundColor ?? "transparent";
  // const rightBg = rightOption?.backgroundColor ?? "transparent";

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number }
  >({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      if (event.translationX > ctx.startX && swipeRightEnabled) {
        translateX.value = ctx.startX + event.translationX;
      } else if (event.translationX < ctx.startX && swipeLeftEnabled) {
        translateX.value = ctx.startX + event.translationX;
      }
    },
    onEnd: (event) => {
      translateX.value = withTiming(0, { easing: Easing.out(Easing.cubic) });
    },
  });

  // const backgroundStyle = useAnimatedStyle(() => {
  //   const target = translateX.value > 0 ? leftBg : rightBg;
  //   const backgroundColor = interpolateColor(
  //     Math.abs(translateX.value),
  //     [0, 50],
  //     ["transparent", target as string]
  //   );

  //   return {
  //     backgroundColor,
  //   };
  // });

  const rowStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.25,
      transform: [{ translateX: translateX.value }],
    };
  });

  const leftOptionWidth = useAnimatedStyle(() => {
    return {
      width: interpolate(translateX.value, [-1, 0, 1], [0, 0, 1]),
    };
  });

  const rightOptionWidth = useAnimatedStyle(() => {
    return {
      width: interpolate(translateX.value, [-1, 0, 1], [1, 0, 0]),
    };
  });

  return (
    <View style={[styles.swipeableRow]}>
      <View style={styles.optionsContainer}>
        <Animated.View style={[styles.option, styles.left, leftOptionWidth]}>
          {leftOption}
        </Animated.View>
        <Animated.View style={[styles.option, styles.right, rightOptionWidth]}>
          {rightOption}
        </Animated.View>
      </View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={rowStyle}>{children}</Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  swipeableRow: {
    overflow: "hidden",
  },
  optionsContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  option: {
    position: "absolute",
    top: 0,
    bottom: 0,
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
});
