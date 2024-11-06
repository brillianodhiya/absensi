import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const DataSiswa = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo_smk-removebg-preview.png")}
          style={styles.logo}
        />
        <Text style={styles.textHeader}>DATA PESERTA DIDIK</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.infoText}>NISN</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>324646</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Nama</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>Bagus</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Kelas</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>X RPL A</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Username</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>Bgs</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Password</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>12345678</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.presenceButton}
        onPress={() => router.push("/presensiMasuk")}
      >
        <Ionicons name="create-outline" size={20} color="white" />
        <Text style={styles.presenceButtonText}>PRESENSI</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DataSiswa;

const styles = StyleSheet.create({
  Container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#C8EDEE", // Warna latar belakang seluruh layar
  },
  header: {
    flexDirection: "row",
    marginTop: 15,
  },
  textHeader: {
    fontSize: 28,
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
    marginRight: 35,
    marginLeft: 20,
  },
  body: {
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginLeft: 20,
  },
  infoText: {
    fontSize: 18,
    fontWeight: "bold",
    width: 100, // Lebar tetap untuk alignment yang lebih rapi
    color: "black",
  },
  separator: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5, // Jarak antara infoText dan isiText
    color: "black",
  },
  isiText: {
    fontSize: 18,
    flex: 1, // Mengisi sisa ruang pada baris
    color: "black",
  },
  presenceButton: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    backgroundColor: "#FFB22C",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "85%",
    marginHorizontal: "auto",
  },
  presenceButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});
