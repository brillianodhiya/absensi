import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DataGuru = () => {
  const [userData, setUserData] = useState({
    role: "", // Menambahkan role untuk melacak peran pengguna
    nisn: "",
    nip: "",
    nama: "",
    kelas: "",
    mapel: "", // tambahan mapel
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");

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
        const data = response.data.data;
        setUserData({
          role: data.role, // Mendapatkan role dari response
          nisn: data.nisn,
          nama: data.nama,
          kelas: data.kelas,
          nip: data.nip,
          mapel: data.mapel, // tambahan mapel
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
    <SafeAreaView style={styles.Container}>
      <Header title="DATA GURU" />
      <View style={styles.body}>
        {userData.role === "siswa" ? (
          <View style={styles.row}>
            <Text style={styles.infoText}>NISN</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>
              {loading ? "Loading..." : userData.nisn || "-"}
            </Text>
          </View>
        ) : userData.role === "guru" ? (
          <View style={styles.row}>
            <Text style={styles.infoText}>NIP</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>
              {loading ? "Loading..." : userData.nip || "-"}
            </Text>
          </View>
        ) : null}
        <View style={styles.row}>
          <Text style={styles.infoText}>Nama</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>
            {loading ? "Loading..." : userData.nama}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Mapel</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>
            {loading ? "Loading..." : userData.mapel}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.presenceButton}
        onPress={() => router.push("/(admin)/dashboard")}
      >
        <Text style={styles.presenceButtonText}>Kembali</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DataGuru;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#C8EDEE",
  },

  body: {
    marginTop: hp("3%"),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("2%"),
    marginLeft: wp("5%"),
  },
  infoText: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    width: wp("30%"),
    color: "black",
  },
  separator: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    marginHorizontal: wp("2%"),
    color: "black",
  },
  isiText: {
    fontSize: hp("2.5%"),
    flex: 1,
    color: "black",
  },
  presenceButton: {
    flexDirection: "row",
    marginTop: hp("4%"),
    alignItems: "center",
    backgroundColor: "#FFB22C",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("5%"),
    borderRadius: wp("2%"),
    width: wp("30%"),
    marginHorizontal: wp("35%"),
  },
  presenceButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: hp("2%"),
    marginLeft: wp("2%"),
  },
});
