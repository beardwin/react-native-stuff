import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

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

interface RowProps {
  description: string;
  pressed?: boolean;
}

const Row = ({ description, pressed }: RowProps) => {
  return (
    <View style={[styles.row, { opacity: pressed ? 0.2 : 1 }]}>
      <Text>{description}</Text>
      <AntDesign name="right" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
});
