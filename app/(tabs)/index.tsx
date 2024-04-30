import { View, Text, FlatList, Pressable } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { useDepartmentsQuery } from "@/data/hooks/useDepartmentsQuery";

export default function TabOneScreen() {
  const query = useDepartmentsQuery();

  return (
    <View className="flex-1">
      <FlatList<{ department: string; imageUrl: string }>
        data={query.data}
        contentContainerClassName="mb-safe"
        keyExtractor={(item) => item.department}
        renderItem={({ item }) => (
          <Link asChild href={`/departments/${item.department}/`}>
            <Pressable>
              <Image
                className="h-24 w-full"
                source={{
                  uri: item.imageUrl,
                }}
              />
              <Text className="absolute right-2 bottom-2 text-3xl text-white font-semibold text-right">
                {item.department}
              </Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}
