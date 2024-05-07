import * as RNFS from "@dr.pogodin/react-native-fs";
import { requestWidgetUpdate } from "react-native-android-widget";
import { HelloAppWidget } from "@/widgets/android/HelloAppWidget";

function getLatestShareFilePath() {
  return `${RNFS.DocumentDirectoryPath}/latest_share.jpg`;
}

export async function saveLatestShare(fileUri: string) {
  // copy to shared location
  const latestShareFilePath = getLatestShareFilePath();
  await RNFS.copyFile(fileUri, latestShareFilePath);
}

export async function readLatestShareAsBase64() {
  const latestShareFilePath = getLatestShareFilePath();
  const imageBase64 = await RNFS.readFile(latestShareFilePath, "base64");

  return "data:image/jpg;base64," + imageBase64;
}

export async function updateWidget() {
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