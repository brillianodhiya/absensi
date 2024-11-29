import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location"; // Import expo-location
import Header from "@/components/Header";
import { getDistance } from "geolib";

const { width, height } = Dimensions.get("window");

const PresensiPulang = () => {
  const [userData, setUserData] = useState({
    nama: "",
    kelas: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isStatusButtonPressed, setIsStatusButtonPressed] = useState(null);
  const [is_leave, setIs_leave] = useState<0 | 1 | 2 | 3 | null>(null);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setError("Token not found. Please login.");
        setLoading(false);
        return;
      }
      axios
        .get("https://t6c2snf7-3000.asse.devtunnels.ms/users/show_profile", {
          headers: { Authorization: `Bearer ${token}` },
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

  const ALLOWED_LOCATION = {
    latitude: -8.0561, // Ganti dengan latitude lokasi yang Anda inginkan
    longitude: 111.7136, // Ganti dengan longitude lokasi yang Anda inginkan
  };

  const pulang = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setError("Token not found. Please login.");
        setLoading(false);
        return;
      }

      // Pastikan tombol "Hadir" dipilih
      if (is_leave !== 1) {
        console.log("Location validation skipped for non-Hadir status.");
        // Lanjutkan proses presensi tanpa validasi lokasi
        await submitAttendance(token, 0, null, null); // is_leave selain 1, tanpa koordinat
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

      // Validasi jarak ke lokasi yang diperbolehkan
      const distance = getDistance({ latitude, longitude }, ALLOWED_LOCATION);

      if (distance > 100) {
        Alert.alert(
          "Outside Allowed Zone",
          "You are not within 100 meters of the allowed location."
        );
        setLoading(false);
        return;
      }

      // Lanjutkan presensi jika dalam radius
      await submitAttendance(token, is_leave, latitude, longitude);
    } catch (error) {
      console.error("Error in attendance process:", error);
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  // Fungsi untuk mengirim data presensi
  const submitAttendance = async (
    token: string, // Token tipe string
    isLeave: 0 | 1 | 2 | 3, // Nilai isLeave hanya dapat berupa 0, 1, 2, atau 3
    latitude?: number | null, // Koordinat latitude opsional bertipe number
    longitude?: number | null // Koordinat longitude opsional bertipe number
  ) => {
    try {
      const payload: {
        is_leave: 0 | 1 | 2 | 3;
        latitude?: number | null;
        longitude?: number | null;
      } = {
        is_leave: isLeave,
        ...(latitude && longitude && { latitude, longitude }),
      };

      await axios.post(
        "https://t6c2snf7-3000.asse.devtunnels.ms/attendance/update_close",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Attendance submitted successfully.");
      setLoading(false);
      router.push("/(tabs)/home");
    } catch (error) {
      console.error("Error submitting attendance:", error);
      setError("Failed to submit attendance.");
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
        <Text style={styles.welcomeText}>Pulang</Text>
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

      <TouchableOpacity style={styles.backButton} onPress={() => pulang()}>
        <Text style={styles.presenceButtonText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.presenceButton}
        onPress={() => router.push("/(tabs)/catatan")}
      >
        <Ionicons name="create-outline" size={20} color="white" />
        <Text style={styles.presenceButtonText}>CATATAN PRESENSI</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PresensiPulang;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#C8EDEE",
  },
  welcome: {
    marginTop: 25,
    marginLeft: width * 0.06, // Dynamic margin for smaller screens
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: width * 0.06,
  },
  infoContainer: {
    marginHorizontal: width * 0.06,
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
    width: width * 0.25, // Adjust width proportionally
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
    width: width * 0.3, // Use percentage for responsive width
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
    width: width * 0.85, // Adjust for responsive width
    alignSelf: "center",
  },
  presenceButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});
