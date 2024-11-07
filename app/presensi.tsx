import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

const adminpresensi = () => {
  return (
    <SafeAreaView style={styles.Container}>
      {/* Header dengan logo dan judul */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logosmk2.png")}
          style={styles.logo}
        />
        <Text style={styles.textHeader}>PRESENSI</Text>
      </View>
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
