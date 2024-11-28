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
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"; // Import for responsive design
import { useFocusEffect } from "expo-router";

const RekapData = () => {
  const [data, setData] = useState([]); // State for storing the fetched data
  const [loading, setLoading] = useState(true); // State for controlling the loading spinner
  const [error, setError] = useState<string | null>(null); // State for error handling
  const [searchQuery, setSearchQuery] = useState("");

  const [userInfo, setInfodata] = useState({
    nama_kelas: "",
    hari: "",
    tanggal: "",
  });

  const Infodata = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      setError("Token not found. Please login.");
      setLoading(false);
      return;
    }
    axios
      .get("https://t6c2snf7-3000.asse.devtunnels.ms/attendance/info_rekap", {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setInfodata({
          nama_kelas: data.nama_kelas,
          hari: data.hari,
          tanggal: data.tanggal,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
        setLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      Infodata();
    }, [])
  );
  const statusColors = {
    Hadir: "#00d084",
    Sakit: "#ff6900",
    Izin: "#fcb900",
    Alfa: "#00bcd4",
  };

  // Function to fetch data
  const fetchData = async () => {
    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setError("Token tidak ditemukan");
        setLoading(false);
        return;
      }

      // Make the API request with the Authorization header
      const response = await axios.get(
        "https://t6c2snf7-3000.asse.devtunnels.ms/attendance/rekap_absensi",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Store the fetched data in state
      setData(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text); // Handle the search query input
  };

  const renderItem = ({
    item,
  }: {
    item: { nama: string; status: keyof typeof statusColors; catatan: string };
  }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.nameText}>{item.nama || "Tidak ada nama"}</Text>
        <Text style={styles.descriptionText}>
          {item.catatan || "Tidak ada catatan"}
        </Text>
      </View>
      <View
        style={[
          styles.statusContainer,
          { backgroundColor: statusColors[item.status] || "#ddd" },
        ]}
      >
        <Text style={styles.statusText}>
          {item.status || "Tidak ada status"}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.Container}>
      <Header title="REKAP ABSEN" />

      {/* Information and Search Box */}
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <View style={styles.body}>
            <Text style={styles.infoText}>Hari</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>{userInfo.hari}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.infoText}>Tanggal</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>{userInfo.tanggal}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.infoText}>Kelas</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>{userInfo.nama_kelas}</Text>
          </View>
        </View>
      </View>

      {/* Search and Filter Bar */}
      <View style={styles.header2}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="white"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
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

      {/* Show loading or data */}
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
    backgroundColor: "#C8EDEE",
  },
  header: {
    marginTop: hp("3%"), // Responsive marginTop
    alignItems: "center",
  },
  textHeader: {
    fontSize: hp("4%"), // Scaled font size based on screen height
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("1%"),
  },
  infoContainer: {
    marginHorizontal: wp("6%"),
    marginBottom: hp("2%"),
    marginTop: hp("3%"),
  },
  row: {
    marginTop: hp("2%"),
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },
  infoText: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    width: wp("20%"),
    color: "black",
  },
  separator: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    color: "black",
    marginRight: wp("2%"),
  },
  isiText: {
    fontSize: hp("2.5%"),
    color: "black",
  },
  header2: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("4%"),
    marginBottom: hp("2%"),
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2CE592",
    borderRadius: wp("5%"),
    paddingHorizontal: wp("4%"),
    height: hp("6%"),
    marginRight: wp("4%"),
  },
  searchInput: {
    flex: 1,
    color: "white",
    fontSize: hp("2%"),
  },
  searchIcon: {
    marginLeft: wp("2%"),
  },
  descriptionText: {
    fontSize: hp("2%"),
    color: "#00796b",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2CE592",
    borderRadius: wp("5%"),
    paddingHorizontal: wp("4%"),
    height: hp("6%"),
  },
  filterText: {
    color: "#2CE592",
    fontSize: hp("2%"),
    marginLeft: wp("2%"),
  },
  listContainer: {
    padding: wp("4%"),
    backgroundColor: "#d4f1f4",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: wp("4%"),
    marginVertical: hp("1%"),
    borderRadius: wp("3%"),
    backgroundColor: "#e0f7fa",
  },
  nameText: {
    fontSize: hp("2.2%"),
    fontWeight: "bold",
    color: "#00796b",
  },
  statusContainer: {
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
    borderRadius: wp("10%"),
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
    marginTop: hp("2%"),
  },
});
