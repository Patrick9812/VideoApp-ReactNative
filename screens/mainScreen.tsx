import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchInput } from "../components/SearchBar";
import { CategorySection } from "../components/CategorySection";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { fetchVideosByCategory } from "../api/fetchDataApi";
import colors from "../theme/colors";

const REQUIRED_CATEGORIES = [
  "React Native",
  "React",
  "Typescript",
  "Javascript",
];

export default function MainScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const promises = REQUIRED_CATEGORIES.map(async (category, index) => {
          const videos = await fetchVideosByCategory(`${category} programming`);
          return { id: String(index), title: category, data: videos };
        });
        const results = await Promise.all(promises);
        setCategoriesData(results);
      } catch (error) {
        console.error("Błąd ładowania:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const filteredData = categoriesData.filter((category) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      category.title.toLowerCase().includes(searchTerm) ||
      category.data.some((v: any) =>
        v.videoTitle.toLowerCase().includes(searchTerm)
      )
    );
  });

  if (isLoading) {
    return (
      <View style={styles.loadingCenter}>
        <ActivityIndicator size="large" color={colors.darkBlue} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const searchTerm = searchQuery.toLowerCase();
          const baseVideos = item.data.filter(
            (v: any) =>
              v.videoTitle.toLowerCase().includes(searchTerm) ||
              item.title.toLowerCase().includes(searchTerm)
          );

          return (
            <CategorySection
              title={item.title}
              data={baseVideos.slice(0, 5)}
              isLast={index === filteredData.length - 1}
              onShowMore={() =>
                navigation.navigate("Search", { initialQuery: item.title })
              }
              onVideoPress={(video) =>
                navigation.navigate("VideoDetails", { video })
              }
            />
          );
        }}
        ListHeaderComponent={
          <View style={styles.headerWrapper}>
            <SearchInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              showSettings
              onSettingsPress={() => navigation.navigate("Settings")}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.white },
  loadingCenter: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerWrapper: { paddingHorizontal: 25, marginTop: 10, marginBottom: 20 },
});
