import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import axios from "axios";

// Status colors based on type
const statusColors = {
  Hadir: "#00d084",
  Sakit: "#ff6900",
  Izin: "#fcb900",
  Alfa: "#00bcd4",
};

const RekapData = () => {
  const [data, setData] = useState([]); // State untuk menyimpan data yang diambil
  const [loading, setLoading] = useState(true); // State untuk mengontrol tampilan loading
  const [error, setError] = useState(null); // State untuk menangani error jika terjadi

  useEffect(() => {
    // Fungsi untuk mengambil data dari backend
    const fetchData = async () => {
      try {
        // Permintaan GET ke API
        const response = await axios.get(
          "https://d09jsw8q-3000.asse.devtunnels.ms/attendance/RekapAbsensi"
        ); // Ganti dengan URL API backend Anda
        setData(response.data); // Menyimpan data dari API ke state `data`
      } catch (err) {
        setError("Gagal mengambil data"); // Menyimpan pesan error jika terjadi kesalahan
      } finally {
        setLoading(false); // Mengubah state `loading` menjadi false setelah data diambil atau terjadi error
      }
    };

    fetchData(); // Memanggil fungsi `fetchData` ketika komponen pertama kali dimuat
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
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
      <Header title="REKAP ABSEN" />

      {/* Bagian Informasi dan Tombol Pencarian & Filter */}
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

        {/* Tombol Filter */}
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#00C853" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Tampilkan loading atau data */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#00bcd4"
          style={styles.loading}
        />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
    marginBottom: 10,
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
    marginBottom: 10,
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
