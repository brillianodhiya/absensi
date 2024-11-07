import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const PresensiMasuk = () => {
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
        <Text style={styles.welcomeText}>Masuk</Text>
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

      <TouchableOpacity
        style={styles.presenceButton}
        onPress={() => router.push("/catatan")}
      >
        <Ionicons name="create-outline" size={20} color="white" />
        <Text style={styles.presenceButtonText}>CATATAN PRESENSI</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PresensiMasuk;

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
  infoContainer: {
    marginHorizontal: 25,
    marginBottom: 30,
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
  statusContainer: {
    marginTop: 50,
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
});
