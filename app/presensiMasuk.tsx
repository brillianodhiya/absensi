import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PresensiMasuk = () => {
  const [userData, setUserData] = useState({
    nama: "",
    kelas: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isStatusButtonPressed, setIsStatusButtonPressed] = useState(null);
  const [is_leave, setIs_leave] = useState<0 | 1 | 2 | 3 | null>(null);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setError("Token not found. Please login.");
        setLoading(false);
        return;
      }
      axios
        .get("https://t6c2snf7-3000.asse.devtunnels.ms/users/show_profile", {
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

  const masuk = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setError("Token not found. Please login.");
        setLoading(false);
        return;
      }

      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        setLoading(false);
        return;
      }

      // Get the current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Send location data along with leave status
      const leaveStatus = is_leave !== null ? is_leave : 0;
      axios
        .post(
          "https://t6c2snf7-3000.asse.devtunnels.ms/attendance/clockin",
          {
            is_leave: leaveStatus,
            latitude,
            longitude,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Note added successfully:");
          setLoading(false);
          router.push("/(tabs)/home");
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

  const handleStatusButtonPress = (status: any) => {
    setIsStatusButtonPressed(status);
    setIs_leave(
      status === "H" ? 1 : status === "I" ? 2 : status === "S" ? 3 : 0
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="PRESENSI" />

      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>Masuk</Text>
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
      <TouchableOpacity style={styles.presenceButton} onPress={() => masuk()}>
        <Text style={styles.presenceButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PresensiMasuk;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C8EDEE",
  },
  welcome: {
    marginTop: hp("3%"),
    marginLeft: wp("5%"),
  },
  welcomeText: {
    fontSize: wp("8%"),
    fontWeight: "bold",
  },
  infoContainer: {
    marginHorizontal: wp("5%"),
    marginBottom: hp("3%"),
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
    fontSize: wp("5%"),
    fontWeight: "bold",
    width: wp("30%"),
  },
  separator: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: "black",
    marginRight: wp("2%"),
  },
  isiText: {
    fontSize: wp("5%"),
    color: "black",
  },
  statusContainer: {
    marginTop: hp("5%"),
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: hp("4%"),
  },
  statusButton: {
    backgroundColor: "#000",
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("5%"),
    borderRadius: wp("2%"),
    marginHorizontal: wp("2%"),
  },
  statusButtonActive: {
    backgroundColor: "green", // Change to green when active
  },
  statusButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("5%"),
  },
  presenceButton: {
    marginTop: hp("3%"),
    alignItems: "center",
    backgroundColor: "#40E9AE",
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("6%"),
    borderRadius: wp("2%"),
    width: wp("80%"),
    alignSelf: "center",
  },
  presenceButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("5%"),
  },
});
