import {
  FlexWidget,
  TextWidget,
  ImageWidget,
} from "react-native-android-widget";

interface HelloAppWidgetProps {
  widgetInfo: {
    width: number;
    height: number;
  };
  imageBase64: string | undefined;
}

export function HelloAppWidget({
  widgetInfo,
  imageBase64,
}: HelloAppWidgetProps) {
  return (
    <FlexWidget
      clickAction="OPEN_APP"
      style={{
        height: "match_parent",
        width: "match_parent",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 16,
      }}
    >
      {imageBase64 ? (
        <ImageWidget
          image={imageBase64 as `data:image${string}`}
          imageWidth={widgetInfo.width}
          imageHeight={widgetInfo.height}
        />
      ) : (
        <TextWidget
          text="Share your first image"
          style={{
            fontSize: 32,
            fontFamily: "Inter",
            color: "#000000",
          }}
        />
      )}
    </FlexWidget>
  );
}