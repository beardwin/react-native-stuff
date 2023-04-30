import { View, StyleSheet, Text } from "react-native";
import { TimerControl } from "./TimerControl";
import React from "react";
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
}
export const Timer = ({ duration = 15000, radius, strokeWidth }: Props) => {
  const { progress, ...timer } = useTimer();
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
        <Svg style={[StyleSheet.absoluteFillObject]}>
          <Circle
            cx={width / 2}
            cy={width / 2}
            r={r}
            strokeWidth={strokeWidth}
            stroke="#303858"
          />
          <AnimatedCircle
            cx={width / 2}
            cy={width / 2}
            r={r}
            strokeWidth={strokeWidth * 0.66}
            stroke="#A6E1FA"
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
            },
          ]}
          textAlign="center"
          text={progressValue}
        />
      </View>
      <View style={styles.controlContainer}>
        <TimerControl
          state={timer.state}
          onStart={() => timer.start({ duration })}
          onCancel={timer.cancel}
          onReset={timer.reset}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
  },
  timerContainer: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  controlContainer: {
    justifyContent: "center",
  },
  progress: {
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.7)",
  },
});
