import { ScrollView } from "react-native";
import { RowLink } from "../../src/components/RowLink";

export default function ComponentsScreen() {
  return (
    <ScrollView>
      <RowLink href="/components/timer">Timer</RowLink>
    </ScrollView>
  );
}
