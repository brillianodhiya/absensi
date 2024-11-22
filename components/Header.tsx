import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
    marginTop: hp("5%"), // Increased responsiveness for marginTop
    marginBottom: hp("2%"), // Adjust marginBottom to be responsive
    alignItems: "center", // Ensures logo and text align well
  },
  textHeader: {
    fontSize: hp("3%"), // Scales font size based on screen height
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    marginTop: hp("1%"), // Adjust top margin to make the text properly spaced
  },
  logo: {
    width: wp("12%"), // Scales logo width based on screen width
    height: wp("12%"), // Scales logo height based on screen width
    marginBottom: hp("1%"), // Adjust bottom margin to center the logo
    marginRight: wp("10%"), // Adjust right margin to space out logo and text
    marginLeft: wp("5%"), // Adjust left margin for consistent spacing
  },
});
