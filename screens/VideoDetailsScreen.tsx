import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VideoDetailsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { video } = route.params;

  const [activeTab, setActiveTab] = useState<"Details" | "Notes">("Details");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.playerPlaceholder}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>

        <View style={styles.controlsRow}>
          <Ionicons name="play-back-outline" size={32} color="white" />
          <Ionicons
            name="play-circle"
            size={80}
            color="white"
            style={{ marginHorizontal: 30 }}
          />
          <Ionicons name="play-forward-outline" size={32} color="white" />
        </View>

        <View style={styles.topControls}>
          <Ionicons
            name="volume-medium-outline"
            size={24}
            color="white"
            style={{ marginRight: 15 }}
          />
          <Ionicons name="scan-outline" size={24} color="white" />
        </View>
      </View>

      <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.paddedContent}>
            <Text style={styles.videoTitle} numberOfLines={2}>
              {video.videoTitle}
            </Text>
            <View style={styles.channelRow}>
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={20} color="white" />
              </View>
              <Text style={styles.channelName}>{video.channelTitle}</Text>
            </View>
          </View>

          <View style={styles.tabRow}>
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setActiveTab("Details")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Details" && styles.activeTabText,
                ]}
              >
                Details
              </Text>
              {activeTab === "Details" && (
                <View style={styles.activeIndicator} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setActiveTab("Notes")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Notes" && styles.activeTabText,
                ]}
              >
                Notes
              </Text>
              {activeTab === "Notes" && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          </View>

          <View style={styles.paddedContent}>
            {activeTab === "Details" ? (
              <View style={styles.detailsSection}>
                <Text style={styles.sectionLabel}>Description</Text>
                <Text style={styles.descriptionText}>{video.description}</Text>

                <Text style={styles.sectionLabel}>Statistics</Text>
                <View style={styles.statsRow}>
                  <View style={styles.statBadge}>
                    <Ionicons name="tv-outline" size={20} color="white" />
                    <View style={styles.statTextGroup}>
                      <Text style={styles.statNumber}>{video.views}</Text>
                      <Text style={styles.statUnit}>views</Text>
                    </View>
                  </View>

                  <View style={styles.statBadge}>
                    <Ionicons
                      name="thumbs-up-outline"
                      size={20}
                      color="white"
                    />
                    <View style={styles.statTextGroup}>
                      <Text style={styles.statNumber}>{video.likes}</Text>
                      <Text style={styles.statUnit}>likes</Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.detailsSection}>
                <Text style={styles.sectionLabel}>Notes</Text>
                <Text style={styles.descriptionText}>No notes available.</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  safeArea: { flex: 1 },
  playerPlaceholder: {
    width: "100%",
    height: 250,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  topControls: {
    position: "absolute",
    top: 50,
    right: 20,
    flexDirection: "row",
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  paddedContent: {
    paddingHorizontal: 25,
  },
  videoTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#2B2D42",
    lineHeight: 26,
  },
  channelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  avatarCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#2B2D42",
    justifyContent: "center",
    alignItems: "center",
  },
  channelName: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#2B2D42",
    marginLeft: 15,
  },
  tabRow: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E4E8",
    marginBottom: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#2B2D42",
  },
  tabText: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#8D99AE",
  },
  activeTabText: { color: "#2B2D42" },

  detailsSection: {
    marginTop: 5,
  },
  sectionLabel: {
    fontFamily: "Poppins-Bold",
    fontSize: 13,
    color: "#2B2D42",
    marginBottom: 10,
  },
  descriptionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#2B2D42",
    lineHeight: 18,
    opacity: 0.7,
    marginBottom: 20,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  statBadge: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2B2D42",
    paddingVertical: 14,
    borderRadius: 10,
  },
  statTextGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  statNumber: {
    fontFamily: "Poppins-Bold",
    fontSize: 12,
    color: "#FFFFFF",
    marginRight: 4,
  },
  statUnit: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#FFFFFF",
  },
});
