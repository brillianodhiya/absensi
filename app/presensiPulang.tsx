import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";

const PresensiMasuk = () => {
  const [userData, setUserData] = useState({
    nama: "",
    kelas: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [isStatusButtonPressed, setIsStatusButtonPressed] = useState(null); // Melacak status klik pada tombol
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
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );
  const handleStatusButtonPress = (status: any) => {
    setIsStatusButtonPressed(status); // Mengubah status tombol yang diklik
  };

  return (
    <SafeAreaView style={styles.Container}>
      <Header title="PRESENSI" />

      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>Pulang</Text>
      </View>

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
        </View>
      </View>
      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            isStatusButtonPressed === "H" && styles.statusButtonActive,
          ]}
          onPress={() => handleStatusButtonPress("H")}
        >
          <Text style={styles.statusButtonText}>H</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusButton,
            isStatusButtonPressed === "I" && styles.statusButtonActive,
          ]}
          onPress={() => handleStatusButtonPress("I")}
        >
          <Text style={styles.statusButtonText}>I</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusButton,
            isStatusButtonPressed === "S" && styles.statusButtonActive,
          ]}
          onPress={() => handleStatusButtonPress("S")}
        >
          <Text style={styles.statusButtonText}>S</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.presenceButtonText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.presenceButton}
        onPress={() => router.push("/(tabs)/catatan")}
      >
        <Ionicons name="create-outline" size={20} color="white" />
        <Text style={styles.presenceButtonText}>CATATAN PRESENSI</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PresensiMasuk;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#C8EDEE",
  },
  welcome: {
    marginTop: 25,
    marginLeft: 25,
  },
  welcomeText: {
    gap: 8,
    marginBottom: 8,
    fontSize: 36,
    fontWeight: "bold",
  },
  infoContainer: {
    marginHorizontal: 25,
    marginBottom: 30,
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
  statusContainer: {
    marginTop: 30,
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
  },
  backButton: {
    marginTop: 15,
    alignItems: "center",
    backgroundColor: "#FFB22C",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "30%",
    marginHorizontal: "auto",
  },
  statusButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  statusButtonActive: {
    backgroundColor: "green", // Warna tombol berubah menjadi hijau saat diklik
  },
  statusButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  presenceButton: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    backgroundColor: "#40E9AE",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "85%",
    alignSelf: "center",
  },
  presenceButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});
