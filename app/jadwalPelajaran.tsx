import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Jadwal {
  kelas: string;
  jam: string;
  jam_selesai: string;
  nama_pelajaran: string;
  materi: string;
}

interface HariData {
  hari: string;
  jadwal: Jadwal[];
}

const JadwalPelajaran = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<HariData[]>([]);

  const getData = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      setError("Token not found. Please login.");
      setLoading(false);
      return;
    }
    axios
      .get(
        "https://px973nrz-3000.asse.devtunnels.ms/jadwal_kelas/show_jadwal",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data: HariData[] = response.data.data;
        console.log(data); // Debugging output
        setData(data);
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
      getData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="JADWAL" />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView style={styles.body}>
          {data.map((item, index) => (
            <View key={index} style={styles.daySection}>
              <Text style={styles.dayText}>{item.hari}</Text>
              {item.jadwal.map((jadwal, jadwalIndex) => (
                <View key={jadwalIndex} style={styles.jadwalItem}>
                  <View style={styles.row}>
                    <Text style={styles.infoText}>Kelas</Text>
                    <Text style={styles.separator}>:</Text>
                    <Text style={styles.isiText}>{jadwal.kelas}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.infoText}>Jam</Text>
                    <Text style={styles.separator}>:</Text>
                    <Text style={styles.isiText}>
                      {jadwal.jam} - {jadwal.jam_selesai}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.infoText}>Mapel</Text>
                    <Text style={styles.separator}>:</Text>
                    <Text style={styles.isiText}>{jadwal.nama_pelajaran}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.infoText}>Materi</Text>
                    <Text style={styles.separator}>:</Text>
                    <Text style={styles.isiText}>{jadwal.materi}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default JadwalPelajaran;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C8EDEE",
    paddingHorizontal: wp("5%"),
    paddingTop: hp("6%"),
  },
  body: {
    flex: 1,
  },
  daySection: {
    marginBottom: hp("3%"),
  },
  dayText: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp("2%"),
  },
  jadwalItem: {
    backgroundColor: "#fff",
    padding: wp("4%"),
    borderRadius: wp("2%"),
    marginBottom: hp("1.5%"),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  infoText: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    width: wp("25%"),
    color: "black",
  },
  separator: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    marginHorizontal: wp("2%"),
    color: "black",
  },
  isiText: {
    fontSize: wp("4.5%"),
    flex: 1,
    color: "black",
  },
  errorText: {
    fontSize: wp("5%"),
    color: "red",
    textAlign: "center",
    marginTop: hp("5%"),
  },
});
