import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import { useToken } from "./useToken";

export function useUserRole() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useToken();

  async function fetchRole() {
    try {
      setLoading(true);

      if (!token) {
        setLoading(false);
        return;
      }

      const getUserRole = await axios.get(
        "https://d09jsw8q-3000.asse.devtunnels.ms/users/show_profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const role = getUserRole.data ? getUserRole.data.data.role : null;
      // if (!getUserRole)
      setRole(role);
      setLoading(false);
      // const storedRole = await AsyncStorage.getItem("userRole");
      // setRole(storedRole); // Simpan role dari storage ke state
    } catch (error) {
      console.error("Gagal mengambil role:", error);
    } finally {
      setLoading(false); // Set loading ke false setelah data role diambil
    }
  }

  console.log(token, "Token");

  useEffect(() => {
    fetchRole();
  }, [token]);

  return { role, loading };
}
