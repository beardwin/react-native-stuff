import { Text } from "react-native";
import { useProductCard } from "../ProductCardProvider";

export const Merchant = () => {
  const product = useProductCard();

  return <Text style={{ fontWeight: "500" }}>{product.merchant}</Text>;
};
