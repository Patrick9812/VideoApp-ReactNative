Patryk D.
Hi. I hope u enjoy my project. Instruction to launch program is below:

1. Packages installation: npm install

2. Environment Variables: Create a .env file in the root directory to store your configuration (this project uses react-native-dotenv) and add into .env file:

EXPO_PUBLIC_YOUTUBE_API_KEY=Your-API-Youtube-V3-Key

3. How to get a YouTube API Key: If you don't have an API key yet, follow these steps:
   -Go to the Google Cloud Console.
   -Create a new project (e.g., "My Video App").
   -Navigate to APIs & Services > Library.
   -Search for "YouTube Data API v3" and click Enable.
   -Go to APIs & Services > Credentials.
   -Click + CREATE CREDENTIALS and select API key.
   -Copy the generated key and paste it into your .env file.

4. Running app: Since this project uses native modules (Video, Notifications, AsyncStorage), it will not work in the standard Expo Go app. You must build your own Development Client. Use instruction in CMD Commander. Make sure your Android Emulator is running or a physical device is connected via USB with Debugging enabled:

npx expo run:android or npx expo run:android --device (if You want to choose device)
