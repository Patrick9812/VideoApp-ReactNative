import axios from 'axios';
import { YOUTUBE_API_KEY } from '@env';

console.log('Mój klucz API:', YOUTUBE_API_KEY);

export const youtubeClient = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: YOUTUBE_API_KEY,
  },
});