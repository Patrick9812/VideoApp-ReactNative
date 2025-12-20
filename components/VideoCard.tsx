import React from "react";
import { View, Text, StyleSheet } from "react-native";
import formatDate from "./FormatDate";

interface VideoCardProps {
  title: string;
  date?: string;
}

export const VideoCard = ({ title, date }: VideoCardProps) => {
  return (
    <View style={styles.videoCard}>
      <View style={styles.videoThumbnailPlaceholder} />
      <Text style={styles.videoTitlePlaceholder} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.videoDatePlaceholder}>{formatDate(date)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  videoCard: { width: 200, marginRight: 15 },
  videoThumbnailPlaceholder: {
    width: 200,
    height: 110,
    backgroundColor: "#5D5FEF",
    borderRadius: 12,
    marginBottom: 8,
  },
  videoTitlePlaceholder: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#2B2D42",
    lineHeight: 18,
  },
  videoDatePlaceholder: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#8D99AE",
    textAlign: "right",
    marginTop: 4,
  },
});
