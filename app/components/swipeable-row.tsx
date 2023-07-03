import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Row } from "../../src/components/Row";
import { SwipeableOptions } from "../../src/components/SwipeableRow/SwipeableRow";

export default function Page() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: 16,
        paddingBottom: insets.bottom,
      }}
    >
      <Stack.Screen options={{ title: "Swipeable Row" }} />

      <SwipeableOptions onActivate={(id) => Alert.alert(`Activated ${id}`)}>
        <Row
          title="Swipeable with no options"
          description="SwipeableRow without any options. This should not be swipeable."
        />
      </SwipeableOptions>
      <SwipeableOptions leftOption={<Text>Poofarts</Text>}>
        <Row
          title="Swipeable with left options"
          description="Should only allow users to swipe left to right"
        />
      </SwipeableOptions>
      <SwipeableOptions rightOption={<Text>Poofarts</Text>}>
        <Row
          title="Swipeable with right options"
          description="Should only allow users to swipe right to left"
        />
      </SwipeableOptions>
      <Row
        title="Swipeable with right and left options"
        description="Should allow users to swipe left and right"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
