import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const dataKelas = () => {
  return (
    <SafeAreaView style={styles.Container}>
      {/* Header dengan logo dan judul */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logosmk2.png")}
          style={styles.logo}
        />
        <Text style={styles.textHeader}>DATA KELAS</Text>
      </View>
      <View style={styles.ContainerList}>
        <View style={styles.ListItem}>
          <Text style={styles.textHeader}>Kode Kelas</Text>
          <Text style={styles.textHeader}>Wali Kelas</Text>
        </View>
        <View style={styles.ListItem}>
          <Text style={styles.ListText}>X RPL A</Text>
          <Text style={styles.ListText}>Ervi Rahmawati, S.T</Text>
        </View>
        <View style={styles.ListItem}>
          <Text style={styles.ListText}>X RPL B</Text>
          <Text style={styles.ListText}>Labib Fayumi, S.Kom</Text>
        </View>
        <View style={styles.ListItem}>
          <Text style={styles.ListText}>X RPL C</Text>
          <Text style={styles.ListText}>Dwi Fikhrotul, S.Kom</Text>
        </View>
        <View style={styles.ListItem}>
          <Text style={styles.ListText}>XI RPL A</Text>
          <Text style={styles.ListText}>Novi Dyah P, S.Pd</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default dataKelas;

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
    color: "blue",
    fontWeight: "normal",
    justifyContent: "center",
    marginBottom: 4,
  },
  Container: {
    flex: 1,
    backgroundColor: "#C8EDEE", // Warna latar belakang seluruh layar
  },
  header: {
    flexDirection: "row",
  },
  textHeader: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    marginTop: 5,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    marginRight: 60,
    marginLeft: 20,
  },
  listContainer: {
    padding: 10,
  },
});
