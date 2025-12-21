import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { SVGIcons } from "../components/SVGIcons";
import Video, { VideoRef } from "react-native-video";
import { useRoute, useNavigation } from "@react-navigation/native";
import { fetchVideoDetails } from "../api/fetchDataApi";
import colors from "../theme/colors";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const VideoDetailsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { video } = route.params;
  const [activeTab, setActiveTab] = useState("Details");
  const [stats, setStats] = useState({ views: "0", likes: "0" });
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<VideoRef>(null);
  const background = "https://www.w3schools.com/html/mov_bbb.mp4";

  useEffect(() => {
    fetchVideoDetails(video.id).then(setStats);
  }, [video.id]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isVisible && isPlaying) {
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [isVisible, isPlaying]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const toggleControls = () => {
    setIsVisible(!isVisible);
  };

  const handleBackPress = () => {
    if (isFullscreen) {
      setIsFullscreen(false);
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      <StatusBar hidden={true} translucent />
      <View style={styles.container}>
        <View
          style={[
            isFullscreen ? styles.fullscreenWrapper : styles.videoWrapper,
            !isFullscreen && { aspectRatio: 16 / 9 },
          ]}
        >
          <Video
            source={{ uri: background }}
            ref={videoRef}
            paused={!isPlaying}
            muted={isMuted}
            resizeMode="contain"
            onProgress={(data) => setCurrentTime(data.currentTime)}
            onLoad={(data) => setDuration(data.duration)}
            style={StyleSheet.absoluteFill}
          />

          <TouchableWithoutFeedback onPress={toggleControls}>
            <View style={StyleSheet.absoluteFill} />
          </TouchableWithoutFeedback>

          {isVisible && (
            <View style={styles.uiOverlay} pointerEvents="box-none">
              <View style={styles.topRow}>
                <TouchableOpacity
                  style={styles.roundBtn}
                  onPress={handleBackPress}
                >
                  <SVGIcons.Back width={24} height={24} color={colors.white} />
                </TouchableOpacity>

                <View style={styles.topRight}>
                  <TouchableOpacity
                    style={styles.roundBtn}
                    onPress={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? (
                      <SVGIcons.Volume
                        width={20}
                        height={20}
                        color={colors.white}
                      />
                    ) : (
                      <SVGIcons.Volume
                        width={20}
                        height={20}
                        color={colors.white}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.roundBtn}>
                    <SVGIcons.Airplay
                      width={20}
                      height={20}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.midControls} pointerEvents="box-none">
                <TouchableOpacity
                  style={styles.sideBtn}
                  onPress={() => videoRef.current?.seek(currentTime - 10)}
                >
                  <SVGIcons.Backward
                    width={25}
                    height={25}
                    color={colors.white}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.playBtn}
                  onPress={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <SVGIcons.Pause
                      width={25}
                      height={25}
                      color={colors.white}
                    />
                  ) : (
                    <SVGIcons.Play
                      width={25}
                      height={25}
                      color={colors.white}
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.sideBtn}
                  onPress={() => videoRef.current?.seek(currentTime + 10)}
                >
                  <SVGIcons.Forward
                    width={25}
                    height={25}
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.bottomControls}>
                <View style={styles.timeInfo}>
                  <Text style={styles.whiteTime}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsFullscreen(!isFullscreen)}
                  >
                    {isFullscreen ? (
                      <SVGIcons.Fullscreen
                        width={22}
                        height={22}
                        color={colors.white}
                      />
                    ) : (
                      <SVGIcons.Fullscreen
                        width={22}
                        height={22}
                        color={colors.white}
                      />
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.progressLineBg}>
                  <View
                    style={[
                      styles.progressLineFill,
                      { width: `${progressPercent}%` },
                    ]}
                  />
                  <View
                    style={[
                      styles.progressKnob,
                      { left: `${progressPercent}%` },
                    ]}
                  />
                </View>
              </View>
            </View>
          )}
        </View>

        {!isFullscreen && (
          <ScrollView style={styles.scrollArea}>
            <View style={styles.contentPadding}>
              <Text style={styles.mainTitle}>{video.videoTitle}</Text>

              <View style={styles.authorRow}>
                <View style={styles.authorAvatar}>
                  <SVGIcons.Person
                    width={17}
                    height={17}
                    color={colors.white}
                  />
                </View>
                <Text style={styles.authorName}>{video.channel}</Text>
              </View>

              <View style={styles.tabContainer}>
                <TouchableOpacity
                  onPress={() => setActiveTab("Details")}
                  style={[
                    styles.tab,
                    activeTab === "Details" && styles.tabActive,
                  ]}
                >
                  <Text style={styles.tabLabel}>Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setActiveTab("Notes")}
                  style={[
                    styles.tab,
                    activeTab === "Notes" && styles.tabActive,
                  ]}
                >
                  <Text style={styles.tabLabel}>Notes</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.tabContent}>
                {activeTab === "Details" ? (
                  <View>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>
                      {video.description || ""}
                    </Text>
                    <View style={styles.statsContainer}>
                      <View style={styles.statPill}>
                        <SVGIcons.Views
                          style={styles.pillIconLeft}
                          width={18}
                          height={18}
                          color={colors.white}
                        />
                        <Text style={styles.pillText}>{stats.views} views</Text>
                      </View>
                      <View style={styles.statPill}>
                        <SVGIcons.Likes
                          style={styles.pillIconLeft}
                          width={18}
                          height={18}
                          color={colors.white}
                        />
                        <Text style={styles.pillText}>{stats.likes} likes</Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <Text style={styles.descriptionText}>No notes yet.</Text>
                )}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },

  videoWrapper: {
    width: "100%",
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  fullscreenWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: colors.black,
    zIndex: 100,
  },
  uiOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 15,
    paddingBottom: 20,
    paddingTop: 4,
    justifyContent: "space-between",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  topRight: { flexDirection: "row", gap: 10 },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  midControls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  playBtn: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  sideBtn: {
    width: 40,
    height: 40,
    borderRadius: 22.5,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomControls: { marginBottom: 0 },
  timeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  whiteTime: { color: colors.white, fontWeight: "bold", fontSize: 13 },
  progressLineBg: {
    width: "100%",
    height: 5,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 3,
  },
  progressLineFill: {
    height: "100%",
    backgroundColor: colors.progressBar,
    borderRadius: 3,
    zIndex: 50,
  },
  progressKnob: {
    position: "absolute",
    top: -3,
    width: 10,
    height: 10,
    borderRadius: 7,
    backgroundColor: colors.progressBar,
    marginLeft: -7,
  },

  scrollArea: { flex: 1 },
  contentPadding: { paddingBottom: 40 },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 15,
    color: "#1A1A1A",
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  authorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.deepDarkBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  authorName: {
    marginLeft: 12,
    fontWeight: "bold",
    fontSize: 18,
    color: colors.deepDarkBlue,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  },
  tab: { flex: 1, alignItems: "center", paddingVertical: 12 },
  tabActive: { borderBottomWidth: 3, borderBottomColor: colors.deepDarkBlue },
  tabLabel: { fontWeight: "bold", color: colors.deepDarkBlue },
  tabContent: { padding: 15 },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.deepDarkBlue,
  },
  descriptionText: { color: "#666", lineHeight: 20 },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  statPill: {
    backgroundColor: colors.deepDarkBlue,
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
    width: "44%",
    justifyContent: "center",
    alignItems: "center",
  },
  pillIconLeft: { marginRight: 8, position: "absolute", left: 12 },
  pillText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 10,
    marginLeft: "7%",
  },
});

export default VideoDetailsScreen;
