import {
  Image as RNImage,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { useProductCard } from "../ProductCardProvider";

export const Image = () => {
  const product = useProductCard();

  return <RNImage source={{ uri: product.imageUrl }} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "lightgray",
    borderRadius: 8,
  },
});
