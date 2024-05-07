import {
  ConfigPlugin,
  withAndroidManifest,
  AndroidConfig,
  withDangerousMod,
  withStringsXml,
} from "expo/config-plugins";
import { ExpoConfig } from "expo/config";
import fs from "fs";
import path from "path";

const withAndroidWidget: ConfigPlugin = (config) => {
  const widgetName = "HelloAppWidget";
  const widgetPath = "widgets/android";

  config = withWidgetFiles(config, widgetName, widgetPath);
  config = withWidgetDescription(config);

  return config;
};

const camelToSnakeCase = (str: string) =>
  str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1_").toLowerCase();

function withWidgetFiles(
  config: ExpoConfig,
  widgetName: string,
  widgetPath: string
) {
  return withDangerousMod(config, [
    "android",
    (dangerousConfig) => {
      const widgetFilesRoot = path.join(
        dangerousConfig.modRequest.projectRoot,
        widgetPath
      );

      const appPackageFolder = path.join(
        dangerousConfig.modRequest.platformProjectRoot,
        "app/src/main/java/" + config.android?.package?.split(".").join("/")
      );
      fs.copyFileSync(
        path.join(widgetFilesRoot, "HelloAppWidget.kt"),
        path.join(appPackageFolder, `${widgetName}.kt`)
      );

      const resFolder = path.join(
        dangerousConfig.modRequest.platformProjectRoot,
        "app/src/main/res"
      );

      fs.mkdirSync(path.join(resFolder, "xml"), { recursive: true });
      const widgetInfoFilename = `${camelToSnakeCase(widgetName)}_info.xml`;
      fs.copyFileSync(
        path.join(widgetFilesRoot, widgetInfoFilename),
        path.join(resFolder, "xml", widgetInfoFilename)
      );

      fs.mkdirSync(path.join(resFolder, "layout"), { recursive: true });
      const widgetLayoutFilename = `${camelToSnakeCase(widgetName)}.xml`;
      fs.copyFileSync(
        path.join(widgetFilesRoot, widgetLayoutFilename),
        path.join(resFolder, "layout", widgetLayoutFilename)
      );

      return dangerousConfig;
    },
  ]);
}

function withWidgetDescription(config: ExpoConfig) {
  return withStringsXml(config, (stringsXml) => {
    stringsXml.modResults = AndroidConfig.Strings.setStringItem(
      [
        {
          $: {
            name: `app_widget_description`,
            translatable: "false",
          },
          _: "a widget that says hello",
        },
      ],
      stringsXml.modResults
    );
    return stringsXml;
  });
}

export default withAndroidWidget;