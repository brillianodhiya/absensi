import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "@/components/Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AdminPresensi = () => {
  const [userData, setUserData] = useState({
    nama: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [attendanceStatus, setAttendanceStatus] = useState({
    allowClockin: false,
    allowClockout: false,
  });

  const getData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setError("Token tidak ditemukan. Silakan login.");
        setLoading(false);
        return;
      }

      // Ambil data profil user
      const userResponse = await axios.get(
        "https://d09jsw8q-3000.asse.devtunnels.ms/users/show_profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData({
        nama: userResponse.data.data.nama,
        role: userResponse.data.data.role,
      });

      // Ambil status absensi untuk kelas
      const statusResponse = await axios.get(
        "https://d09jsw8q-3000.asse.devtunnels.ms/attendance/check-status", // Endpoint untuk cek status absensi
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAttendanceStatus({
        allowClockin: statusResponse.data.allowClockin,
        allowClockout: statusResponse.data.allowClockout,
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Gagal mengambil data.");
      setLoading(false);
    }
  };
  const activateCheckIn = async () => {
    try {
      console.log("triggered");
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setError("Token tidak ditemukan. Silakan login.");
        return;
      }

      const response = await axios.post(
        "https://d09jsw8q-3000.asse.devtunnels.ms/flag_alowed/clokin_open",
        {
          allow_clockin: true, // Body request
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.status);
      if (response.status === 201) {
        Alert.alert("Presensi masuk telah dibuka");
        getData(); // Refresh data setelah perubahan
      } else {
        Alert.alert("Error", "Gagal mengaktifkan presensi masuk.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Gagal mengaktifkan presensi masuk:", error.message);
        Alert.alert("Error", error.message);
      } else {
        console.error("Error yang tidak dikenal:", error);
        Alert.alert("Error", "Terjadi kesalahan yang tidak diketahui.");
      }
    }
  };

  const activateCheckOut = async () => {
    try {
      // console.log("triggered");
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setError("Token tidak ditemukan. Silakan login.");
        return;
      }

      const response = await axios.post(
        "https://d09jsw8q-3000.asse.devtunnels.ms/flag_alowed/update_close",
        {
          allowClockout: true, // Body request
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        Alert.alert("Presensi pulang telah dibuka");
        getData(); // Refresh data setelah perubahan
      } else {
        Alert.alert("Error", "Gagal mengaktifkan presensi pulang.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Gagal mengaktifkan presensi pulang:", error.message);
        Alert.alert("Error", error.message);
      } else {
        console.error("Error yang tidak dikenal:", error);
        Alert.alert("Error", "Terjadi kesalahan yang tidak diketahui.");
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="ADMIN PRESENSI" />
      <View style={styles.listTextContainer}>
        <Text style={styles.listText}>Nama : {userData.nama}</Text>
        <Text style={styles.listText}>Status : {userData.role}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          attendanceStatus.allowClockin && { backgroundColor: "#ccc" },
        ]}
        onPress={activateCheckIn}
        disabled={attendanceStatus.allowClockin} // Nonaktifkan jika clockin sudah aktif
      >
        <Text style={styles.buttonText}>🏠 Aktifkan Absen Masuk</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={activateCheckOut}
        disabled={attendanceStatus.allowClockout} // Nonaktifkan jika clockout sudah diizinkan
      >
        <Text style={styles.buttonText}>🏠 Aktifkan Absen Pulang</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AdminPresensi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C8EDEE",
  },
  listTextContainer: {
    paddingHorizontal: wp("5%"),
    marginBottom: hp("2%"),
  },
  listText: {
    fontSize: hp("2.2%"),
    color: "black",
    marginBottom: hp("1%"),
  },
  button: {
    backgroundColor: "#fbb03b",
    width: wp("80%"),
    height: hp("8%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("4%"),
    alignSelf: "center",
    marginVertical: hp("1.5%"),
  },
  buttonText: {
    fontSize: hp("2.5%"),
    color: "#fff",
  },
});
