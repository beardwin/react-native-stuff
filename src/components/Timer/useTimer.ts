import React from "react";
import {
  Easing,
  cancelAnimation,
  runOnJS,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { TimerState } from "./types";

export const useTimer = () => {
  const progress = useSharedValue(0);
  const [state, setState] = React.useState<TimerState>("idle");

  const reset = ({ delay }: { delay?: number } = { delay: 0 }) => {
    progress.value = withDelay(
      delay ?? 0,
      withTiming(0, { duration: 1000 }, () => {
        runOnJS(setState)("idle");
      })
    );
  };

  const cancel = () => {
    cancelAnimation(progress);
    reset({ delay: 250 });
    setState("resetting");
  };

  const start = ({ duration }: { duration: number }) => {
    progress.value = withTiming(
      1,
      {
        duration,
        easing: Easing.linear,
      },
      (finished) => {
        if (finished) {
          runOnJS(setState)("finished");
          runOnJS(reset)({ delay: 1000 });
        }
      }
    );
    setState("running");
  };

  return {
    progress,
    state,
    start,
    reset,
    cancel,
  };
};
