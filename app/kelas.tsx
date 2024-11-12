import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
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
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logosmk2.png")}
          style={styles.logo}
        />
        <Text style={styles.textHeader}>DATA KELAS</Text>
      </View>
      <View style={styles.ContainerList}>
        <View style={styles.ListItem}>
          <Text style={styles.textHeader}>Kode Kelas</Text>
          <Text style={styles.textHeader}>Wali Kelas</Text>
        </View>
        {loading ? (
          <View style={styles.ListItem}>
            <Text style={styles.ListText}>Loading...</Text>
            <Text style={styles.ListText}>Loading...</Text>
          </View>
        ) : (
          data.map((item, index) => {
            return (
              <View key={index} style={styles.ListItem}>
                <Text style={styles.ListText}>{item.kelas.nama_kelas}</Text>
                <Text style={styles.ListText}>{item.nama}</Text>
              </View>
            );
          })
        )}
      </View>
    </SafeAreaView>
  );
};

export default dataKelas;

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
    color: "blue",
    fontWeight: "normal",
    justifyContent: "center",
    marginBottom: 4,
  },
  Container: {
    flex: 1,
    backgroundColor: "#C8EDEE", // Warna latar belakang seluruh layar
  },
  header: {
    flexDirection: "row",
  },
  textHeader: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    marginTop: 5,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    marginRight: 60,
    marginLeft: 20,
  },
  listContainer: {
    padding: 10,
  },
});
