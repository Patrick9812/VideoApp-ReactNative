import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { SVGIcons } from "../components/SVGIcons";
import colors from "../theme/colors";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const prepareSettings = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Allow notifications to use reminders."
        );
      }
      try {
        const savedEnabled = await AsyncStorage.getItem("remindersEnabled");
        const savedTime = await AsyncStorage.getItem("reminderTime");
        if (savedEnabled !== null) setIsEnabled(JSON.parse(savedEnabled));
        if (savedTime !== null) setReminderTime(new Date(savedTime));
      } catch (e) {
        console.error("Failed to load settings", e);
      }
    };
    prepareSettings();
  }, []);

  const scheduleNotification = async (date: Date, active: boolean) => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    if (active) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "It's learning time!",
          body: "Your daily programming session starts now.",
          sound: true,
        },
        trigger: {
          type: SchedulableTriggerInputTypes.DAILY,
          hour: date.getHours(),
          minute: date.getMinutes(),
        },
      });
    }
  };

  const toggleSwitch = async (value: boolean) => {
    setIsEnabled(value);
    await AsyncStorage.setItem("remindersEnabled", JSON.stringify(value));
    await scheduleNotification(reminderTime, value);
  };

  const onTimeChange = async (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setReminderTime(selectedDate);
      await AsyncStorage.setItem("reminderTime", selectedDate.toISOString());
      if (isEnabled) await scheduleNotification(selectedDate, true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <SVGIcons.Back width={28} height={28} color={colors.darkBlue} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarCircle}>
          <SVGIcons.Person width={25} height={25} color={colors.white} />
        </View>
        <Text style={styles.userName}>John Doe</Text>
      </View>

      <View style={styles.divider} />
      <View style={styles.reminderContainer}>
        <View style={styles.reminderHeader}>
          <SVGIcons.Notifications
            width={32}
            height={32}
            color={colors.darkBlue}
          />
          <Text style={styles.reminderTitle}>Learning reminders</Text>
        </View>

        <View style={styles.singleLineRow}>
          <View style={styles.leftContent}>
            <Text style={styles.repeatText}>Repeat everyday at:</Text>
            <TouchableOpacity
              style={styles.timeRow}
              onPress={() => setShowPicker(true)}
            >
              <SVGIcons.Clock width={24} height={24} color={colors.darkBlue} />
              <Text style={styles.timeValueText}>
                {reminderTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.switchWrapper,
              { backgroundColor: isEnabled ? colors.darkBlue : "#767577" },
            ]}
          >
            <Switch
              trackColor={{ false: "transparent", true: "transparent" }}
              thumbColor={colors.white}
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={
                Platform.OS === "android"
                  ? { transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }
                  : {}
              }
            />
          </View>
        </View>

        <Text style={styles.infoText}>
          You will receive friendly reminder to remember to study
        </Text>
      </View>

      {showPicker && (
        <DateTimePicker
          value={reminderTime}
          mode="time"
          is24Hour={true}
          display={"default"}
          onChange={onTimeChange}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.darkBlue,
    marginLeft: 15,
  },
  profileSection: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
    gap: 15,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.darkBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.darkBlue,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginBottom: 25,
  },
  reminderContainer: {
    paddingHorizontal: 30,
  },
  reminderHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.darkBlue,
  },
  singleLineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    flexWrap: "wrap",
    gap: 10,
  },
  repeatText: {
    fontSize: 14,
    color: colors.darkBlue,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timeValueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.darkBlue,
  },
  switchWrapper: {
    borderRadius: 30,
    paddingHorizontal: 2,
    paddingVertical: 2,
    minWidth: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    fontSize: 13,
    color: "#666",
    marginTop: 15,
    lineHeight: 20,
  },
});
