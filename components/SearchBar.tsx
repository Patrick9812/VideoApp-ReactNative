import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { SVGIcons } from "./SVGIcons";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  showSettings?: boolean;
  onSettingsPress?: () => void;
}

export const SearchInput = ({
  value,
  onChangeText,
  placeholder,
  style,
  showSettings,
  onSettingsPress,
}: SearchInputProps) => {
  return (
    <View style={[styles.mainWrapper, style]}>
      <View style={styles.searchBarContainer}>
        <SVGIcons.Search
          width={20}
          height={20}
          color="#2B2D42"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || "Search..."}
          placeholderTextColor="#2B2D42"
        />
      </View>

      {showSettings && (
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={onSettingsPress}
          activeOpacity={1}
        >
          <SVGIcons.Settings width={24} height={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#2B2D42",
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#2B2D42",
    paddingVertical: 0,
  },
  settingsBtn: {
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
