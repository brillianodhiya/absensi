import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "expo-router";

const JadwalPelajaran = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [kelas, setKelas] = useState<string>("");
  const [hari, setHari] = useState<string>("");

  const getData = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");

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
        const data = response.data.data;

        // Set kelas dan hari hanya dari item pertama (asumsi semua item memiliki kelas dan hari yang sama)
        if (data.length > 0) {
          setKelas(data[0].kelas.nama_kelas);
          setHari(data[0].hariDetails.hari);
        }

        setData(data);
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
    <SafeAreaView style={styles.container}>
      <Header title="JADWAL" />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.body}>
          {/* Menampilkan Kelas dan Hari di luar mapping */}
          <View style={styles.headerInfo}>
            <Text style={styles.headerText}>Kelas: {kelas}</Text>
            <Text style={styles.headerText}>Hari: {hari}</Text>
          </View>

          {data.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.item}>
                <Text style={styles.infoText}>Jam ke</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.isiText}>
                  {item.jam}-{item.jam_selesai}
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.infoText}>Mapel</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.isiText}>{item.nama_pelajaran}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.infoText}>Materi</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.isiText}>{item.materi}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

export default JadwalPelajaran;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C8EDEE",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  body: {
    flex: 1,
  },
  headerInfo: {
    marginBottom: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  card: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  item: {
    flexDirection: "row",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    width: 80,
    marginTop: 20,
  },
  separator: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 5,
    color: "black",
    marginTop: 20,
  },
  isiText: {
    fontSize: 22,
    color: "black",
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
