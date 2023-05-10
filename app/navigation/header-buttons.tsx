import { Stack } from "expo-router";
import { useState } from "react";
import { Button } from "react-native";

export default function HeaderButtonsExample() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Count: ${count}`,
          headerRight: () => (
            <>
              <Button
                title="-"
                onPress={() => setCount((current) => current - 1)}
              />
              <Button
                title="+"
                onPress={() => setCount((current) => current + 1)}
              />
            </>
          ),
        }}
      />
    </>
  );
}
