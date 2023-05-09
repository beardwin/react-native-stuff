import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { RowLink } from "../src/components/RowLink";

export default function Page() {
  return (
    <ScrollView>
      <RowLink href="/tabs">Tabs (modal)</RowLink>
      <RowLink href="/timer">Timer</RowLink>
    </ScrollView>
  );
}
