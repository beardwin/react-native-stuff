import { ScrollView } from "react-native";
import { RowLink } from "../../src/components/RowLink";

export default function ComponentsScreen() {
  return (
    <ScrollView>
      <RowLink
        href="/components/product-card"
        description="An example of the Compound Component pattern"
      >
        Product Card
      </RowLink>
      <RowLink href="/components/timer">Timer</RowLink>
    </ScrollView>
  );
}
