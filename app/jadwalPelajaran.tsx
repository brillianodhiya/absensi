import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const JadwalPelajaran = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Judul */}
      <View style={styles.header}>
        <Text style={styles.headerText}>JADWAL</Text>
      </View>

      {/* Data Jadwal */}
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.infoText}>Kelas</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>X RPL A</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Hari</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>Senin</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Tanggal</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>28 Oktober 2024</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Jam ke</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>1-4</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Mapel</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>Matematika</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Materi</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>Algoritma</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Jam ke</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>5-10</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Mapel</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>Dasar-Dasar Keahlian</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>Materi</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.isiText}>Pemrograman Web</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default JadwalPelajaran;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C8EDEE", // Warna latar belakang
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
  },
  body: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 20,
    fontWeight: "bold",
    width: 100, // Lebar tetap untuk alignment yang lebih rapi
    color: "black",
  },
  separator: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 5, // Jarak antara infoText dan isiText
    color: "black",
  },
  isiText: {
    fontSize: 20,
    flex: 1, // Mengisi sisa ruang pada baris
    color: "black",
  },
});
