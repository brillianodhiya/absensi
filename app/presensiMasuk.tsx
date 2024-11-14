import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";

const PresensiMasuk = () => {
  const [userData, setUserData] = useState({
    nama: "",
    kelas: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusButtonPressed, setIsStatusButtonPressed] = useState(null);
  const [is_leave, setIs_leave] = useState<0 | 1 | 2 | 3 | null>(null);

  const getData = async () => {
    try {
      console.log("Get data");
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setError("Token not found. Please login.");
        setLoading(false);
        return;
      }
      axios
        .get("https://px973nrz-3000.asse.devtunnels.ms/users/show_profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData({
            nama: response.data.data.nama,
            kelas: response.data.data.kelas,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data.");
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const masuk = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setError("Token not found. Please login.");
        setLoading(false);
        return;
      }

      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        setLoading(false);
        return;
      }

      // Get the current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Send location data along with leave status
      const leaveStatus = is_leave !== null ? is_leave : 0;
      axios
        .post(
          "https://d09jsw8q-3000.asse.devtunnels.ms/attendance/clockin",
          {
            is_leave: leaveStatus,
            latitude,
            longitude,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Note added successfully:");
          setLoading(false);
          router.push("/(tabs)/home");
        })
        .catch((error) => {
          console.error("Error adding note:", error);
          setError("Failed to add note.");
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const handleStatusButtonPress = (status: any) => {
    setIsStatusButtonPressed(status);
    setIs_leave(
      status === "H" ? 1 : status === "I" ? 2 : status === "S" ? 3 : 0
    );
  };

  return (
    <SafeAreaView style={styles.Container}>
      <Header title="PRESENSI" />

      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>Masuk</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <View style={styles.body}>
            <Text style={styles.infoText}>Nama</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>{userData.nama}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.infoText}>Kelas</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>{userData.kelas}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            isStatusButtonPressed === "H" && styles.statusButtonActive,
          ]}
          onPress={() => handleStatusButtonPress("H")}
        >
          <Text style={styles.statusButtonText}>H</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusButton,
            isStatusButtonPressed === "I" && styles.statusButtonActive,
          ]}
          onPress={() => handleStatusButtonPress("I")}
        >
          <Text style={styles.statusButtonText}>I</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusButton,
            isStatusButtonPressed === "S" && styles.statusButtonActive,
          ]}
          onPress={() => handleStatusButtonPress("S")}
        >
          <Text style={styles.statusButtonText}>S</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => masuk()}>
        <Text style={styles.presenceButtonText}>Continue</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default PresensiMasuk;

// Rest of the style definitions...

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#C8EDEE",
  },
  header: {
    flexDirection: "row",
    marginTop: 15,
  },
  textHeader: {
    fontSize: 28,
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
    marginRight: 80,
    marginLeft: 20,
  },
  welcome: {
    marginTop: 25,
    marginLeft: 25,
  },
  welcomeText: {
    gap: 8,
    marginBottom: 8,
    fontSize: 36,
    fontWeight: "bold",
  },
  infoContainer: {
    marginHorizontal: 25,
    marginBottom: 30,
  },
  row: {
    marginTop: 20,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 20,
    fontWeight: "bold",
    width: 80,
    color: "black",
  },
  separator: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginRight: 5,
  },
  isiText: {
    fontSize: 20,
    color: "black",
  },
  statusContainer: {
    marginTop: 30,
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
  },
  backButton: {
    marginTop: 15,
    alignItems: "center",
    backgroundColor: "#FFB22C",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "30%",
    marginHorizontal: "auto",
  },
  statusButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  statusButtonActive: {
    backgroundColor: "green", // Warna tombol berubah menjadi hijau saat diklik
  },
  statusButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  presenceButton: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    backgroundColor: "#40E9AE",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "85%",
    alignSelf: "center",
  },
  presenceButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});
