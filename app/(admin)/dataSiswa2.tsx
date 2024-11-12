import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dataKelas = () => {
  const [userData, setUserData] = useState({
    nama: "",
    kelas: "",
    nisn: "",
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
            kelas: response.data.data.kelas,
            nisn: response.data.data.nisn,
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
        <View style={styles.ListItem}>
          <Text style={styles.ListText}>{userData.nisn}</Text>
          <Text style={styles.ListText}>{userData.nama}</Text>
          <Text style={styles.ListText}>{userData.kelas}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default dataKelas;

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
