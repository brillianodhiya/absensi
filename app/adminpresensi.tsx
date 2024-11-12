import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "@/components/Header";

const adminpresensi = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <Header title="ADMIN PRESENSI" />
      <View style={styles.ListText}>
        <Text style={styles.ListText}>Nama : Estri Handayani</Text>
        <Text style={styles.ListText}>Status : Guru</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>🏠 Aktifkan Absen Masuk</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
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
