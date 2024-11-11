import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";

const Header = ({ title }: { title: string }) => {
  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/images/logosmk2.png")}
        style={styles.logo}
      />
      <Text style={styles.textHeader}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginTop: 50,
    marginBottom:10,
  },
  textHeader: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    marginRight: 60,
    marginLeft: 20,
  },
});
