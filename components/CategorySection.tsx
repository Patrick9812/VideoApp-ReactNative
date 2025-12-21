import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { VideoCard } from "./VideoCard";

interface VideoItem {
  id: string;
  videoTitle: string;
  channel: string;
  views: number;
  likes: number;
  description: string;
  date?: string;
  thumbnail: string;
}

interface CategorySectionProps {
  title: string;
  data: VideoItem[];
  isLast: boolean | null;
  onShowMore: () => void;
  onVideoPress: (video: VideoItem) => void;
}

export const CategorySection = ({
  title,
  data,
  isLast,
  onShowMore,
  onVideoPress,
}: CategorySectionProps) => (
  <View style={[styles.categoryContainer, isLast && { borderBottomWidth: 0 }]}>
    <View style={styles.categoryHeader}>
      <Text style={styles.categoryTitle}>{title}</Text>

      <TouchableOpacity onPress={onShowMore}>
        <Text style={styles.showMore}>Show more</Text>
      </TouchableOpacity>
    </View>

    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity activeOpacity={1} onPress={() => onVideoPress(item)}>
          <VideoCard
            title={item.videoTitle}
            date={item.date}
            thumbnail={item.thumbnail}
          />
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingLeft: 25, paddingRight: 25 }}
    />
  </View>
);

const styles = StyleSheet.create({
  categoryContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  categoryTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#2B2D42",
  },
  showMore: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#2B2D42",
    textDecorationLine: "underline",
  },
});
