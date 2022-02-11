import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { UserContext } from "../components/context/UserContext";
import { globalStyles } from "../styles/global";

export default function PhotoDetails({ navigation }) {
  const { logIn } = useContext(UserContext);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>PhotoDetails screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("ePicture")}
      />
      <Button title="Login" onPress={() => logIn({ name: "Jefferson" })} />
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
