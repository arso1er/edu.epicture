import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export const globalStyles = StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.dark.background,
  },
  titleText: {
    fontFamily: "Nunito-Bold",
    fontSize: 20,
    color: "#fff",
  },
  regularText: {
    fontFamily: "Nunito-Regular",
    fontSize: 18,
    color: "#fff",
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
});
