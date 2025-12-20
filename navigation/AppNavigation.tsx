import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/mainScreen";
import SearchScreen from "../screens/searchScreen";
import VideoDetailsScreen from "../screens/VideoDetailsScreen";
import HomeIcon from "../assets/taskAssets/icons/home-icon.svg";
import SearchIcon from "../assets/taskAssets/icons/search-icon.svg";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#2b2d42",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
        tabBarIcon: ({ focused }) => {
          const iconColor = focused ? "#FFFFFF" : "#2b2d42";
          if (route.name === "Home") {
            return <HomeIcon width={24} height={24} color={iconColor} />;
          } else {
            return <SearchIcon width={24} height={24} color={iconColor} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="VideoDetails" component={VideoDetailsScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 72,
    backgroundColor: "#8d99ae",
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    marginBottom: 5,
  },
  tabItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
  },
});
