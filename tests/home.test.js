import React from "react";
import { render } from "@testing-library/react-native";
import HomeScreen from "../screens/home";

it("render default element", () => {
  const { getAllByText } = render(<HomeScreen />);
  expect(getAllByText("Welcome to ePicture").length).toBe(1);
});
