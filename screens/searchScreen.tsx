import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchInput } from "../components/SearchBar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import formatDate from "../components/FormatDate";
import { fetchVideosByCategory } from "../api/fetchDataApi";

type SortOption = "Latest" | "Oldest" | "Popular";

const SORT_LABELS: Record<SortOption, string> = {
  Latest: "Upload date: latest",
  Oldest: "Upload date: oldest",
  Popular: "Most popular",
};

export default function SearchScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const tabBarHeight = useBottomTabBarHeight();

  const [searchQuery, setSearchQuery] = useState("");
  const [allVideos, setAllVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("Latest");

  const loadVideos = async (query: string) => {
    setLoading(true);
    try {
      const refinedQuery = query
        ? `${query} programming tutorial`
        : "React Native programming";
      const data = await fetchVideosByCategory(refinedQuery);
      setAllVideos(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const params = route.params as
        | { initialQuery?: string; shouldClear?: boolean }
        | undefined;

      if (params?.shouldClear) {
        setSearchQuery("");
        loadVideos("");
        navigation.setParams({ shouldClear: undefined });
      } else if (params?.initialQuery) {
        setSearchQuery(params.initialQuery);
        loadVideos(params.initialQuery);
        navigation.setParams({ initialQuery: undefined });
      }
    }, [route.params])
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (
        searchQuery &&
        !route.params?.initialQuery &&
        !route.params?.shouldClear
      ) {
        loadVideos(searchQuery);
      }
    }, 600);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const sortedVideos = useMemo(() => {
    const results = [...allVideos];
    return results.sort((a, b) => {
      const timeA = a.date ? new Date(a.date).getTime() : 0;
      const timeB = b.date ? new Date(b.date).getTime() : 0;
      if (sortBy === "Latest") return timeB - timeA;
      if (sortBy === "Oldest") return timeA - timeB;
      if (sortBy === "Popular")
        return (parseInt(b.views) || 0) - (parseInt(a.views) || 0);
      return 0;
    });
  }, [allVideos, sortBy]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? tabBarHeight : 0}
      >
        <View style={styles.container}>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ marginTop: 20 }}
          />

          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              {loading ? (
                <ActivityIndicator size="small" color="#2B2D42" />
              ) : (
                <Text style={styles.resultsCount}>
                  {allVideos.length} results found for:{" "}
                  <Text style={styles.boldText}>
                    "{searchQuery || "All categories"}"
                  </Text>
                </Text>
              )}
            </View>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Text style={styles.sortButtonText}>
                Sort by:{" "}
                <Text style={styles.boldText}>{SORT_LABELS[sortBy]}</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={sortedVideos}
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
                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.thumbnail}
                />
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
              {(["Latest", "Oldest", "Popular"] as SortOption[]).map(
                (option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.radioOption}
                    onPress={() => setSortBy(option)}
                  >
                    <View style={styles.radioOuter}>
                      {sortBy === option && <View style={styles.radioInner} />}
                    </View>
                    <Text style={styles.radioText}>{SORT_LABELS[option]}</Text>
                  </TouchableOpacity>
                )
              )}
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

// Style pozostają bez zmian
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1, paddingHorizontal: 25 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  resultsCount: {
    fontSize: 10,
    color: "#2B2D42",
    opacity: 0.7,
  },
  sortButtonText: {
    fontSize: 11,
    color: "#2B2D42",
  },
  boldText: { fontWeight: "bold" },
  videoCard: { marginBottom: 25 },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    backgroundColor: "#E1E4E8",
  },
  cardInfo: { marginTop: 8 },
  channelText: { fontWeight: "bold", fontSize: 13, color: "#2B2D42" },
  titleText: {
    fontSize: 13,
    color: "#2B2D42",
    lineHeight: 18,
  },
  dateText: {
    fontSize: 10,
    color: "#2B2D42",
    textAlign: "right",
    opacity: 0.5,
  },
  listContent: { paddingBottom: 20 },
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
    fontWeight: "bold",
    fontSize: 18,
    color: "#FFF",
    marginBottom: 20,
  },
  radioOption: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFF",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#2B2D42",
  },
  radioText: { color: "#FFF" },
  confirmButton: {
    backgroundColor: "#2B2D42",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 100,
  },
  confirmButtonText: { color: "#FFF", fontWeight: "bold" },
});
