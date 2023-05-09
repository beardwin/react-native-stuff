import { StyleSheet, Text, View } from "react-native";

const Tab1 = () => {
  return (
    <View style={styles.container}>
      <Text>Tab 1</Text>
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

export default Tab1;
