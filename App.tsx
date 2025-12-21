import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as NavigationBar from "expo-navigation-bar";
import { Platform, AppState } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/loginScreen";
import AppNavigator from "./navigation/AppNavigation";
import colors from "./theme/colors";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Bold": Poppins_700Bold,
  });

  const configureAndroidNavigation = async () => {
    if (Platform.OS === "android") {
      try {
        await NavigationBar.setVisibilityAsync("hidden");
      } catch (e) {
        console.log("Navigation bar error:", e);
      }
    }
  };

  useEffect(() => {
    configureAndroidNavigation();
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        configureAndroidNavigation();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar
        style="dark"
        backgroundColor={colors.white}
        translucent={false}
        hidden={false}
      />

      {isLoggedIn ? (
        <AppNavigator />
      ) : (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      )}
    </NavigationContainer>
  );
}
