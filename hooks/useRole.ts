import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useRole = () => {
  const [role, setrole] = useState<any>(null);

  useEffect(() => {
    const getrole = async () => {
      try {
        const storedrole = await AsyncStorage.getItem("role");
        setrole(storedrole);
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    getrole();
  }, []);

  return role;
};
