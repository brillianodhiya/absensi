import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
  } from "react-native";
  import React from "react";
  import { Ionicons } from "@expo/vector-icons";
  
  const rekapmasuk = () => {
    return (
      <SafeAreaView style={styles.Container}>
        {/* Header dengan logo dan judul */}
        <View style={styles.header}>
          <Image
            source={require("../assets/images/logosmk2.png")}
            style={styles.logo}
          />
          <Text style={styles.textHeader}>REKAP ABSEN PULANG</Text>
        </View>
  
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.label}>Nama </Text>
            <Text style={styles.separator}>:</Text>
            {/* <Text style={styles.value}>{data.hari}</Text> */}
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Keterangan</Text>
            <Text style={styles.separator}>:</Text>
            {/* <Text style={styles.value}>{data.tanggal}</Text> */}
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Kelas</Text>
            <Text style={styles.separator}>:</Text>
            {/* <Text style={styles.value}>{data.kelas}</Text> */}
          </View>
          <View style={styles.container}>
            {/* Search and Filter Section */}
            <View style={styles.searchContainer}>
              <TextInput style={styles.searchInput} placeholder="Search" />
              <Ionicons
                name="search"
                size={20}
                color="#fff"
                style={styles.searchIcon}
              />
              <TouchableOpacity style={styles.filterButton}>
                <Ionicons name="filter" size={20} color="#4CAF50" />
                <Text style={styles.filterText}>Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default rekapmasuk;
  
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
      marginTop: 6,
    },
    logo: {
      width: 50,
      height: 50,
      marginBottom: 10,
      marginRight: 60,
      marginLeft: 20,
    },
  
    container: {
      flex: 1,
      padding: 10,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 5,
    },
    label: {
      fontSize: 16,
      width: 70, // Tentukan lebar agar semua label rata
      fontWeight: "bold",
      color: "#000",
    },
    separator: {
      fontSize: 16,
      paddingHorizontal: 5,
      color: "#000",
    },
    value: {
      fontSize: 16,
      color: "#000",
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      backgroundColor: "#4CAF50",
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 8,
      color: "#fff",
      fontSize: 16,
    },
    searchIcon: {
      position: "absolute",
      right: 50,
      top: 10,
    },
    filterButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#E0F7FA",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 10,
      marginLeft: 10,
    },
    filterText: {
      color: "#4CAF50",
      marginLeft: 4,
    },
    listContainer: {
      paddingBottom: 10,
    },
    listItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 12,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: "#E0E0E0",
    },
    nama: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
    },
    keterangan: {
      fontSize: 14,
      color: "#757575",
    },
    statusContainer: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 20,
    },
    statusText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });
  