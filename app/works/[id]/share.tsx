import { useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Platform,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { useWorkByIdQuery } from "@/data/hooks/useWorkByIdQuery";
import { LoadingShade } from "@/components/LoadingShade";
import * as Sharing from "expo-sharing";
import ImagePicker from "react-native-image-crop-picker";
import Marker, {
  Position,
  TextBackgroundType,
  ImageFormat,
} from "react-native-image-marker";

export default function ShareWork() {
  const dimensions = useWindowDimensions();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: work, isLoading } = useWorkByIdQuery(id!);
  const [editedImagePath, setEditedImagePath] = useState<string | undefined>(
    undefined,
  );

  async function share() {
    await Sharing.shareAsync(editedImagePath!);
  }

  async function crop() {
    const image = await ImagePicker.openCropper({
      path: work.images.web.url,
      width: 300,
      height: 300,
      mediaType: "photo",
    });
    const markedImagePath = await Marker.markText({
      backgroundImage: {
        src: image.path,
        scale: 1,
      },
      watermarkTexts: [
        {
          text: "#cma",
          position: {
            position: Position.bottomRight,
          },
          style: {
            color: "#fff",
            fontSize: 20,
            textBackgroundStyle: {
              type: TextBackgroundType.none,
              color: "#000",
              paddingX: 16,
              paddingY: 6,
            },
          },
        },
      ],
      quality: 100,
      filename: image.filename,
      saveFormat: ImageFormat.jpg,
    });

    setEditedImagePath(normalizeFilePath(markedImagePath));
  }

  return (
    <View className="flex-1 bg-shade-1">
      <Stack.Screen
        options={{
          title: "Share",
        }}
      />
      <View className="py-4 px-4 bg-shade-2 gap-3">
        <Text className="text-2xl text-center">
          Share a clip of this work with your friends.
        </Text>
        <View
          style={{
            height: dimensions.width - 50,
            width: dimensions.width - 50,
            alignSelf: "center",
          }}
        >
          <Image
            source={{
              uri: editedImagePath
                ? editedImagePath
                : work && work.images.web.url,
            }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            transition={500}
          />
        </View>
        <RoundButton onPress={crop} title="Crop" />
        <RoundButton
          title="Share"
          onPress={share}
          disabled={!editedImagePath}
        />
      </View>
      <LoadingShade isLoading={isLoading} />
    </View>
  );
}

function RoundButton({
  title,
  onPress,
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`py-2 rounded-md active:opacity-50 ${
        disabled ? "bg-gray-500" : "bg-tint"
      }`}
    >
      <Text className="text-xl text-center text-white">{title}</Text>
    </Pressable>
  );
}

function normalizeFilePath(path: string) {
  if (Platform.OS === "android" && !path.startsWith("file://")) {
    return `file://${path}`;
  }
  return path;
}
