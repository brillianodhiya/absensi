import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const dataKelas = () => {
  return (
    <SafeAreaView style={styles.Container}>
      {/* Header dengan logo dan judul */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logosmk2.png")}
          style={styles.logo}
        />
        <Text style={styles.textHeader}>DATA SISWA {"\n \t \t \t"}X RPL A</Text>
      </View>
      <View style={styles.ContainerList}>
        <View style={styles.ListItem}>
          <Text style={styles.textHeader}>NISN </Text>
          <Text style={styles.textHeader}>Nama </Text>
          <Text style={styles.textHeader}>Password</Text>
        </View>
        <View style={styles.ListItem}>
          <Text style={styles.ListText}>10001</Text>
          <Text style={styles.ListText}>Ahmad Zainuri</Text>
          <Text style={styles.ListText}>XRPLA01</Text>
        </View>
        <View style={styles.ListItem}>
          <Text style={styles.ListText}>10002</Text>
          <Text style={styles.ListText}>Bimasakti</Text>
          <Text style={styles.ListText}>XRPLA02</Text>
        </View>
        <View style={styles.ListItem}>
          <Text style={styles.ListText}>10003</Text>
          <Text style={styles.ListText}>Cinta Laura</Text>
          <Text style={styles.ListText}>XRPLA03</Text>
        </View>
        <View style={styles.ListItem}>
          <Text style={styles.ListText}>10004</Text>
          <Text style={styles.ListText}>Diah Ayu</Text>
          <Text style={styles.ListText}>XRPLA04</Text>
        </View>
        <View style={styles.ListItem}>
          <Text style={styles.ListText}>10005</Text>
          <Text style={styles.ListText}>Egi Sunandar</Text>
          <Text style={styles.ListText}>XRPLA05</Text>
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
    // padding: 10,
    backgroundColor: "#f8f8f8",
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
  },
  ListItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
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
    flex: 1,
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    marginTop: 30,
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
