import { View, Text, useWindowDimensions } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { useWorkByIdQuery } from "@/data/hooks/useWorkByIdQuery";
import { LoadingShade } from "@/components/LoadingShade";

// TODO:
// 1. Open cropper to make a square from the image: https://github.com/ivpusic/react-native-image-crop-picker?tab=readme-ov-file#crop-picture
// 2. Apply museum advertising watermark (e.g., a hashtag or a URL or something) with react-native-image-marker
// 3. Open share sheet to share the image with another app
// 4. Do something with this view to indicate that sharing is done (maybe swap displayed image for the modified one with "you shared it!" message)

export default function ShareWork() {
  const dimensions = useWindowDimensions();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  // query art API for the work
  const workQuery = useWorkByIdQuery(id);
  const work = workQuery.data;

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
            source={{ uri: work && work.images.web.url }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            transition={500}
          />
          <View className="absolute bottom-4 right-4">
            <Text className="text-xl text-white">#cma</Text>
          </View>
        </View>
      </View>
      <LoadingShade isLoading={workQuery.isLoading} />
    </View>
  );
}

function stripTags(htmlish: string) {
  return htmlish.replace(/<[^>]*>?/gm, "");
}
