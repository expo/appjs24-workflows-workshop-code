import * as RNFS from "@dr.pogodin/react-native-fs";

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

async function updateWidget() {
  // TODO
}