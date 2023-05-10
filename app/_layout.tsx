import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(home)"
        options={{ title: "Home", headerShown: false }}
      />
    </Stack>
  );
}
