import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserProfile = {
  nama: string;
  nisn: string;
  kelas: string;
};

const DataKelas = () => {
  const [userData, setUserData] = useState<UserProfile[]>([]);
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
            const profiles: UserProfile[] = response.data.data.map(
              (data: any) => ({
                nama: data.nama,
                nisn: data.nisn,
                kelas: data.kelas ? data.kelas.nama_kelas : "N/A",
              })
            );
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
    <SafeAreaView style={styles.container}>
      <Header title="DATA SISWA" />
      <View style={styles.containerList}>
        <View style={styles.headerRow}>
          <Text style={styles.textHeader}>NISN</Text>
          <Text style={styles.textHeader}>Nama</Text>
          <Text style={styles.textHeader}>Kelas</Text>
        </View>
        {userData.map((user, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listText}>{user.nisn}</Text>
            <Text style={styles.listText}>{user.nama}</Text>
            <Text style={styles.listText}>{user.kelas}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default DataKelas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C8EDEE",
  },
  containerList: {
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  textHeader: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  listText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    flex: 1,
  },
});
