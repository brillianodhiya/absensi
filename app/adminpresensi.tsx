import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

const adminpresensi = () => {
  const [userData, setUserData] = useState({
    nama: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
            role: response.data.data.role,
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
  const activateCheckIn = async () => {
    await AsyncStorage.setItem("presensiMasukActive", "true");
    Alert.alert("Presensi masuk telah dibuka");
  };
  const activateCheckOut = async () => {
    await AsyncStorage.setItem("presensiPulangActive", "true");
    Alert.alert("Presensi pulang telah dibuka");
  };
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );
  return (
    <SafeAreaView style={styles.Container}>
      <Header title="ADMIN PRESENSI" />
      <View style={styles.ListText}>
        <Text style={styles.ListText}>Nama : {userData.nama}</Text>
        <Text style={styles.ListText}>Status : {userData.role}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={activateCheckIn}>
        <Text style={styles.buttonText}>🏠 Aktifkan Absen Masuk</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={activateCheckOut}>
        <Text style={styles.buttonText}>🏠 Aktifkan Absen Pulang</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default adminpresensi;

const styles = StyleSheet.create({
  ContainerList: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 20,
    paddingRight: 20,
  },
  ListItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ListText: {
    fontSize: 18,
    color: "black",
    fontWeight: "normal",
    justifyContent: "center",
    marginBottom: 4,
    paddingLeft: 20,
  },
  Container: {
    flex: 1,
    backgroundColor: "#C8EDEE", // Warna latar belakang seluruh layar
  },
  listContainer: {
    padding: 10,
  },
  button: {
    backgroundColor: "#fbb03b", // Warna kuning pada tombol
    width: 300,
    height: 80,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginVertical: 8,
    marginBottom: 10,
    marginRight: 60,
    marginLeft: 30,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    alignItems: "center",
  },
});
