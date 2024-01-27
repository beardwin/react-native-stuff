import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AppLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="(home)"
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen
          name="navigation/modal"
          options={{ title: "Modal", presentation: "modal" }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
