import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRole } from "../../hooks/useRole";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const role = useRole();
  console.log(role);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      {/* <Tabs.Screen
        name="index"
        options={{
          href: null,
          tabBarStyle: {
            display: "none",
          },
        }}
      /> */}

      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard" + role,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="dataSiswa2"
        options={{
          title: "User",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "accessibility" : "accessibility-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="catatan"
        options={{
          title: "Catatan",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "pencil" : "pencil-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
