import { View, Text, FlatList, Pressable } from "react-native";
import { Stack, Link, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { useWorksForDepartmentQuery } from "@/data/hooks/useWorksForDepartmentQuery";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LoadingShade } from '@/components/LoadingShade';

export default function TabOneScreen() {
  const { department } = useLocalSearchParams<{ department: string }>();

  const query = useWorksForDepartmentQuery(department!);

  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: department,
        }}
      />
      <FlatList
        contentContainerClassName="bg-shade-0"
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        data={query.data}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <Link asChild href={`/works/${item.id}/`}>
            <Pressable>
              <View className="flex-row bg-shade-1">
                <View className="flex-1 justify-start">
                  <Text className="text-2xl font-semibold bg-shade-2 pl-4 py-2">
                    {item.title}
                  </Text>
                  <View className="my-2 mx-2">
                    <Text className="italic pl-4">{item.date_text}</Text>
                    {item.creators.length ? (
                      <Text className="italic pl-4">
                        {item.creators[0].description}
                      </Text>
                    ) : null}
                  </View>
                </View>
                <View className="py-2 px-4 bg-shade-2 justify-center">
                  <Image
                    className="h-28 w-28"
                    source={{ uri: item.images.web.url }}
                    contentFit="contain"
                    transition={500}
                  />
                </View>
              </View>
            </Pressable>
          </Link>
        )}
        ItemSeparatorComponent={() => <View className="h-1 bg-shade-0" />}
      />
      <LoadingShade isLoading={query.isLoading} />
    </View>
  );
}
