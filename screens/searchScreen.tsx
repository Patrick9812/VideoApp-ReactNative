import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { CATEGORIES, Video } from '../API-data/mockData';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchInput } from '../components/SearchBar'; 
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function SearchScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const tabBarHeight = useBottomTabBarHeight();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const q = route.params?.initialQuery;
    if (q) {
      setSearchQuery(q);
    }
  }, [route.params?.initialQuery]);

  useFocusEffect(
    useCallback(() => {
      const q = route.params?.initialQuery;
      
      if (!q) {
        setSearchQuery('');
      }
      return () => {
        navigation.setParams({ initialQuery: undefined });
      };
    }, [route.params?.initialQuery])
  );

  const getFilteredVideos = () => {
    const searchTerm = searchQuery.toLowerCase().trim();
    let results: Video[] = [];

    CATEGORIES.forEach(category => {
      category.data.forEach(video => {
        const matchesSearch = 
          searchTerm === '' || 
          video.videoTitle.toLowerCase().includes(searchTerm) || 
          video.channel.toLowerCase().includes(searchTerm) ||
          category.title.toLowerCase().includes(searchTerm);

        if (matchesSearch) {
          results.push(video);
        }
      });
    });

    return Array.from(new Set(results.map(v => v.id)))
      .map(id => results.find(v => v.id === id)!);
  };

  const filteredVideos = getFilteredVideos();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === 'ios' ? tabBarHeight : 0}
      >
        <View style={styles.container}>
          <SearchInput 
            value={searchQuery} 
            onChangeText={setSearchQuery} 
            style={{ marginTop: 20 }} 
          />

          <View style={styles.infoRow}>
            <Text style={styles.resultsCount}>
              {searchQuery.length > 0 ? (
                <Text>
                  {filteredVideos.length} wyników dla: <Text style={styles.boldText}>"{searchQuery}"</Text>
                </Text>
              ) : (
                <Text>Wszystkie filmy</Text>
              )}
            </Text>
          </View>

          <FlatList
            data={filteredVideos}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.videoCard} 
                onPress={() => navigation.navigate('VideoDetails', { video: item })}
              >
                <View style={styles.thumbnailPlaceholder}>
                  <Text style={styles.placeholderText}>Miniaturka</Text>
                </View>

                <View style={styles.cardInfo}>
                  <Text style={styles.channelText}>{item.channel}</Text>
                  <Text style={styles.titleText} numberOfLines={2}>
                    {item.videoTitle}
                  </Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  flex: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 25 },
  infoRow: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15, 
    marginBottom: 20 
  },
  resultsCount: { 
    fontFamily: 'Poppins-Regular', 
    fontSize: 10, 
    color: '#2B2D42', 
    opacity: 0.7 
  },
  boldText: { fontFamily: 'Poppins-Bold' },
  videoCard: { marginBottom: 25 },
  thumbnailPlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    backgroundColor: '#E1E4E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: { color: '#8D99AE', fontFamily: 'Poppins-Regular', fontSize: 12 },
  cardInfo: { marginTop: 8 },
  channelText: { fontFamily: 'Poppins-Bold', fontSize: 13, color: '#2B2D42' },
  titleText: { 
    fontFamily: 'Poppins-Regular', 
    fontSize: 13, 
    color: '#2B2D42', 
    lineHeight: 18 
  },
  dateText: { 
    fontFamily: 'Poppins-Regular', 
    fontSize: 10, 
    color: '#2B2D42', 
    textAlign: 'right', 
    opacity: 0.5 
  },
  listContent: { paddingBottom: 20 },
});