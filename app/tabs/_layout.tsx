import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="Tab1" options={{ title: "Tab 1" }} />
      <Tabs.Screen name="Tab2" options={{ title: "Tab 2" }} />
    </Tabs>
  );
}
