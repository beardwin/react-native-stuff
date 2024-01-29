import { ScrollView } from "react-native";
import { RowLink } from "../../src/components/RowLink";

export default function ComponentsScreen() {
  return (
    <ScrollView>
      <RowLink href="/components/button">Button</RowLink>
      <RowLink href="/components/click-wheel">Click Wheel</RowLink>
      <RowLink href="/components/grip">Grip</RowLink>
      <RowLink
        href="/components/product-card"
        description="An example of the Compound Component pattern"
      >
        Product Card
      </RowLink>
      <RowLink href="/components/segmented-control">Segment Control</RowLink>
      <RowLink href="/components/timer">Timer</RowLink>
      <RowLink href="/components/swipeable-row">Swipeable Row</RowLink>
    </ScrollView>
  );
}
