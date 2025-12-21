Patryk D.
Hi. I hope u enjoy my project. Instruction to launch program is below:

1. Packages instalation: npm install

2. Environment Variables: Create a .env file in the root directory to store your configuration (this project uses react-native-dotenv) and add into .env file:

EXPO_PUBLIC_YOUTUBE_API_KEY=Your-API-Youtube-V3-Key

3. Running app: Since this project uses native modules (Video, Notifications, AsyncStorage), it will not work in the standard Expo Go app. You must build your own Development Client. Use instruction in CMD Commander:

npx expo run:android
