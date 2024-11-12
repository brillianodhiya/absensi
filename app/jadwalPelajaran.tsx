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
        console.log(data);
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
          {data.map((item, index) => (
            <View key={index} style={styles.row}>
              <View style={styles.row}>
                <Text style={styles.infoText}>Kelas</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.isiText}>{item.kelas}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.infoText}>Hari</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.isiText}>{item.hari}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.infoText}>Jam ke</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.isiText}>{item.jam}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.infoText}>Mapel</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.isiText}>{item.nama_pelajaran}</Text>
              </View>
              <View style={styles.row}>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 20,
    fontWeight: "bold",
    width: 100,
    color: "black",
  },
  separator: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 5,
    color: "black",
  },
  isiText: {
    fontSize: 20,
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
