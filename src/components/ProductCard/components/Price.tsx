import { Text, View, StyleSheet } from "react-native";
import { useProductCard } from "../ProductCardProvider";

export const Price = () => {
  const product = useProductCard();

  const discount =
    product.discountedPrice !== undefined ? (
      <Text
        style={[styles.price, styles.discount]}
      >{`$${product.discountedPrice}`}</Text>
    ) : null;

  const price = (
    <Text
      style={[styles.price, discount ? styles.discounted : null]}
    >{`$${product.price}`}</Text>
  );

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {discount}
      {price}
    </View>
  );
};

const styles = StyleSheet.create({
  price: {
    fontWeight: "500",
  },
  discount: {
    color: "red",
  },
  discounted: {
    textDecorationLine: "line-through",
  },
});
