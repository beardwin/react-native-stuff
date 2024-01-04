import React from "react";
import {
  ColorValue,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";

interface Props {
  size: number;
  color: ColorValue;
  shadowColor?: ColorValue;
}

export const Grip = ({ size, color }: Props) => {
  const dimpleSize = size / 5;

  return (
    <Surface size={size} color={color}>
      <Surface size={dimpleSize} color={color} />
      <Surface size={dimpleSize} color={color} />
      <Surface size={dimpleSize} color={color} />
    </Surface>
  );
};

interface SurfaceProps {
  size: number;
  color: ColorValue;
  shadowRadius?: number;
  children?: React.ReactNode;
}

const Surface = ({ size, color, children }: SurfaceProps) => {
  const container: StyleProp<ViewStyle> = {
    width: size,
    aspectRatio: 1,
    borderRadius: 999,
  };

  const shadowRadius = size / 60;
  return (
    <View
      style={[
        container,
        styles.highlight,
        {
          shadowRadius,
          shadowOffset: { width: -2 * shadowRadius, height: -2 * shadowRadius },
        },
      ]}
    >
      <View
        style={[
          container,
          styles.inner,
          styles.shadow,
          {
            backgroundColor: color,
            gap: size / 10,
            shadowRadius,
            shadowOffset: {
              width: 2 * shadowRadius,
              height: 2 * shadowRadius,
            },
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  highlight: {
    shadowColor: "#fff",
    shadowOpacity: 0.5,
  },
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.2,
  },
  inner: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
