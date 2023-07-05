import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  runOnJS,
  runOnUI,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, ColorValue, LayoutRectangle } from "react-native";
import { useState } from "react";
import * as Haptics from "expo-haptics";

interface VoteColor {
  foreground: ColorValue;
  background: ColorValue;
}

type VoteColors = {
  upvote: VoteColor;
  downvote: VoteColor;
};

const DEFAULT_VOTE_COLORS: VoteColors = {
  upvote: {
    foreground: "#fff",
    background: "orange",
  },
  downvote: {
    foreground: "#fff",
    background: "blue",
  },
};

type Stops = [first: number, second: number];
const DEFAULT_STOPS: Stops = [75, 125];

interface Props {
  translateX: Animated.SharedValue<number>;
  stops?: Stops;
  voteColors?: VoteColors;
  vote?: number;
  onUpVote: () => void;
  onDownVote: () => void;
}

const buzz = () => {
  "worklet";
  runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
};

export const VoteOption = ({
  translateX,
  stops = DEFAULT_STOPS,
  voteColors = DEFAULT_VOTE_COLORS,
  vote = 0,
}: Props) => {
  const [arrow, setArrow] = useState<LayoutRectangle | null>(null);

  const [firstStop, secondStop] = stops;
  const [first, second] =
    vote === -1
      ? [voteColors.downvote, voteColors.upvote]
      : [voteColors.upvote, voteColors.downvote];

  // The timer used for the rotation animation
  const rotationTimer = useSharedValue(0);

  // Triggers a 180 degree rotation animation when the user
  // drags across the appropriate threshold.
  useAnimatedReaction(
    () => translateX.value,
    (currentValue, previousValue) => {
      const hitFirstStop =
        previousValue &&
        ((currentValue >= firstStop && previousValue < firstStop) ||
          (currentValue < firstStop && previousValue >= firstStop));

      const hitSecondStop =
        currentValue >= secondStop &&
        previousValue &&
        previousValue < secondStop;

      if (hitFirstStop) {
        buzz();
      }

      if (hitSecondStop) {
        buzz();
        rotationTimer.value = withSpring(rotationTimer.value + 180, {
          damping: 12,
        });
      } else if (
        currentValue <= secondStop &&
        previousValue &&
        previousValue >= secondStop
      ) {
        buzz();
        rotationTimer.value = withSpring(rotationTimer.value - 180, {
          damping: 12,
        });
      } else if (currentValue === 0) {
        rotationTimer.value = vote === -1 ? 180 : 0;
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
      [0, firstStop / 2, firstStop * 1.5, secondStop],
      [
        "transparent",
        first.background as string,
        first.background as string,
        second.background as string,
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
      [0, firstStop * 0.8],
      [0.4, 1],
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

  const arrowOffset = useAnimatedStyle(() => {
    const xOffset = interpolate(
      translateX.value,
      [0, firstStop, secondStop],
      [
        -(arrow?.width ?? 0),
        (firstStop - (arrow?.width ?? 0)) / 2,
        (secondStop - (arrow?.width ?? 0)) / 2,
      ]
    );

    return {
      transform: [{ translateX: xOffset }],
    };
  }, [arrow]);

  return (
    <>
      <Animated.View style={[styles.background, backgroundStyle]} />
      <Animated.View style={[styles.option, arrowOffset]}>
        <Animated.View
          style={[styles.option, arrowStyle]}
          onLayout={(event) => {
            setArrow(event.nativeEvent.layout);
          }}
        >
          <AntDesign name="arrowup" size={24} color="white" />
        </Animated.View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  option: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    borderwidth: 1,
  },
});
