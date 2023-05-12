import React from "react";
import { ScrollView, View, Text } from "react-native";
import { RowLink } from "../../src/components/RowLink";

export default function NavigationScreen() {
  return (
    <ScrollView>
      <RowLink href="/navigation/header-buttons">Header Buttons</RowLink>
      <RowLink href="/navigation/modal">Modal</RowLink>
    </ScrollView>
  );
}
