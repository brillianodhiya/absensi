import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const presensiPulang = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo_smk-removebg-preview.png")}
          style={styles.logo}
        />
        <Text style={styles.textHeader}>PRESENSI</Text>
      </View>

      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>Pulang</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.infoText}>
          Nama: <Text style={styles.boldText}>Nama Siswa</Text>
        </Text>
        <Text style={styles.infoText}>
          Kelas: <Text style={styles.boldText}>Kelas Siswa</Text>
        </Text>
        <Text style={styles.infoText}>
          Status: <Text style={styles.boldText}>-</Text>
        </Text>
      </View>

      <View style={styles.statusContainer}>
        <TouchableOpacity style={styles.statusButton}>
          <Text style={styles.statusButtonText}>H</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statusButton}>
          <Text style={styles.statusButtonText}>I</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statusButton}>
          <Text style={styles.statusButtonText}>S</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.presenceButton}>
        <Ionicons name="create-outline" size={20} color="white" />
        <Text style={styles.presenceButtonText}>CATATAN PRESENSI</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default presensiPulang;

const styles = StyleSheet.create({
  Container: {
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
    marginRight: 80,
    marginLeft: 20,
  },
  welcome: {
    marginTop: 25,
    marginLeft: 25,
  },
  welcomeText: {
    gap: 8,
    marginBottom: 8,
    fontSize: 36,
    fontWeight: "bold",
  },
  body: {
    marginTop: 25,
    marginLeft: 25,
  },
  infoText: {
    fontSize: 26,
    marginTop: 10,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 24,
  },
  statusContainer: {
    marginTop: 70,
    flexDirection: "row",
    marginBottom: 20,
    marginHorizontal: "auto",
  },
  statusButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  statusButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  presenceButton: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    backgroundColor: "#00C853",
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
