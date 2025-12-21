import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import colors from "../theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";

type LoginScreenProps = {
  onLogin: () => void;
};

const openURL = async (url: string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    console.error("Cannot open link: " + url);
  }
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/taskAssets/logo.png")}
            style={styles.mainIcon}
          />
        </View>

        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/taskAssets/app-icon.png")}
            style={styles.mainIcon}
          />
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.welcomeText}>
            Welcome to the best{"\n"}YouTube-based learning{"\n"}application.
          </Text>

          <TouchableOpacity onPress={onLogin} style={styles.button}>
            <Text style={styles.buttonText}>Log in as guest</Text>
          </TouchableOpacity>

          <Text style={styles.legalText}>
            By continuing you agree with{"\n"}
            <Text
              style={styles.link}
              onPress={() => openURL("https://www.google.pl")}
            >
              Terms and Conditions
            </Text>{" "}
            and{" "}
            <Text
              style={styles.link}
              onPress={() => openURL("https://www.google.pl")}
            >
              Privacy Policy
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackround,
    paddingHorizontal: 30,
    paddingTop: 90,
    paddingBottom: 40,
    justifyContent: "space-between",
  },

  headerContainer: {
    alignItems: "center",
    width: "100%",
  },

  logoYoutube: {
    fontFamily: "Poppins-Bold",
    fontSize: 48,
    color: colors.white,
    lineHeight: 50,
    textAlign: "center",
  },

  iconWrapper: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },

  welcomeText: {
    fontFamily: "Poppins-Bold",
    color: colors.white,
    fontSize: 22,
    lineHeight: 24,
    letterSpacing: 1,
    paddingBottom: 30,
    textAlign: "left",
  },

  footerContainer: {
    width: "100%",
  },

  button: {
    backgroundColor: colors.loginBtnColor,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    height: "auto",
  },

  buttonText: {
    color: colors.white,
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },

  legalText: {
    fontFamily: "Poppins-Regular",
    color: colors.white,
    fontSize: 12,
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 18,
  },

  link: {
    textDecorationLine: "underline",
    fontFamily: "Poppins-Bold",
    fontWeight: 400,
    color: colors.darkBlue,
  },

  mainIcon: {
    width: 292,
    height: 116,
    resizeMode: "contain",
  },
});
