import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";

const catatan = () => {
  const [userData, setUserData] = useState({
    nama: "",
    kelas: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [isi_catatan, setCatatan] = useState("");

  const getData = async () => {
    try {
      console.log("Get data");
      const token = await AsyncStorage.getItem("token");
      console.log();

      console.log(token);
      if (!token) {
        setError("Token not found. Please login.");
        setLoading(false);
        return;
      }
      axios
        .get("https://px973nrz-3000.asse.devtunnels.ms/users/show_profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData({
            nama: response.data.data.nama,
            kelas: response.data.data.kelas,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data.");
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCtn = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log();

      if (!token) {
        setError("Token not found. Please login.");
        setLoading(false);
        return;
      }

      // Mengambil `id_user` dari AsyncStorage atau state, sesuai kebutuhan Anda
      const id_user = await AsyncStorage.getItem("id"); // Sesuaikan ini jika `id_user` diambil dari tempat lain
      if (!id_user) {
        setError("User ID not found.");
        setLoading(false);
        return;
      }

      axios
        .post(
          "https://px973nrz-3000.asse.devtunnels.ms/catatan/make_catatan",
          {
            id_user: id_user,
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
    }, [])
  );
  return (
    <SafeAreaView style={styles.Container}>
      <Header title="CATATAN"/>
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
            <Text style={styles.isiText}>{"hadir/izin/sakit"}</Text>
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
      <TouchableOpacity
        style={styles.presenceButton}
        onPress={() => router.push("/presensiPulang")}
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
    marginTop: 15,
    alignItems: "center",
  },
  textHeader: {
    fontSize: 28,
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 45,
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
  presenceButtonKirim: {
    marginTop: 15,
    alignItems: "center",
    backgroundColor: "#fbb03b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "25%", // Sesuaikan lebar agar lebih proporsional di kanan
    alignSelf: "flex-end", // Pindahkan tombol ke kanan
    marginRight: 25,
  },
  presenceButton: {
    flexDirection: "row",
    marginTop: 35,
    alignItems: "center",
    backgroundColor: "#40E9AE",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "85%",
    marginHorizontal: "auto",
  },
  presenceButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "black",
    marginBottom: 10,
    marginLeft: 25,
  },
  input: {
    marginHorizontal: "auto",
    height: 70,
    width: 370,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Untuk efek bayangan di Android
  },
});
