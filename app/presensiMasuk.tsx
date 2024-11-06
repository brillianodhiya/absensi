import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

const PresensiMasuk = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo_smk-removebg-preview.png")}
          style={styles.logo}
        />
        <Text style={styles.textHeader}>Presensi</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.welcomeText}>Selamat Datang,</Text>
        <Text style={styles.username}>Estri Handayani</Text>
      </View>
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
    marginRight: 60,
    marginLeft: 20,
  },
  body: {
    marginTop: 50,
    marginLeft: 25,
  },
  username: {
    gap: 8,
    marginBottom: 8,
    fontSize: 32,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 22,
    color: "#000",
  },
});
