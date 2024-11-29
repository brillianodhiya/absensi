import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const catatan = () => {
  const [userData, setUserData] = useState({
    nama: "",
    kelas: "",
    status: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isi_catatan, setCatatan] = useState("");
  const [presensiPulangActive, setPresensiPulangActive] = useState(false);
  const checkPresensiStatus = async () => {
    try {
      console.log("triggered");
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "Token tidak ditemukan. Silakan login.");
        return;
      }

      const response = await axios.get(
        "https://t6c2snf7-3000.asse.devtunnels.ms/attendance/check-status",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const allowClokout = response.data?.allowClockout; // Periksa nilai allow_clokin
      setPresensiPulangActive(allowClokout); // Set status tombol berdasarkan allow_clokin
    } catch (error) {
      console.error("Error checking presensi status:", error);
      Alert.alert("Error", "Gagal memeriksa status presensi.");
    }
  };

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setError("Token not found. Please login.");
        setLoading(false);
        return;
      }

      // Ambil data user dan status presensi pulang dari server
      axios
        .get("https://t6c2snf7-3000.asse.devtunnels.ms/catatan/info_catatan", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (response) => {
          setUserData({
            nama: response.data.data.nama,
            kelas: response.data.data.kelas,
            status: response.data.data.status,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data.");
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  const handleCtn = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setError("Token not found. Please login.");
        setLoading(false);
        return;
      }

      axios
        .post(
          "https://t6c2snf7-3000.asse.devtunnels.ms/catatan/make_catatan",

          {
            isi_catatan: isi_catatan,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Note added successfully:");
          setCatatan("");
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error adding note:", error);
          setError("Failed to add note.");
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
      checkPresensiStatus();
    }, [])
  );

  return (
    <SafeAreaView style={styles.Container}>
      <Header title="CATATAN" />
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <View style={styles.body}>
            <Text style={styles.infoText}>Nama</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>{userData.nama}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.infoText}>Kelas</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>{userData.kelas}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.infoText}>Status</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.isiText}>{userData.status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Catatan Materi:</Text>
        <TextInput
          style={styles.input}
          value={isi_catatan}
          placeholder="Masukkan catatan..."
          onChangeText={(text) => setCatatan(text)}
        />
      </View>
      <TouchableOpacity style={styles.presenceButtonKirim}>
        <Text style={styles.presenceButtonText} onPress={handleCtn}>
          Kirim
        </Text>
      </TouchableOpacity>

      {/* Tombol Presensi Pulang hanya bisa ditekan jika presensi sudah diaktifkan */}
      <TouchableOpacity
        style={[
          styles.presenceButton,
          !presensiPulangActive && { opacity: 0.5 },
        ]} // Nonaktifkan tampilan jika belum aktif
        onPress={() => router.push("/presensiPulang")}
        disabled={!presensiPulangActive} // Menonaktifkan tombol jika presensiPulangActive belum aktif
      >
        <Ionicons name="create-outline" size={20} color="white" />
        <Text style={styles.presenceButtonText}>PRESENSI PULANG</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default catatan;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#C8EDEE", // Warna latar belakang seluruh layar
  },
  header: {
    marginTop: hp("2%"),
    alignItems: "center",
  },
  textHeader: {
    fontSize: hp("3.5%"),
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("4%"),
  },
  infoContainer: {
    marginHorizontal: wp("6%"),
    marginBottom: hp("3%"),
    marginTop: hp("3%"),
  },
  row: {
    marginTop: hp("2%"),
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  infoText: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    width: wp("25%"),
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
  presenceButtonKirim: {
    marginTop: hp("3%"),
    alignItems: "center",
    backgroundColor: "#fbb03b",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("5%"),
    borderRadius: wp("2%"),
    width: wp("30%"),
    alignSelf: "flex-end",
    marginRight: wp("6%"),
  },
  presenceButton: {
    flexDirection: "row",
    marginTop: hp("4%"),
    alignItems: "center",
    backgroundColor: "#40E9AE",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("5%"),
    borderRadius: wp("2%"),
    width: wp("85%"),
    marginHorizontal: wp("7.5%"),
  },
  presenceButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: hp("2%"),
    marginLeft: wp("2%"),
  },
  inputContainer: {
    marginBottom: hp("3%"),
  },
  label: {
    fontSize: hp("2%"),
    color: "black",
    marginBottom: hp("1%"),
    marginLeft: wp("6%"),
  },
  input: {
    marginHorizontal: wp("7.5%"),
    height: hp("8%"),
    width: wp("85%"),
    backgroundColor: "white",
    borderRadius: wp("2%"),
    paddingHorizontal: wp("4%"),
    fontSize: hp("2%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});
