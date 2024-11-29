import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Header from "@/components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const dashboardUser = () => {
  const [userData, setUserData] = useState({
    nama: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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

        .get("https://t6c2snf7-3000.asse.devtunnels.ms/users/show_profile", {
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
          onPress={() => router.push("/(admin)/dataGuru")}
        >
          <Text style={styles.buttonText}> Data Guru</Text>
        </TouchableOpacity>
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
          onPress={() => router.push("/adminpresensi")}
        >
          <Text style={styles.buttonText}>👨‍💼 Admin Presensi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/rekapabsen")}
        >
          <Text style={styles.buttonText}>🏠 Rekap Absen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={Logout}>
          <Text style={styles.buttonText}>Logout</Text>
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
    marginTop: hp("2%"), // Use heightPercentageToDP for spacing
    marginLeft: wp("10%"), // Use widthPercentageToDP for responsive left margin
    marginRight: wp("10%"), // Use widthPercentageToDP for responsive right margin
  },
  welcomeText: {
    fontSize: hp("2.5%"), // Adjust font size based on screen height
    color: "#000",
  },
  username: {
    gap: 8,
    marginBottom: hp("1%"), // Use heightPercentageToDP for vertical spacing
    fontSize: hp("3%"), // Adjust font size for username
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#fbb03b", // Warna kuning pada tombol
    width: wp("85%"), // Responsive width using wp
    paddingVertical: hp("2%"), // Padding based on screen height
    borderRadius: wp("3%"), // Border radius adjusted based on width
    alignItems: "center",
    marginVertical: hp("1.5%"), // Margin for vertical spacing between buttons
  },
  buttonText: {
    fontSize: hp("2%"), // Responsive font size for button text
    color: "#fff",
  },
});
