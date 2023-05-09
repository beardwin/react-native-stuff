import { StyleSheet, Text, View } from "react-native";

const Tab2 = () => {
  return (
    <View style={styles.container}>
      <Text>Tab 2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Tab2;
