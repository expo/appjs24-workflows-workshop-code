import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import customColors from "@/constants/colors";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name:
    | React.ComponentProps<typeof FontAwesome>["name"]
    | React.ComponentProps<typeof MaterialIcons>["name"];
  type?: "FontAwesome" | "MaterialIcons";
  color: string;
}) {
  const IconComponent =
    props.type === "MaterialIcons" ? MaterialIcons : FontAwesome;
  // @ts-ignore
  return <IconComponent size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        lazy: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Exhibits",
          tabBarActiveTintColor: customColors.tint,
          tabBarIcon: ({ color }) => (
            <TabBarIcon type="MaterialIcons" name="museum" color={color} />
          ),
          headerRight: () => (
            <Link href="/visit" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={customColors.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <TabBarIcon type="FontAwesome" name="star" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
