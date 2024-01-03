import { View, Text } from "react-native";

interface Props {
  title: string;
  onPress?: () => void;
}

export const Button = ({ title, onPress }: Props) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};
