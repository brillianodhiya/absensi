import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useToken = () => {
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        setToken(storedToken);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    getToken();
  }, []);

  return token;
};
