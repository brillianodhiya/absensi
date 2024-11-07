import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="kelas"
        options={{
          title: "Kelas",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home-sharp" : "home-sharp"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dataSiswa"
        options={{
          title: "Data Siswa",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "accessibility" : "accessibility"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="jadwal"
        options={{
          title: "Jadwal",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "today-outline" : "today-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
