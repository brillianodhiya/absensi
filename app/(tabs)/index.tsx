import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);

  // Fungsi untuk login
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://px973nrz-3000.asse.devtunnels.ms/users/login",
        {
          username: username,
          password: password,
        }
      );
      if (response.status === 200) {
        await localStorage.setItem("token", response.data.token);
        router.push("/(tabs)/home");
      }
    } catch (error) {
      console.error("Error saat login:", error);
    }
  };

  // Fungsi untuk mengambil data
  const fetchData = async () => {
    try {
      const response = await axios.get("/data-endpoint"); // Endpoint untuk data
      console.log("Data dari server:", response.data);
      // Simpan data atau tampilkan sesuai kebutuhan
    } catch (error) {
      console.error("Error saat mengambil data:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/logo_smk-removebg-preview.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan username"
        value={username}
        onChangeText={setUsername}
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
        <Ionicons name="arrow-forward" size={20} color="white" />
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
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 50,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "black",
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#B0BEC5",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFA000",
    borderRadius: 5,
    width: "100%",
    height: 50,
    marginTop: 20,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
});
