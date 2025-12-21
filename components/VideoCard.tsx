import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import formatDate from "./FormatDate";
import colors from "../theme/colors";

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
    color: colors.darkBlue,
    lineHeight: 18,
  },
  videoDatePlaceholder: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: colors.darkBlue,
    fontWeight: "600",
    textAlign: "right",
    marginTop: 4,
  },
});
