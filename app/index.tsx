import { Link } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { Row } from "../src/components/Row";

export default function Page() {
  return (
    <ScrollView>
      <Link href="/timer" asChild>
        <Pressable>
          {({ pressed }) => (
            <Row description="Timer Control" pressed={pressed} />
          )}
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
