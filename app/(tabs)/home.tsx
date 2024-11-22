import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Header from "@/components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Home = () => {
  const [presensiMasukActive, setPresensiMasukActive] = useState(false); // Status tombol
  const [userData, setUserData] = useState({ nama: "" }); // Data pengguna
  const [error, setError] = useState(""); // Status error
  const [loading, setLoading] = useState(true); // Status loading

  // Fungsi untuk memeriksa status `allow_clokin` dari API
  const checkPresensiStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "Token tidak ditemukan. Silakan login.");
        return;
      }

      const response = await axios.get(
        "https://d09jsw8q-3000.asse.devtunnels.ms/attendance/check-status",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const allowClokin = response.data?.allowClockin; // Periksa nilai allow_clokin
      setPresensiMasukActive(allowClokin); // Set status tombol berdasarkan allow_clokin
    } catch (error) {
      console.error("Error checking presensi status:", error);
      Alert.alert("Error", "Gagal memeriksa status presensi.");
    }
  };

  // Fungsi untuk mendapatkan data pengguna
  const getData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setError("Token not found. Please login.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "https://px973nrz-3000.asse.devtunnels.ms/users/show_profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.data) {
        setUserData({
          nama: response.data.data.nama,
        });
      } else {
        throw new Error("Data pengguna tidak valid.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data.");
      setLoading(false);
    }
  };

  // Fungsi logout
  const Logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      router.push("/"); // Redirect ke halaman login
    } catch (error) {
      console.error("Error saat menghapus token:", error);
      Alert.alert("Error", "Gagal logout.");
    }
  };

  // Menggunakan `useFocusEffect` untuk memuat data setiap kali layar difokuskan
  useFocusEffect(
    React.useCallback(() => {
      getData();
      checkPresensiStatus(); // Periksa status presensi
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="DASHBOARD" />
      <View style={styles.body}>
        <Text style={styles.welcomeText}>Selamat Datang,</Text>
        <Text style={styles.username}>{userData.nama}</Text>
      </View>
      <View style={styles.buttonBody}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/dataSiswa")}
        >
          <Text style={styles.buttonText}>Data Siswa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/jadwalPelajaran")}
        >
          <Text style={styles.buttonText}>Jadwal Pelajaran</Text>
        </TouchableOpacity>

        {/* Tombol Presensi Masuk hanya aktif jika `allow_clokin` = true */}
        <TouchableOpacity
          style={[styles.button, !presensiMasukActive && { opacity: 0.5 }]} // Nonaktifkan tampilan jika belum aktif
          onPress={() => router.push("/presensiMasuk")}
          disabled={!presensiMasukActive} // Menonaktifkan tombol jika presensiMasukActive belum aktif
        >
          <Text style={styles.buttonText}>Presensi Masuk</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={Logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C8EDEE",
  },
  body: {
    marginLeft: wp("5%"),
    marginTop: hp("3%"),
  },
  username: {
    marginTop: hp("1%"),
    fontSize: hp("4%"),
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: hp("2.5%"),
    color: "#000",
  },
  buttonBody: {
    marginTop: hp("5%"),
    alignItems: "center",
    justifyContent: "center",
    width: wp("100%"),
  },
  button: {
    backgroundColor: "#fbb03b",
    width: wp("85%"),
    paddingVertical: hp("2%"),
    borderRadius: wp("2%"),
    alignItems: "center",
    marginVertical: hp("2%"),
  },
  buttonText: {
    fontSize: hp("2.2%"),
    color: "#fff",
  },
});
