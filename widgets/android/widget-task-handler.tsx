import type { WidgetTaskHandlerProps } from "react-native-android-widget";
import { HelloAppWidget } from "@/widgets/android/HelloAppWidget";
import { readLatestShareAsBase64 } from "@/widgets/common/widget-share";

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const imageBase64 = await readLatestShareAsBase64();

  switch (props.widgetAction) {
    case "WIDGET_ADDED":
    case "WIDGET_UPDATE":
    case "WIDGET_RESIZED":
      props.renderWidget(
        <HelloAppWidget
          widgetInfo={props.widgetInfo}
          imageBase64={imageBase64}
        />
      );
      break;
    default:
      break;
  }
}
