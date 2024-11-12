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
      <Tabs.Screen
        name="home"
        options={{
          title: "Home" + role,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="kelas"
        options={{
          href: role == "siswa" ? null : undefined,
          title: "Kelas",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home-sharp" : "home-sharp"}
              color={color}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="dataSiswa"
        options={{
          title: "User",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="catatan"
        options={{
          href: role != "siswa" ? null : undefined,
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
