import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DataSiswa = () => {
  const [userData, setUserData] = useState({
    role: "",
    nisn: "",
    nip: "",
    nama: "",
    kelas: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      setError("Token not found. Please login.");
      setLoading(false);
      return;
    }
    axios

      .get("https://t6c2snf7-3000.asse.devtunnels.ms/users/show_profile", {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setUserData({
          role: data.role,
          nisn: data.nisn,
          nama: data.nama,
          kelas: data.kelas,
          nip: data.nip,
        });
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
      <Header title="DATA SISWA" />
      <View style={styles.body}>
        {userData.role === "siswa" ? (
          <View style={styles.row}>
            <Text style={styles.infoText}>NISN</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>{userData.nisn || "-"}</Text>
          </View>
        ) : userData.role === "guru" ? (
          <View style={styles.row}>
            <Text style={styles.infoText}>NIP</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>{userData.nip || "-"}</Text>
          </View>
        ) : null}
        <View style={styles.row}>
          <Text style={styles.infoText}>Nama</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>{userData.nama}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Kelas</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>{userData.kelas}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.presenceButton}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.presenceButtonText}>Kembali</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DataSiswa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C8EDEE",
  },
  body: {
    marginTop: hp("3%"),
    paddingHorizontal: wp("5%"),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },
  infoText: {
    fontSize: hp("2.2%"),
    fontWeight: "bold",
    width: wp("30%"),
    color: "black",
  },
  separator: {
    fontSize: hp("2.2%"),
    fontWeight: "bold",
    marginHorizontal: wp("1%"),
    color: "black",
  },
  isiText: {
    fontSize: hp("2.2%"),
    flex: 1,
    color: "black",
  },
  presenceButton: {
    flexDirection: "row",
    marginTop: hp("3%"),
    alignItems: "center",
    backgroundColor: "#FFB22C",
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("6%"),
    borderRadius: wp("2%"),
    width: wp("85%"),
    alignSelf: "center",
  },
  presenceButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: hp("2.5%"),
    marginLeft: wp("2%"),
  },
});
