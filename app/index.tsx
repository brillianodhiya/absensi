import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";
import { useUserRole } from "@/hooks/useUserRole";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Index = () => {
  const [nama, setName] = useState("");

  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);
  const { loading, role } = useUserRole();

  useEffect(() => {
    if (role == "siswa") {
      router.push("/(tabs)/home");
    } else if (role == "guru") {
      router.push("/(admin)/dashboard");
    }
  }, [role, router]);

  // Fungsi untuk login
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://t6c2snf7-3000.asse.devtunnels.ms/users/login",

        {
          nama: nama,
          password: password,
        }
      );
      if (response.status === 200) {
        // Simpan token di AsyncStorage
        await AsyncStorage.setItem("token", response.data.token);
        console.log(response.data.token);
        // Arahkan ke halaman home setelah login berhasil
        await AsyncStorage.setItem("role", response.data.role);
        if (response.data.role == "siswa") {
          router.push("/(tabs)/home");
        } else {
          router.push("/(admin)/dashboard");
        }
      }
    } catch (error) {
      console.error("Error saat login:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/logo_smk-removebg-preview.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Nama"
        value={nama}
        onChangeText={setName}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Ionicons name="arrow-forward" size={wp("5%")} color="white" />
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C8EDEE",
    alignItems: "center",
    padding: wp("5%"),
  },
  logo: {
    width: wp("30%"),
    height: wp("30%"),
    marginTop: hp("5%"),
    marginBottom: hp("3%"),
    resizeMode: "contain",
  },
  title: {
    fontSize: wp("7%"),
    fontWeight: "bold",
    color: "black",
    marginBottom: hp("3%"),
  },
  label: {
    fontSize: wp("4%"),
    color: "black",
    alignSelf: "flex-start",
    marginLeft: wp("2%"),
    marginBottom: hp("1%"),
  },
  input: {
    width: "100%",
    height: hp("6%"),
    backgroundColor: "white",
    borderRadius: wp("1%"),
    paddingHorizontal: wp("4%"),
    fontSize: wp("4%"),
    marginBottom: hp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: "#B0BEC5",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFA000",
    borderRadius: wp("2%"),
    width: "100%",
    height: hp("6%"),
    marginTop: hp("3%"),
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("4.5%"),
    marginLeft: wp("2%"),
  },
});
