import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import { useFocusEffect } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dataKelas = () => {
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
      .get("https://px973nrz-3000.asse.devtunnels.ms/users/showAll_profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
    <SafeAreaView style={styles.Container}>
      {/* Header dengan logo dan judul */}

      <Header title="DATA SISWA" />
      <View style={styles.ContainerList}>
        <View style={styles.ListItem}>
          <Text style={styles.textHeader}>NISN </Text>
          <Text style={styles.textHeader}>Nama </Text>
          <Text style={styles.textHeader}>Password</Text>
        </View>
        <View style={styles.ListItem}>
          <Text style={styles.ListText}>10001</Text>
          <Text style={styles.ListText}>Ahmad Zainuri</Text>
          <Text style={styles.ListText}>XRPLA01</Text>
        </View>
        <View style={styles.ListItem}>
          <Text style={styles.ListText}>10002</Text>
          <Text style={styles.ListText}>Bimasakti</Text>
          <Text style={styles.ListText}>XRPLA02</Text>
        </View>
        <View style={styles.ListItem}>
          <Text style={styles.ListText}>10003</Text>
          <Text style={styles.ListText}>Cinta Laura</Text>
          <Text style={styles.ListText}>XRPLA03</Text>
        </View>
        <View style={styles.ListItem}>
          <Text style={styles.ListText}>10004</Text>
          <Text style={styles.ListText}>Diah Ayu</Text>
          <Text style={styles.ListText}>XRPLA04</Text>
        </View>
        <View style={styles.ListItem}>
          <Text style={styles.ListText}>10005</Text>
          <Text style={styles.ListText}>Egi Sunandar</Text>
          <Text style={styles.ListText}>XRPLA05</Text>
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
    // padding: 10,
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
    backgroundColor: "#C8EDEE", // Warna latar belakang seluruh layar
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
