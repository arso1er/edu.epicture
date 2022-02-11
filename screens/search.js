import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function Search() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Search screen</Text>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     padding: 24,
//   },
//   titleText: {
//     fontFamily: "Nunito-Bold",
//     fontSize: 18,
//   },
// });
