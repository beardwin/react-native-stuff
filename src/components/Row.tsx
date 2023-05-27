import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  title: string;
  description?: string;
  pressed?: boolean;
}

export const Row = ({ title, description, pressed }: Props) => {
  return (
    <View style={[styles.row, { opacity: pressed ? 0.2 : 1 }]}>
      <View>
        <Text>{title}</Text>
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
      </View>
      <AntDesign name="right" size={24} color="grey" />
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
  description: {
    fontSize: 12,
  },
});
