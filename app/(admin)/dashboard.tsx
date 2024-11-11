import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Header from "@/components/Header";
const dashboardUser = () => {
  const [userData, setUserData] = useState({
    nama: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [IsModalOpen, setIsModalOpen] = useState(false);

  const getData = async () => {
    try {
      console.log("Get data");
      const token = await AsyncStorage.getItem("token");

      console.log(token);
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
  const Logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );
  return (
    <SafeAreaView style={styles.Container}>
      <Header title="DASHBOARD" />
      <View style={styles.body}>
        <Text style={styles.welcomeText}>Selamat Datang,</Text>
        <Text style={styles.username}>{userData.nama}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/kelas")}
        >
          <Text style={styles.buttonText}>🏫 Data Kelas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/dataSiswa2")}
        >
          <Text style={styles.buttonText}>🧑‍🎓 Data Siswa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/jadwalPelajaran")}
        >
          <Text style={styles.buttonText}>📅 Jadwal Pelajaran</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/presensiMasuk")}
        >
          <Text style={styles.buttonText}>📝 Presensi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/adminpresensi")}
        >
          <Text style={styles.buttonText}>👨‍💼 Admin Presensi</Text>
        </TouchableOpacity>

        {/* Tombol Rekap Masuk */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/rekapmasuk")}
        >
          <Text style={styles.buttonText}>📝 Rekap Masuk</Text>
        </TouchableOpacity>

        {/* Tombol Rekap Pulang */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/rekappulang")}
        >
          <Text style={styles.buttonText}>🏠 Rekap Pulang</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={Logout}>
          <Text style={styles.buttonText}> Loguot</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default dashboardUser;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#C8EDEE", // Warna latar belakang seluruh layar
  },
  
  body: {
    marginTop: 10,
    marginLeft: 50,
  },
  username: {
    gap: 8,
    marginBottom: 8,
    fontSize: 25,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 18,
    color: "#000",
  },
  button: {
    backgroundColor: "#fbb03b", // Warna kuning pada tombol
    width: "85%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
});
