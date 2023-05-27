import { ScrollView, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import Card, { ProductCard } from "../../src/components/ProductCard";
import { Product } from "../../src/components/ProductCard/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const product = {
  name: "Men's Plan Pacers - Natural Black (Blizzard Sole)",
  merchant: "Allbirds Canada",
  price: 180,
  discountedPrice: 155,
  imageUrl:
    "https://cdn.shopify.com/s/files/1/2804/0750/products/AB007NM090_SHOE_45_GLOBAL_MENS_PLANT_PACER_NATURAL_BLACK_BLIZZARD.png?v=1679683466&width=1080&format=webp",
} satisfies Product;

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
      <Stack.Screen options={{ title: "Product Card" }} />

      <Row>
        <Card product={product} />
      </Row>

      <Row>
        <Card product={product} width={100} height={175} />
        <Card product={product} width={100} height={175} />
        <Card product={product} width={100} height={175} />
      </Row>
      <Row>
        <Card product={product}>
          <ProductCard.Merchant />
        </Card>
      </Row>
      <Row>
        <Card product={product}>
          <ProductCard.Merchant />
          <ProductCard.Title />
        </Card>
      </Row>
      <Row>
        <Card product={product}>
          <ProductCard.Merchant />
          <ProductCard.Title />
          <ProductCard.Price />
        </Card>
      </Row>
      <Row>
        <Card product={product} width={100} aspectRatio={1} horizontal>
          <ProductCard.Merchant />
          <ProductCard.Title />
          <ProductCard.Price />
        </Card>
      </Row>
      <Row>
        <Card product={product}>
          <ProductCard.Price />
          <ProductCard.Title />
        </Card>
      </Row>
      <Row>
        <Card product={product}>
          <ProductCard.Title />
          <ProductCard.Price />
        </Card>
      </Row>
    </ScrollView>
  );
}

const Row = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.card}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  card: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
  },
});
