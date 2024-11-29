import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DataKelas = () => {
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
      .get("https://t6c2snf7-3000.asse.devtunnels.ms/master_kelas/show_kelas", {
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
    <SafeAreaView style={styles.container}>
      {/* Header dengan logo dan judul */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logosmk2.png")}
          style={styles.logo}
        />
        <Text style={styles.textHeader}>DATA KELAS</Text>
      </View>
      <View style={styles.containerList}>
        <View style={styles.listItem}>
          <Text style={styles.textHeader}>Kode Kelas</Text>
          <Text style={styles.textHeader}>Wali Kelas</Text>
        </View>
        {loading ? (
          <View style={styles.listItem}>
            <Text style={styles.listText}>Loading...</Text>
            <Text style={styles.listText}>Loading...</Text>
          </View>
        ) : (
          data.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listText}>{item.nama_kelas}</Text>
              <Text style={styles.listText}>{item.wali.nama}</Text>
            </View>
          ))
        )}
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
  header: {
    flexDirection: "row",
    marginTop: hp("5%"),
    alignItems: "center",
    marginHorizontal: wp("5%"),
  },
  textHeader: {
    fontSize: wp("6%"),
    color: "black",
    fontWeight: "bold",
    marginLeft: wp("5%"),
  },
  logo: {
    width: wp("12%"),
    height: wp("12%"),
  },
  containerList: {
    flex: 1,
    paddingHorizontal: wp("5%"),
    paddingTop: hp("3%"),
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: hp("1.5%"),
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  listText: {
    fontSize: wp("4.5%"),
    color: "blue",
    fontWeight: "normal",
  },
});
