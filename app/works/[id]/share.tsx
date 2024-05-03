import { useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  Platform,
  Button,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { useWorkByIdQuery } from "@/data/hooks/useWorkByIdQuery";
import { LoadingShade } from "@/components/LoadingShade";
import * as Sharing from "expo-sharing";
import ImagePicker from "react-native-image-crop-picker";
import Marker, {
  ImageFormat,
  Position,
  TextBackgroundType,
} from "react-native-image-marker";

export default function ShareWork() {
  const dimensions = useWindowDimensions();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: work, isLoading } = useWorkByIdQuery(id);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  async function share() {
    if (!croppedImage) {
      return;
    }

    await Sharing.shareAsync(croppedImage);
  }

  async function crop() {
    const image = await ImagePicker.openCropper({
      path: work.images.web.url,
      width: 300,
      height: 300,
      mediaType: "photo",
    });

    const markedImage = await Marker.markText({
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

    setCroppedImage(markedImage);
  }

  return (
    <View className="flex-1 bg-shade-1">
      <Stack.Screen
        options={{
          title: "Share",
        }}
      />
      <View className="py-4 px-4 bg-shade-2">
        <Text className="text-2xl text-center py-4">
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
              uri: croppedImage
                ? croppedImage.path
                : work && work.images.web.url,
            }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            transition={500}
          />
        </View>
      </View>
      <LoadingShade isLoading={isLoading} />
      <Button onPress={crop} title="Crop" />
      <Button onPress={share} title="Share" />
    </View>
  );
}
