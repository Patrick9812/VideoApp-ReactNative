import React from "react";
import { View, Text, StyleSheet, Image } from "react-native"; // Dodaj Image
import formatDate from "./FormatDate";

interface VideoCardProps {
  title: string;
  date?: string;
  thumbnail?: string;
}

export const VideoCard = ({ title, date, thumbnail }: VideoCardProps) => {
  return (
    <View style={styles.videoCard}>
      {thumbnail ? (
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={styles.videoThumbnailPlaceholder} />
      )}

      <Text style={styles.videoTitlePlaceholder} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.videoDatePlaceholder}>{formatDate(date)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  videoCard: { width: 200, marginRight: 15 },
  thumbnail: {
    width: 200,
    height: 110,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "#E1E1E1",
  },
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
    color: "#2B2D42",
    fontWeight: "600", // Zmień 600 na string "600" - RN czasem wyrzuca błąd przy liczbie
    textAlign: "right",
    marginTop: 4,
  },
});
