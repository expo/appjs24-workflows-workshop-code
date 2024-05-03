import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  ScrollView,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Application from "expo-application";
import * as Updates from "expo-updates";

export default function VisitScreen() {
  const insets = useSafeAreaInsets();

  const updateInfo = Updates.useUpdates();

  useEffect(() => {
    (async function runAsync() {
      const status = await Updates.checkForUpdateAsync();
      if (status.isAvailable) {
        await Updates.fetchUpdateAsync();
      }
    })();
  }, []);

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: "Visit CMA",
        }}
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        className="bg-shade-1"
      >
        <View className="row-y-2 px-4 py-2">
          <Text className="text-4xl font-semibold text-center">
            The Cleveland Museum of Art
          </Text>
          <Text className="text-xl text-center">11150 East Boulevard</Text>
          <Text className="text-xl text-center">Cleveland, Ohio, USA</Text>
          <Text className="text-xl text-center">1-888-CMA-0033</Text>
        </View>
        <Text className="text-xl px-4 py-2 font-semibold bg-shade-2">
          Admission
        </Text>
        <Text className="text-xl px-4 py-2">
          General admission is always free
        </Text>
        <Text className="text-xl px-4 py-2 font-semibold bg-shade-2">
          Hours
        </Text>
        <View className="row-y-2 px-4 py-2">
          <DailyHours day="Sunday" hours="10:00 a.m.–5:00 p.m." />
          <DailyHours day="Monday" hours="Closed" />
          <DailyHours day="Tuesday" hours="10:00 a.m.–5:00 p.m." />
          <DailyHours day="Wednesday" hours="10:00 a.m.–9:00 p.m." />
          <DailyHours day="Thursday" hours="10:00 a.m.–5:00 p.m." />
          <DailyHours day="Friday" hours="10:00 a.m.–9:00 p.m." />
          <DailyHours day="Saturday" hours="10:00 a.m.–5:00 p.m." />
        </View>
        <View className="px-4 py-2">
          <Image
            className="h-96 w-full"
            source={require("@/assets/images/map.png")}
            contentFit="contain"
          />
        </View>
        <View className="row-y-2 items-center my-10 mx-10">
          <Text className="text-l font-bold">Version</Text>
          <Text className="text-l">
            {Application.nativeApplicationVersion}-
            {Application.nativeBuildVersion}
          </Text>
          <Text className="text-l">{Updates.updateId || "n/a"}</Text>
          {updateInfo.isChecking || updateInfo.isDownloading ? (
            <ActivityIndicator size="small" />
          ) : null}
          {updateInfo.isUpdateAvailable && updateInfo.isUpdatePending ? (
            <Pressable
              onPress={() => {
                Updates.reloadAsync();
              }}
            >
              <Text className="text-xl my-2 text-tint">Update your app</Text>
            </Pressable>
          ) : null}
          {updateInfo.downloadError ? (
            <>
              <Text className="text-l my-2 text-center">
                There's an update available for your app, but the download
                failed.
              </Text>
              <Text className="text-l my-2 text-center">
                {updateInfo.downloadError?.message}
              </Text>
            </>
          ) : null}
        </View>
      </ScrollView>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

function DailyHours({ day, hours }: { day: string; hours: string }) {
  return (
    <View className="flex-row justify-between">
      <Text className="text-xl flex-1">{day}</Text>
      <Text className="text-xl">{hours}</Text>
    </View>
  );
}
