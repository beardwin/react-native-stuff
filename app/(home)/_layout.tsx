import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="components" options={{ title: "Components" }} />
      <Tabs.Screen name="navigation" options={{ title: "Navigation" }} />
    </Tabs>
  );
}
