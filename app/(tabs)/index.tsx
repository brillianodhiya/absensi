import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router, useNavigation } from "expo-router";
// import axios from "axios";
// import {  } from "expo-router";

const Index = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo_smk-removebg-preview.png")}
          style={styles.logo}
        />
        <Text style={styles.textHeader}>DASHBOARD</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.welcomeText}>Selamat Datang,</Text>
        <Text style={styles.username}>Estri Handayani</Text>
      </View>
      <View style={styles.buttonBody}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Data Siswa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Jadwal Pelajaran</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/presensiMasuk")}
        >
          <Text style={styles.buttonText}> Presensi</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;

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
  buttonBody: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // Lebar penuh agar bisa memusatkan tombol
  },
  button: {
    backgroundColor: "#fbb03b", // Warna kuning pada tombol
    width: "85%",
    padding: 25,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
});
