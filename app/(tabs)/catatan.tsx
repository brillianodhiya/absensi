import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const catatan = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>CATATAN PRESENSI</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <View style={styles.body}>
            <Text style={styles.infoText}>Nama</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>Estri Handayani</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.infoText}>Kelas</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>X RPL B</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.infoText}>Status</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>Hadir</Text>
          </View>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Catatan Materi Jam (1-4):</Text>
        <TextInput style={styles.input} placeholder="Masukkan catatan..." />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Catatan Materi Jam (5-10):</Text>
        <TextInput style={styles.input} placeholder="Masukkan catatan..." />
      </View>

      <TouchableOpacity style={styles.presenceButtonKirim}>
        <Text style={styles.presenceButtonText}>Kirim</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.presenceButton}
        onPress={() => router.push("/presensiPulang")}
      >
        <Ionicons name="create-outline" size={20} color="white" />
        <Text style={styles.presenceButtonText}>PRESENSI PULANG</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default catatan;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#C8EDEE", // Warna latar belakang seluruh layar
  },
  header: {
    marginTop: 15,
    alignItems: "center",
  },
  textHeader: {
    fontSize: 28,
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  infoContainer: {
    marginHorizontal: 25,
    marginBottom: 30,
    marginTop: 25,
  },
  row: {
    marginTop: 20,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 20,
    fontWeight: "bold",
    width: 80,
    color: "black",
  },
  separator: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginRight: 5,
  },
  isiText: {
    fontSize: 20,
    color: "black",
  },
  presenceButtonKirim: {
    marginTop: 15,
    alignItems: "center",
    backgroundColor: "#fbb03b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "25%", // Sesuaikan lebar agar lebih proporsional di kanan
    alignSelf: "flex-end", // Pindahkan tombol ke kanan
    marginRight: 25,
  },
  presenceButton: {
    flexDirection: "row",
    marginTop: 35,
    alignItems: "center",
    backgroundColor: "#40E9AE",
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "black",
    marginBottom: 10,
    marginLeft: 25,
  },
  input: {
    marginHorizontal: "auto",
    height: 70,
    width: 370,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Untuk efek bayangan di Android
  },
});
