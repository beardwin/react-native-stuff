import { Text } from "react-native";
import { useProductCard } from "../ProductCardProvider";

export const Title = () => {
  const product = useProductCard();

  return <Text numberOfLines={1}>{product.name}</Text>;
};
