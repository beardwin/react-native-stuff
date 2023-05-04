import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const AppLayout = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safearea}>
        <Stack />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
});
