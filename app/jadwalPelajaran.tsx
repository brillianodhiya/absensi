import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "expo-router";

const JadwalPelajaran = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [jadwal, setJadwal] = useState({
    nama_pelajaran: "",
    jam: "",
    materi: "",
    kelas: "",
  });
  const getJadwal = async () => {
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
        .get(
          "https://px973nrz-3000.asse.devtunnels.ms/jadwal_kelas/show_jadwal",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setJadwal({
            nama_pelajaran: response.data.data.nama_pelajaran,
            jam: response.data.data.jam,
            materi: response.data.data.materi,
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
  useFocusEffect(
    React.useCallback(() => {
      getJadwal();
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <Header title="JADWAL" />

      {/* Data Jadwal */}
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.infoText}>Kelas</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>{jadwal.kelas}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Hari</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>Senin</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Tanggal</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>28 Oktober 2024</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Jam ke</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>{jadwal.jam}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Mapel</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>{jadwal.nama_pelajaran}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Materi</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>{jadwal.materi}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Jam ke</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>5-10</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Mapel</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>Dasar-Dasar Keahlian</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Materi</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>Pemrograman Web</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default JadwalPelajaran;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C8EDEE", // Warna latar belakang
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  body: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 20,
    fontWeight: "bold",
    width: 100, // Lebar tetap untuk alignment yang lebih rapi
    color: "black",
  },
  separator: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 5, // Jarak antara infoText dan isiText
    color: "black",
  },
  isiText: {
    fontSize: 20,
    flex: 1, // Mengisi sisa ruang pada baris
    color: "black",
  },
});
