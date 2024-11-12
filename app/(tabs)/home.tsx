import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Header from "@/components/Header";
const Home = () => {
  const [userData, setUserData] = useState({
    nama: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [IsModalOpen, setIsModalOpen] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
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
      console.log();
      router.push("/");
    } catch (error) {
      console.error("Error saat menghapus token:", error);
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
      </View>
      <View style={styles.buttonBody}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/dataSiswa")}
        >
          <Text style={styles.buttonText}> Data Siswa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/jadwalPelajaran")}
        >
          <Text style={styles.buttonText}> Jadwal Pelajaran</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/presensiMasuk")}
        >
          <Text style={styles.buttonText}> Presensi Masuk</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={Logout}>
          <Text style={styles.buttonText}> Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Container: {
    marginTop: -33,
    flex: 1,
    backgroundColor: "#C8EDEE", // Warna latar belakang seluruh layar
  },

  body: {
    marginLeft: 25,
  },
  username: {
    gap: 8,
    marginBottom: 8,
    fontSize: 32,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 22,
    color: "#000",
  },
  buttonBody: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // Lebar penuh agar bisa memusatkan tombol
  },
  button: {
    backgroundColor: "#fbb03b", // Warna kuning pada tombol
    width: "85%",
    padding: 25,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
});
