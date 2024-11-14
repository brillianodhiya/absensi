import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "expo-router";

// Definisikan tipe data yang sesuai dengan struktur data yang diterima
interface Jadwal {
  kelas: string;
  jam: string;
  jam_selesai: string;
  nama_pelajaran: string;
  materi: string;
}

interface HariData {
  hari: string;
  jadwal: Jadwal[];
}

const JadwalPelajaran = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<HariData[]>([]); // Tipe data disesuaikan dengan HariData[]

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
        const data: HariData[] = response.data.data; // Tipe data disesuaikan
        console.log(data); // Debugging output
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
        <ScrollView style={styles.body}>
          {data.map((item, index) => (
            <View key={index} style={styles.daySection}>
              {/* Tampilkan Hari */}
              <Text style={styles.dayText}>{item.hari}</Text>

              {/* Tampilkan Semua Jadwal untuk Hari Tersebut */}
              {item.jadwal.map((jadwal, jadwalIndex) => (
                <View key={jadwalIndex} style={styles.jadwalItem}>
                  <View style={styles.row}>
                    <Text style={styles.infoText}>Kelas</Text>
                    <Text style={styles.separator}>:</Text>
                    <Text style={styles.isiText}>{jadwal.kelas}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.infoText}>Jam</Text>
                    <Text style={styles.separator}>:</Text>
                    <Text style={styles.isiText}>
                      {jadwal.jam} - {jadwal.jam_selesai}
                    </Text>
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
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
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
  daySection: {
    marginBottom: 20,
  },
  dayText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  jadwalItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    width: 100,
    color: "black",
  },
  separator: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 5,
    color: "black",
  },
  isiText: {
    fontSize: 16,
    flex: 1,
    color: "black",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
