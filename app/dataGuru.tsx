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
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";

const DataSiswa = () => {
  const [userData, setUserData] = useState({
    role: "", // Menambahkan role untuk melacak peran pengguna
    nisn: "",
    nip: "",
    nama: "",
    kelas: "",
    mapel: "", //tambahan mapel
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
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
        const data = response.data.data;
        setUserData({
          role: data.role, // Mendapatkan role dari response
          nisn: data.nisn,
          nama: data.nama,
          kelas: data.kelas,
          nip: data.nip,
          mapel: data.mapel, //tambahan mapel
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
        setLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.Container}>
      <Header title="DATA GURU" />
      <View style={styles.body}>
        {/* Tampilkan NISN jika role adalah "siswa", dan NIP jika role adalah "guru" */}
        {userData.role === "siswa" ? (
          <View style={styles.row}>
            <Text style={styles.infoText}>NISN</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>
              {loading ? "Loading..." : userData.nisn || "-"}
            </Text>
          </View>
        ) : userData.role === "guru" ? (
          <View style={styles.row}>
            <Text style={styles.infoText}>NIP</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>
              {loading ? "Loading..." : userData.nip || "-"}
            </Text>
          </View>
        ) : null}
        <View style={styles.row}>
          <Text style={styles.infoText}>Nama</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>
            {loading ? "Loading..." : userData.nama}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Mapel</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>
            {loading ? "Loading..." : userData.mapel}
          </Text>
          {/* //mengubah dr kelas mjd  mapel */}
        </View>
      </View>
      <TouchableOpacity
        style={styles.presenceButton}
        onPress={() => router.push("/(admin)/dashboard")}
      >
        <Text style={styles.presenceButtonText}>Kembali</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DataSiswa;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#C8EDEE",
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
    width: 100,
    color: "black",
  },
  separator: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
    color: "black",
  },
  isiText: {
    fontSize: 18,
    flex: 1,
    color: "black",
  },
  presenceButton: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    backgroundColor: "#FFB22C",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "25%",
    marginHorizontal: "auto",
  },
  presenceButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});