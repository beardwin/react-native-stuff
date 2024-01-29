import {
  ColorValue,
  LayoutRectangle,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Stack } from "../Stack";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

interface Props {
  options: string[];
  highlightColor?: ColorValue;
  selectedIndex?: number;
  onSelectedIndexChange?: (selectedIndex: number) => void;
}

export const SegmentedControl = ({
  options,
  highlightColor = "rgba(0,0,0,0.1)",
  selectedIndex = 0,
  onSelectedIndexChange,
}: Props) => {
  const [layouts, setLayouts] = useState<Record<string, LayoutRectangle>>({});

  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const borderRadius = useSharedValue(0);

  const onLayout = (layout: LayoutRectangle, option: string) => {
    setLayouts((current) => {
      return {
        ...current,
        [option]: layout,
      };
    });

    if (selectedIndex === options.indexOf(option)) {
      x.value = layout.x;
      y.value = layout.y;
      width.value = layout.width;
      height.value = layout.height;
      borderRadius.value = layout.height / 2;
    }
  };

  const onPress = (option: string) => {
    const layout = layouts[option];

    x.value = withTiming(layout.x);
    y.value = withTiming(layout.y);
    width.value = withTiming(layout.width);
    height.value = withTiming(layout.height);
    borderRadius.value = withTiming(layout.height / 2);

    onSelectedIndexChange?.(options.indexOf(option));
  };

  const highlightStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }],
      width: width.value,
      height: height.value,
      borderRadius: borderRadius.value,
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          { backgroundColor: highlightColor, position: "absolute" },
          highlightStyle,
        ]}
      />
      <Stack horizontal gap={0}>
        {options.map((option) => (
          <View
            key={option}
            onLayout={(e) => onLayout(e.nativeEvent.layout, option)}
          >
            <TouchableOpacity onPress={() => onPress(option)}>
              <View style={styles.option}>
                <Text>{option}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    paddingVertical: 4,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
