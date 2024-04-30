import { View, Text, useWindowDimensions } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { useWorkByIdQuery } from "@/data/hooks/useWorkByIdQuery";
import { LoadingShade } from "@/components/LoadingShade";

export default function ShareWork() {
  const dimensions = useWindowDimensions();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: work, isLoading } = useWorkByIdQuery(id);

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
        </View>
      </View>
      <LoadingShade isLoading={isLoading} />
    </View>
  );
}
