import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  SharedValue,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  GestureEventPayload,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

type SwipeableRowContext = {
  startX: number;
};

interface Props {
  /**
   * The left option to display when swiping left to right
   */
  leftOption?: JSX.Element;

  /**
   * The right option to display when swiping right to left
   */
  rightOption?: JSX.Element;

  /**
   * The shared value to use for the translateX value.
   * This value will be updated while the user swipes
   * as well as lets go.
   */
  translateX?: SharedValue<number>;

  /**
   * Fired when the user lets go of the swipeable row
   */
  onSwipeEnd?: (
    event: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>
  ) => void;

  /**
   * The component which will pan right and left as the user drags
   */
  children: React.ReactNode;
}

export const SwipeableRow = ({
  leftOption,
  rightOption,
  translateX = { value: 0 },
  onSwipeEnd,
  children,
}: Props) => {
  const _translateX = useSharedValue(0);
  const swipeRightEnabled = Boolean(leftOption);
  const swipeLeftEnabled = Boolean(rightOption);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    SwipeableRowContext
  >({
    onStart: (event, ctx) => {
      ctx.startX = _translateX.value;
      translateX.value = _translateX.value;
    },
    onActive: (event, ctx) => {
      if (event.translationX > ctx.startX && swipeRightEnabled) {
        _translateX.value = ctx.startX + event.translationX;
      } else if (event.translationX < ctx.startX && swipeLeftEnabled) {
        _translateX.value = ctx.startX + event.translationX;
      }
      translateX.value = _translateX.value;
    },
    onEnd: (event) => {
      _translateX.value = withTiming(0, { easing: Easing.out(Easing.cubic) });
      translateX.value = _translateX.value;
      onSwipeEnd?.(event);
    },
  });

  const rowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: _translateX.value }],
    };
  });

  return (
    <View style={[styles.swipeableRow]}>
      <View style={styles.optionsContainer}>
        <Animated.View style={[styles.option, styles.left]}>
          {leftOption}
        </Animated.View>
        <Animated.View style={[styles.option, styles.right]}>
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
