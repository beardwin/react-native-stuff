import React from "react";
import {
  ColorValue,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";

interface Props {
  diameter: number;
  color: ColorValue;
  shadowColor?: ColorValue;
}

export const Grip = ({ diameter, color }: Props) => {
  const dimpleSize = diameter / 5;

  return (
    <Surface diameter={diameter} color={color}>
      <Surface diameter={dimpleSize} color={color} />
      <Surface diameter={dimpleSize} color={color} />
      <Surface diameter={dimpleSize} color={color} />
    </Surface>
  );
};

interface SurfaceProps {
  diameter: number;
  color: ColorValue;
  shadowRadius?: number;
  children?: React.ReactNode;
}

const Surface = ({ diameter, color, children }: SurfaceProps) => {
  const container: StyleProp<ViewStyle> = {
    width: diameter,
    aspectRatio: 1,
    borderRadius: 999,
  };

  const shadowRadius = diameter / 60;
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
            gap: diameter / 10,
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
