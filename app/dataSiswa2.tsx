import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DataKelas = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setError("Token tidak ditemukan. Silakan login.");
        setLoading(false);
        return;
      }

      axios
        .get("https://px973nrz-3000.asse.devtunnels.ms/users/showAll_profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data && response.data.data) {
            const profiles = response.data.data.map((data: any) => ({
              nama: data.nama,
              nisn: data.nisn,
              kelas: data.kelas ? data.kelas.nama_kelas : "N/A",
            }));
            setUserData(profiles);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setError("Gagal mengambil data pengguna.");
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.Container}>
      <Header title="DATA SISWA" />
      <View style={styles.ContainerList}>
        <View style={styles.ListItem}>
          <Text style={styles.textHeader}>NISN </Text>
          <Text style={styles.textHeader}>Nama </Text>
          <Text style={styles.textHeader}>Kelas</Text>
        </View>
        {userData.map((user, index) => (
          <View key={index} style={styles.ListItem}>
            <Text style={styles.ListText}>{user.nisn}</Text>
            <Text style={styles.ListText}>{user.nama}</Text>
            <Text style={styles.ListText}>{user.kelas}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default DataKelas;

const styles = StyleSheet.create({
  ContainerList: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f8f8f8",
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
  },
  ListItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  ListText: {
    fontSize: 18,
    color: "blue",
    fontWeight: "normal",
    justifyContent: "center",
    marginBottom: 4,
  },
  Container: {
    flex: 1,
    backgroundColor: "#C8EDEE",
  },

  textHeader: {
    fontSize: 28,
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    marginTop: 10,
  },
  listContainer: {
    padding: 10,
  },
});
