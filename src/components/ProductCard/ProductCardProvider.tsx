import React from "react";
import { Product } from "./types";

export const ProductCardContext = React.createContext<Product>({
  name: "",
  price: 0,
  imageUrl: "",
  merchant: "",
});

export const useProductCard = () => React.useContext(ProductCardContext);

interface Props {
  product: Product;
  children: React.ReactNode;
}

export const ProductCardProvider = ({ product, children }: Props) => {
  return (
    <ProductCardContext.Provider value={product}>
      {children}
    </ProductCardContext.Provider>
  );
};
