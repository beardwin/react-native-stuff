import { View, StyleSheet, Text, ColorValue } from "react-native";
import { TimerControl } from "./TimerControl";
import React, { forwardRef, useImperativeHandle } from "react";
import Svg, { Circle } from "react-native-svg";
import { useTimer } from "./useTimer";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  duration: number;
  radius: number;
  strokeWidth: number;
  backgroundColor?: ColorValue;
  foregroundColor?: ColorValue;
  fontColor?: ColorValue;
  showControls?: boolean;
}

type TimerAPI = Pick<ReturnType<typeof useTimer>, "start" | "cancel" | "reset">;

export const Timer = forwardRef<TimerAPI, Props>(
  (
    {
      duration = 10000,
      radius,
      strokeWidth,
      backgroundColor = "rgba(0, 0, 0, 0.1)",
      foregroundColor = "rgba(0, 0, 0, 0.7)",
      fontColor = "rgba(255,255,255, 1)",
      showControls = true,
    }: Props,
    ref
  ) => {
    const { progress, ...timer } = useTimer();

    useImperativeHandle(
      ref,
      () => {
        return {
          start: timer.start,
          cancel: timer.cancel,
          reset: timer.reset,
        };
      },
      [timer.start, timer.cancel, timer.reset]
    );

    const width = radius * 2;
    const r = radius - strokeWidth / 2;
    const diameter = r * 2;
    const circumference = diameter * Math.PI;

    const animatedProps = useAnimatedProps(() => {
      return {
        strokeDashoffset: progress.value * circumference,
      };
    });

    const progressValue = useDerivedValue(
      () => `${Math.ceil((duration - progress.value * duration) / 1000)}`
    );

    return (
      <View style={[styles.container]}>
        <View style={[styles.timerContainer, { width }]}>
          <Svg style={styles.svg}>
            <Circle
              cx={width / 2}
              cy={width / 2}
              r={r}
              strokeWidth={strokeWidth}
              stroke={backgroundColor}
            />
            <AnimatedCircle
              cx={width / 2}
              cy={width / 2}
              r={r}
              strokeWidth={strokeWidth}
              stroke={foregroundColor}
              strokeDasharray={circumference}
              animatedProps={animatedProps}
            />
          </Svg>
          <ReText
            style={[
              styles.progress,
              {
                width: diameter - strokeWidth,
                fontSize: diameter * 0.3,
                color: fontColor,
              },
            ]}
            textAlign="center"
            text={progressValue}
          />
        </View>
        {showControls ? (
          <View style={styles.controlContainer}>
            <TimerControl
              state={timer.state}
              onStart={() => timer.start({ duration })}
              onCancel={timer.cancel}
              onReset={timer.reset}
            />
          </View>
        ) : null}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  timerContainer: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  svg: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ rotate: "-90deg" }],
  },
  controlContainer: {
    justifyContent: "center",
  },
  progress: {
    textAlign: "center",
  },
});
