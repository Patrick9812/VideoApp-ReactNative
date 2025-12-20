import React, { useCallback, useEffect, useState } from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { CATEGORIES, Video } from "../API-data/mockData";
import formatDate from "../components/FormatDate"; // Import Twojej nowej funkcji
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchInput } from "../components/SearchBar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function SearchScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const tabBarHeight = useBottomTabBarHeight();

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState<"latest" | "oldest" | "popular">(
    "latest"
  );

  useEffect(() => {
    const q = route.params?.initialQuery;
    if (q) setSearchQuery(q);
  }, [route.params?.initialQuery]);

  useFocusEffect(
    useCallback(() => {
      const q = route.params?.initialQuery;
      if (!q) setSearchQuery("");
      return () => {
        navigation.setParams({ initialQuery: undefined });
      };
    }, [route.params?.initialQuery])
  );

  const getFilteredVideos = () => {
    const searchTerm = searchQuery.toLowerCase().trim();
    let results: Video[] = [];

    // KROK 1: Filtrowanie (Zgodne z Twoim pierwotnym kodem)
    CATEGORIES.forEach((category) => {
      category.data.forEach((video) => {
        const matchesSearch =
          searchTerm === "" ||
          video.videoTitle.toLowerCase().includes(searchTerm) ||
          video.channel.toLowerCase().includes(searchTerm) ||
          category.title.toLowerCase().includes(searchTerm);

        if (matchesSearch) {
          results.push(video);
        }
      });
    });

    // KROK 2: Unikalność
    let uniqueResults = Array.from(new Set(results.map((v) => v.id))).map(
      (id) => results.find((v) => v.id === id)!
    );

    // KROK 3: Sortowanie (Naprawione i bezpieczne)
    return uniqueResults.sort((a, b) => {
      if (sortBy === "latest" || sortBy === "oldest") {
        const timeA = a.date ? new Date(a.date).getTime() : 0;
        const timeB = b.date ? new Date(b.date).getTime() : 0;
        return sortBy === "latest" ? timeB - timeA : timeA - timeB;
      }
      if (sortBy === "popular") {
        return (b.views || 0) - (a.views || 0);
      }
      return 0;
    });
  };

  const filteredVideos = getFilteredVideos();

  const getSortLabel = () => {
    if (sortBy === "latest") return "Latest";
    if (sortBy === "oldest") return "Oldest";
    return "Popular";
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === "ios" ? tabBarHeight : 0}
      >
        <View style={styles.container}>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ marginTop: 20 }}
          />

          <View style={styles.infoRow}>
            <Text style={styles.resultsCount}>
              {searchQuery.length > 0 ? (
                <Text>
                  {filteredVideos.length} wyników dla:{" "}
                  <Text style={styles.boldText}>"{searchQuery}"</Text>
                </Text>
              ) : (
                <Text>Wszystkie filmy</Text>
              )}
            </Text>

            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Text style={styles.sortButtonText}>
                Sort by:{" "}
                <Text style={{ fontWeight: "700" }}>{getSortLabel()}</Text> ▾
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredVideos}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.videoCard}
                onPress={() =>
                  navigation.navigate("VideoDetails", { video: item })
                }
              >
                <View style={styles.thumbnailPlaceholder}>
                  <Text style={styles.placeholderText}>Miniaturka</Text>
                </View>

                <View style={styles.cardInfo}>
                  <Text style={styles.channelText}>{item.channel}</Text>
                  <Text style={styles.titleText} numberOfLines={2}>
                    {item.videoTitle}
                  </Text>
                  <Text style={styles.dateText}>{formatDate(item.date)}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <Modal transparent visible={isModalVisible} animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sort records by:</Text>
              {[
                { label: "Upload date: latest", value: "latest" },
                { label: "Upload date: oldest", value: "oldest" },
                { label: "Most popular", value: "popular" },
              ].map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.radioOption}
                  onPress={() => setSortBy(item.value as any)}
                >
                  <View style={styles.radioOuter}>
                    {sortBy === item.value && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.radioText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  flex: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 25 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  resultsCount: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#2B2D42",
    opacity: 0.7,
  },
  sortButtonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    color: "#2B2D42",
    textDecorationLine: "underline",
  },
  boldText: { fontFamily: "Poppins-Bold" },
  videoCard: { marginBottom: 25 },
  thumbnailPlaceholder: {
    width: "100%",
    height: 180,
    borderRadius: 15,
    backgroundColor: "#E1E4E8",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#8D99AE",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  cardInfo: { marginTop: 8 },
  channelText: { fontFamily: "Poppins-Bold", fontSize: 13, color: "#2B2D42" },
  titleText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#2B2D42",
    lineHeight: 18,
  },
  dateText: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#2B2D42",
    textAlign: "right",
    opacity: 0.5,
  },
  listContent: {
    paddingBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#9BA6B9",
    borderRadius: 30,
    padding: 30,
  },
  modalTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#FFF",
    marginBottom: 25,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#2B2D42",
  },
  radioText: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    color: "#FFF",
  },
  confirmButton: {
    backgroundColor: "#2B2D42",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 30,
  },
  confirmButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#FFF",
  },
});
