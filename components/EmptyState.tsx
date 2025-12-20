import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const EmptyState = ({ message }: { message: string }) => (
  <View style={styles.container}>
    <Ionicons name="search-outline" size={80} color="#E1E4E8" />
    <Text style={styles.title}>No results found</Text>
    <Text style={styles.subtitle}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    paddingHorizontal: 40,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#2B2D42",
    marginTop: 20,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#8D99AE",
    textAlign: "center",
    marginTop: 8,
  },
});
