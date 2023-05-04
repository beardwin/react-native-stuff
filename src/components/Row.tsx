import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  description: string;
  pressed?: boolean;
}

export const Row = ({ description, pressed }: Props) => {
  return (
    <View style={[styles.row, { opacity: pressed ? 0.2 : 1 }]}>
      <Text>{description}</Text>
      <AntDesign name="right" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
});
