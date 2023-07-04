import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet, LayoutRectangle, ColorValue } from "react-native";
import { useState } from "react";

type Threshold = {
  stop: number;
  backgroundColor: ColorValue;
};

type Thresholds = {
  upvote: Threshold;
  downvote: Threshold;
};

const DEFAULT_THRESHOLDS = {
  upvote: {
    stop: 65,
    backgroundColor: "orange",
  },
  downvote: {
    stop: 100,
    backgroundColor: "blue",
  },
} satisfies Thresholds;

interface Props {
  translateX: Animated.SharedValue<number>;
  thresholds?: Thresholds;
  vote?: number;
  onUpVote: () => void;
  onDownVote: () => void;
}

export const VoteOption = ({
  translateX,
  thresholds = DEFAULT_THRESHOLDS,
  vote = 0,
}: Props) => {
  const [first, second] =
    vote === -1
      ? [thresholds.downvote, thresholds.upvote]
      : [thresholds.upvote, thresholds.downvote];

  const [arrow, setArrow] = useState<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  // The timer used for the rotation animation
  const rotationTimer = useSharedValue(0);
  // Triggers a 180 degree rotation animation when the user
  // drags across the appropriate threshold.
  useAnimatedReaction(
    () => translateX.value,
    (currentValue, previousValue) => {
      if (
        currentValue >= second.stop &&
        previousValue &&
        previousValue < second.stop
      ) {
        rotationTimer.value = withSpring(rotationTimer.value + 180, {
          damping: 12,
        });
      } else if (currentValue === 0) {
        rotationTimer.value = vote === -1 ? 180 : 0;
      } else if (
        currentValue <= second.stop &&
        previousValue &&
        previousValue >= second.stop
      ) {
        rotationTimer.value = withSpring(vote === -1 ? 180 : 0);
      }
    },
    [first, second]
  );

  /**
   * Controls the shifting of the background color
   * as a user swipes the row
   */
  const backgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      Math.abs(translateX.value),
      [0, first.stop / 2, first.stop, (first.stop + second.stop) / 2],
      [
        "transparent",
        first.backgroundColor as string,
        first.backgroundColor as string,
        second.backgroundColor as string,
      ]
    );

    const width = translateX.value;
    return { backgroundColor, width };
  });

  /**
   * Controls the arrow's scale and rotation
   */
  const arrowStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [0, first.stop],
      [0.6, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          scale,
        },
        {
          rotate: `${rotationTimer.value}deg`,
        },
      ],
    };
  });

  return (
    <>
      <Animated.View style={[styles.background, backgroundStyle]} />
      <Animated.View style={[styles.option, arrowStyle]}>
        <AntDesign
          name="arrowup"
          size={24}
          color="white"
          onLayout={(event) => console.log(event.nativeEvent.layout)}
        />
      </Animated.View>
    </>
  );
};

const paddingHorizontal = 8;
const styles = StyleSheet.create({
  option: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    borderwidth: 1,
  },
});
