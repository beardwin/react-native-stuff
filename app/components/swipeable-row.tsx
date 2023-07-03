import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Row } from "../../src/components/Row";
import { SwipeableRow } from "../../src/components/SwipeableRow/SwipeableRow";

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

      <SwipeableRow>
        <Row
          title="Swipeable with no options"
          description="SwipeableRow without any options. This should not be swipeable."
        />
      </SwipeableRow>
      <SwipeableRow
        leftOption={
          <View style={styles.option}>
            <Text ellipsizeMode="clip" numberOfLines={1}>
              Poofarts
            </Text>
          </View>
        }
      >
        <Row
          title="Swipeable with left options"
          description="Should only allow users to swipe left to right"
        />
      </SwipeableRow>
      <SwipeableRow
        rightOption={
          <View style={styles.option}>
            <Text ellipsizeMode="clip" numberOfLines={1}>
              Poofarts
            </Text>
          </View>
        }
      >
        <Row
          title="Swipeable with right options"
          description="Should only allow users to swipe right to left"
        />
      </SwipeableRow>
      <SwipeableRow
        leftOption={
          <View style={styles.option}>
            <Text ellipsizeMode="clip" numberOfLines={1}>
              Poofarts
            </Text>
          </View>
        }
        rightOption={
          <View style={styles.option}>
            <Text ellipsizeMode="clip" numberOfLines={1}>
              Poofarts
            </Text>
          </View>
        }
      >
        <Row
          title="Swipeable with right and left options"
          description="Should allow users to swipe left and right"
        />
      </SwipeableRow>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  option: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
