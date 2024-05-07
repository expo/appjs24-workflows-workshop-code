import * as RNFS from "@dr.pogodin/react-native-fs";
import { Platform } from "react-native";
import { requestWidgetUpdate } from "react-native-android-widget";
import { HelloAppWidget } from "@/widgets/android/HelloAppWidget";
import IosWidgetRefresh from "@/modules/ios-widget-refresh";

async function getLatestShareFilePath() {
  if (Platform.OS === "ios") {
    return await RNFS.pathForGroup("group.appjs24-workflows-workshop-code") + "/latest_share.jpg";
  }
  return `${RNFS.DocumentDirectoryPath}/latest_share.jpg`;
}

export async function saveLatestShare(fileUri: string) {
  // copy to shared location
  const latestShareFilePath = await getLatestShareFilePath();
  if (await RNFS.exists(latestShareFilePath)) {
    await RNFS.unlink(latestShareFilePath);
  }
  await RNFS.copyFile(fileUri, latestShareFilePath);
}

export async function readLatestShareAsBase64() {
  const latestShareFilePath = await getLatestShareFilePath();
  const imageBase64 = await RNFS.readFile(latestShareFilePath, "base64");

  return "data:image/jpg;base64," + imageBase64;
}

export async function updateWidget() {
  if (Platform.OS === "ios") {
    IosWidgetRefresh.reloadWidget();
  }
  const latestShareBase64 = await readLatestShareAsBase64();
  requestWidgetUpdate({
    widgetName: "HelloAppWidget",
    renderWidget: (props) => (
      <HelloAppWidget imageBase64={latestShareBase64} widgetInfo={props} />
    ),
    widgetNotFound: () => {
      // Called if no widget is present on the home screen
    },
  });
}