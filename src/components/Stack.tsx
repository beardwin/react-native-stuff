import { View } from "react-native";

interface Props {
  gap?: number;
  horizontal?: boolean;
  children?: React.ReactNode;
}
export const Stack = ({ gap = 8, horizontal, children }: Props) => {
  return (
    <View
      style={{
        flexDirection: horizontal ? "row" : "column",
        gap,
        alignItems: horizontal ? "center" : undefined,
      }}
    >
      {children}
    </View>
  );
};

export const HStack = (props: Omit<Props, "horizontal">) => (
  <Stack horizontal {...props} />
);

export const VStack = (props: Omit<Props, "horizontal">) => (
  <Stack {...props} />
);
