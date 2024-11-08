import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React from "react";

const jadwal = () => {
  return (
    <SafeAreaView style={styles.Container}>
      {/* Header dengan logo dan judul */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logosmk2.png")}
          style={styles.logo}
        />
        <Text style={styles.textHeader}>JADWAL</Text>
      </View>
      <View>
        <Text>X RPL A</Text>
      </View>
    </SafeAreaView>
  );
};

export default jadwal;

const styles = StyleSheet.create({
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
