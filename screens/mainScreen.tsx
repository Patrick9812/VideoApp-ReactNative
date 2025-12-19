import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchInput } from '../components/SearchBar'; 
import { CategorySection } from '../components/CategorySection';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { CATEGORIES } from '../API-data/mockData';

export default function MainScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<any>();

  const filteredData = CATEGORIES.filter((category) => {
    const searchTerm = searchQuery.toLowerCase();
    const categoryMatches = category.title.toLowerCase().includes(searchTerm);
    const videoMatches = category.data.some((video) => 
      video.videoTitle.toLowerCase().includes(searchTerm)
    );
    return categoryMatches || videoMatches;
  });

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            const searchTerm = searchQuery.toLowerCase();
            const filteredVideos = item.title.toLowerCase().includes(searchTerm)
              ? item.data
              : item.data.filter(video => video.videoTitle.toLowerCase().includes(searchTerm));

            const isActuallyLast = index === filteredData.length - 1;

            return (
              <CategorySection 
                title={item.title} 
                data={filteredVideos} 
                isLast={isActuallyLast}
                onShowMore={() => {
                  navigation.navigate('Search', { initialQuery: item.title });
                }}
                onVideoPress={(video) => {
                  navigation.navigate('VideoDetails', { video });
                }}
              />
            );
          }}
          ListHeaderComponent={
            <View style={styles.headerWrapper}>
              <SearchInput 
                value={searchQuery}
                onChangeText={setSearchQuery}
                showSettings={true}
                onSettingsPress={() => console.log('Settings Pressed')}
              />
              
              <View style={styles.infoContainer}>
                {searchQuery.length > 0 && (
                  <Text style={styles.resultsCount}>
                    <Text>
                      {filteredData.length} categories found for: <Text style={styles.boldText}>"{searchQuery}"</Text>
                    </Text>
                  </Text>
                )}
              </View>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  headerWrapper: {
    paddingHorizontal: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  infoContainer: {
    marginTop: 15,
    minHeight: 20, 
  },
  resultsCount: { 
    fontFamily: 'Poppins-Regular', 
    fontSize: 10, 
    color: '#2B2D42', 
    opacity: 0.7 
  },
  boldText: { 
    fontFamily: 'Poppins-Bold' 
  },
  listContent: { 
    paddingBottom: 40 
  }
});