import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchVideosByCategory = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        maxResults: 5, // Teraz pobierze 30 wyników zamiast 5
        q: query,
        type: 'video',
        key: API_KEY,
      },
    });

    return response.data.items.map((item: any) => ({
      id: item.id.videoId,
      videoTitle: item.snippet.title,
      channel: item.snippet.channelTitle,
      description: item.snippet.description,
      date: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails.high.url,
      views: 0, // Domyślnie 0, dociągniemy to w detalu
      likes: 0,
    }));
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

// NOWA FUNKCJA: Pobieranie statystyk konkretnego filmu
export const fetchVideoDetails = async (videoId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'statistics',
        id: videoId,
        key: API_KEY,
      },
    });

    if (response.data.items.length > 0) {
      const stats = response.data.items[0].statistics;
      return {
        views: stats.viewCount || "0",
        likes: stats.likeCount || "0",
      };
    }
    return { views: "0", likes: "0" };
  } catch (error) {
    console.error("Error fetching video stats:", error);
    return { views: "0", likes: "0" };
  }
};