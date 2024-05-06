# App.js 2024: "Accelerating Development and Distribution Workflows with Expo" starter project
Starting code and solutions for the workshop.

## Prerequisites
- A local development environment ready for native iOS and Android React Native / Expo development, capable of running the `npx expo run:ios` and `npx expo run:android`, including recent versions of:
  - Xcode (version 15+)
  - Watchman
  - Cocoapods
  - JDK 17
  - Android Studio
  - iOS simulator
  - Android emulator
  - [Fastlane](https://docs.fastlane.tools/getting-started/ios/setup/) - a small part of the workshop will use [EAS local builds](https://docs.expo.dev/build-reference/local-builds/), though it if you cannot get this working, it will not prevent you from doing the rest of the workshop.
  - If you're not sure if you have all of these or if you have the right versions, check the [Expo Local App Development requirements](https://docs.expo.dev/guides/local-app-development/) for details on how to install these tools in order to enable local native development with the Expo CLI.
- Other general development tools:
  - Node 18.
  - Visual Studio Code
  - Git (Github Desktop works great)
- Hardware:
  - A Mac is highly recommended for the full experience (though all exercises have an Android-only track, so it's possible to do most of the exercises without a Mac).
- Online accounts:
  - An Expo account (go to https://expo.dev to sign up)
  - A Github account

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

**Want to run on a device?** We will be focusing on emulator/simulator usage during the workshop, as it's especially easier for iOS. If you want to do some or all of the workshop on a device, you can also test with `npx expo run:ios --device` and/or `npx expo run:android --device`. Some later sections of the workshop may not work on an iOS device without additional configuration.

## About the demo app
The app is a concept for a guide for an art museum, where you can virtually tour the available exhibits and "favorite" the exhibits you would like to see in person.

The works of art themselves are pulled from the [Cleveland Museum of Art Open Access API](https://openaccess-api.clevelandart.org/), retrieved using TanStack query. You could use the API directly, but for reliability's sake, it's pulling the data from local files, though the images themselves are still pulled from the museum's CDN.

The demo is based off the Expo Router tabs starter (`npx create-expo-app --template tabs`), and also includes Nativewind v4 for most of the styling.

## Talk to the presenters
- [Keith](https://twitter.com/llamaluvr)
- [Tomek](https://twitter.com/tchayen)

