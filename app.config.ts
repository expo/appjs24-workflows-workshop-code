import "ts-node/register";
import { ExpoConfig } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";

module.exports = ({ config }: { config: ExpoConfig }) => {
  return {
    name: IS_DEV ? "Art Museum (dev)" : "Art Museum",
    slug: "appjs24-workflows-workshop-code",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.expo.appjs24-workflows-workshop-code" + (IS_DEV ? "-dev" : ""),
      entitlements: {
        "com.apple.security.application-groups": [
          "group.appjs24-workflows-workshop-code",
        ],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.expo.appjs24workflowsworkshopcode" + (IS_DEV ? "dev" : ""),
    },
    web: {
      bundler: "metro",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      ["expo-router"],
      "react-native-image-marker",
      ["./plugins/withWidget.ts"],
    ],
    experiments: {
      typedRoutes: true,
    },
    "runtimeVersion": {
      "policy": "appVersion"
    }
  };
};
