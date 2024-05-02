# App.js 2024: "Accelerating Development and Distribution Workflows with Expo" starter project
Starting code and solutions for the workshop.

## Prerequisites
- A local development environment ready for native iOS and Android React Native / Expo development.
  - In general, the [Expo Local App Development requirements](https://docs.expo.dev/guides/local-app-development/) are a good guide to get you to the point where you can run `npx expo run:ios` and `npx expo run:android`.
  - More specific recommendations:
    - Xcode (recommended: 15.3 or newer)
    - iPhone simulator (recommended: iPhone 15 Pro, iOS 17.4)
    - Android Studio (recommended: Hedgedog 2023.1.1 or newer)
    - Android NDK 25.1.8937393 (can be installed via Android SDK Manager > SDK Tools)
    - virtual device with API 34 (recommended: Pixel 6 API 34)
- Node 18.
- Visual Studio Code
- Git (Github Desktop works great)
- Mac is highly recommended for the full experience (though all exercises have an Android-only track, so it's possible to do most of the exercises without a Mac).

## Test your setup before the workshop
Do these steps to ensure you'll be able to complete the workshop exercises.
1. Fork and clone this repo.

2. Restore dependencies with
```
npm install
```

3. Build and run the app on your iOS simulator:
```
npx expo run:ios
```

4. Build and run the app on your Android emulator:
```
npx expo run:android
```

If these steps don't work, refer to the [Expo Local Development guide](https://docs.expo.dev/guides/local-app-development/).

If you get a mysterious CSS/Tailwind error, refer to [this workaround](https://github.com/marklawlor/nativewind/issues/838#issuecomment-1980957103) and it shouldn't bother you again.

## About the demo app
The app is a concept for a guide for an art museum, where you can virtually tour the available exhibits and "favorite" the exhibits you would like to see in person.

The works of art themselves are pulled from the [Cleveland Museum of Art Open Access API](https://openaccess-api.clevelandart.org/), retrieved using TanStack query. You could use the API directly, but for reliability's sake, it's pulling the data from local files, though the images themselves are still pulled from the museum's CDN.

The demo is based off the Expo Router tabs starter (`npx create-expo-app --template tabs`), and also includes Nativewind v4 for most of the styling.

## Talk to the presenters
- [Keith](https://twitter.com/llamaluvr)
- [Tomek](https://twitter.com/tchayen)

