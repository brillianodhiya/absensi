import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import { Ionicons } from "@expo/vector-icons";
  const data = [
    { name: "Nama Siswa", status: "Hadir" },
    { name: "Nama Siswa", status: "Sakit" },
    { name: "Nama Siswa", status: "Izin" },
    { name: "Nama Siswa", status: "Alfa" },
  ];
  
  // Status colors based on type
  const statusColors = {
    Hadir: "#00d084",
    Sakit: "#ff6900",
    Izin: "#fcb900",
    Alfa: "#00bcd4",
  };
  const RekapData = () => {
    const renderItem = ({ item }: { item: any }) => (
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
        <View
          style={[
            styles.statusContainer,
            { backgroundColor: statusColors[item.status] },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    );
  
    return (
      <SafeAreaView style={styles.Container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Rekap Absen</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <View style={styles.body}>
              <Text style={styles.infoText}>Hari</Text>
              <Text style={styles.separator}>:</Text>
              <Text style={styles.isiText}>Senin</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.infoText}>Tanggal</Text>
              <Text style={styles.separator}>:</Text>
              <Text style={styles.isiText}>31-6-2025</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.infoText}>Kelas</Text>
              <Text style={styles.separator}>:</Text>
              <Text style={styles.isiText}>X RPL B</Text>
            </View>
          </View>
        </View>
        <View style={styles.header2}>
          <View style={styles.searchBox}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="white"
              style={styles.searchInput}
            />
            <Ionicons
              name="search"
              size={20}
              color="white"
              style={styles.searchIcon}
            />
          </View>
  
          {/* Filter Button */}
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={20} color="#00C853" />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    );
  };
  
  export default RekapData;
  
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
    header2: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
    },
    searchBox: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#2CE592",
      borderRadius: 20,
      paddingHorizontal: 15,
      height: 40,
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      color: "white",
      fontSize: 16,
    },
    searchIcon: {
      marginLeft: 5,
    },
    filterButton: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#2CE592",
      borderRadius: 20,
      paddingHorizontal: 15,
      height: 40,
    },
    filterText: {
      color: "#2CE592",
      fontSize: 16,
      marginLeft: 5,
    },
    listContainer: {
      padding: 16,
      backgroundColor: "#d4f1f4", // Light blue background
    },
    itemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      marginVertical: 4,
      borderRadius: 10,
      backgroundColor: "#e0f7fa",
    },
    nameText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#00796b",
    },
    statusContainer: {
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 20,
    },
    statusText: {
      color: "white",
      fontWeight: "bold",
    },
  });
  