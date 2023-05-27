import React from "react";
import { Product } from "./types";
import { ProductCardProvider } from "./ProductCardProvider";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Image } from "./components/Image";

interface NoMeasurements {
  width?: undefined;
  height?: undefined;
  aspectRatio?: undefined;
}

interface ExplicitSize {
  width: number;
  height: number;
  aspectRatio?: never;
}

interface WidthWithAspectRatio {
  width: number;
  height?: never;
  aspectRatio: number;
}

interface HeightWithAspectRatio {
  width?: never;
  height: number;
  aspectRatio: number;
}

type Measurements =
  | NoMeasurements
  | ExplicitSize
  | WidthWithAspectRatio
  | HeightWithAspectRatio;

interface Props {
  product: Product;
  children?: React.ReactNode;
}

export const ProductCard = ({
  product,
  width,
  height,
  aspectRatio,
  children,
}: Props & Measurements) => {
  const window = useWindowDimensions();

  let _width = width;
  let _height = height;
  let _aspectRatio = aspectRatio;

  if (_width === undefined && _height === undefined) {
    _width = window.width / 3;
    _aspectRatio = 3 / 4;
  }
  return (
    <ProductCardProvider product={product}>
      <View style={[styles.container, { width: _width }]}>
        <View
          style={{ width: _width, height: _height, aspectRatio: _aspectRatio }}
        >
          <Image />
        </View>
        <View style={styles.content}>{children}</View>
      </View>
    </ProductCardProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  content: {
    // gap: 2,
  },
});
