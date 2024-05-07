import {
  View,
  Text,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Stack, useLocalSearchParams, Link } from "expo-router";
import { Image } from "expo-image";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useWorkByIdQuery } from "@/data/hooks/useWorkByIdQuery";
import { useFavStatusQuery } from "@/data/hooks/useFavStatusQuery";
import { useFavStatusMutation } from "@/data/hooks/useFavStatusMutation";
import colors from "@/constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LoadingShade } from "@/components/LoadingShade";

export default function DisplayWork() {
  const dimensions = useWindowDimensions();

  const insets = useSafeAreaInsets();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  // query art API for the work
  const workQuery = useWorkByIdQuery(id!);
  const work = workQuery.data;

  // read fav status
  const favQuery = useFavStatusQuery(id!);
  const isFav = favQuery.data;

  // update fav status
  const favMutation = useFavStatusMutation();

  return (
    <View className="flex-1 bg-shade-1">
      <Stack.Screen
        options={{
          title: work?.title || "Loading...",
        }}
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        contentContainerClassName="bg-shade-1"
      >
        <View className="py-4 px-4 bg-shade-2">
          <Image
            style={{
              height: dimensions.width,
            }}
            source={{ uri: work && work.images.web.url }}
            contentFit="contain"
            transition={500}
          />
        </View>
        <View>
          <View className="flex-row align-middle">
            <Text className="flex-1 font-semibold text-3xl px-4 py-2 bg-shade-2">
              {work?.title}
            </Text>
            <View className="justify-center px-4 flex-row items-center gap-3">
              <Pressable
                className="active:opacity-50"
                disabled={favQuery.isLoading || favMutation.isPending}
                onPress={() => {
                  favMutation.mutate({ id: id!, status: !isFav });
                }}
              >
                <Icon
                  name={isFav ? "star" : "star-o"}
                  color={colors.tint}
                  size={28}
                />
              </Pressable>
              <Link push href={`/works/${id}/share`}>
                <Icon name="share-alt" color={colors.tint} size={28} />
              </Link>
            </View>
          </View>
          <View className="px-4 gap-y-2 py-2">
            {work?.creators.length ? (
              <Text className="text-l">{work.creators[0].description}</Text>
            ) : null}
            <Text className="text-l">{work?.date_text}</Text>
            <Text className="text-l">{work?.technique}</Text>
          </View>
          {work?.description && (
            <>
              <Text className="text-xl font-semibold px-4 py-2 bg-shade-2">
                Description
              </Text>
              <View className="px-4 gap-y-2 py-2">
                <Text className="text-l">{stripTags(work.description)}</Text>
              </View>
            </>
          )}
          {work?.did_you_know && (
            <>
              <Text className="text-xl font-semibold px-4 py-2 bg-shade-2">
                Did you know?
              </Text>
              <View className="px-4 gap-y-2 py-2">
                <Text className="text-l">{work.did_you_know}</Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <LoadingShade isLoading={workQuery.isLoading || favQuery.isLoading} />
    </View>
  );
}

function stripTags(htmlish: string) {
  return htmlish.replace(/<[^>]*>?/gm, "");
}
