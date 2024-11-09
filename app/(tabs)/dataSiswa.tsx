import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DataSiswa = () => {
  const [userData, setUserData] = useState({
    nisn: "",
    nama: "",
    username: "",
    password: "",
    kelas_id: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const getData = async () => {
    const token = AsyncStorage.getItem("token");

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
          nisn: response.data.data.nisn,
          nama: response.data.data.nama,
          kelas_id: response.data.data.kelas_id,
          username: response.data.data.username,
          password: response.data.data.password,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo_smk-removebg-preview.png")}
          style={styles.logo}
        />
        <Text style={styles.textHeader}>DATA PESERTA DIDIK</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.infoText}>NISN</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>{userData.nisn || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Nama</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>{userData.nama}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Kelas</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>{userData.kelas_id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Username</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>{userData.username}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Password</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>{userData.password}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.presenceButton}
        onPress={() => router.push("/presensiMasuk")}
      >
        <Ionicons name="create-outline" size={20} color="white" />
        <Text style={styles.presenceButtonText}>PRESENSI</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DataSiswa;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#C8EDEE", // Warna latar belakang seluruh layar
  },
  header: {
    flexDirection: "row",
    marginTop: 35,
  },
  textHeader: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
    marginRight: 35,
    marginLeft: 20,
  },
  body: {
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginLeft: 20,
  },
  infoText: {
    fontSize: 18,
    fontWeight: "bold",
    width: 100, // Lebar tetap untuk alignment yang lebih rapi
    color: "black",
  },
  separator: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5, // Jarak antara infoText dan isiText
    color: "black",
  },
  isiText: {
    fontSize: 18,
    flex: 1, // Mengisi sisa ruang pada baris
    color: "black",
  },
  presenceButton: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    backgroundColor: "#FFB22C",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "85%",
    marginHorizontal: "auto",
  },
  presenceButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});
