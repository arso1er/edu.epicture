import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SearchScreen from "../screens/search";

it("render search screen", async () => {
  const { getByPlaceholderText } = render(<SearchScreen />);

  getByPlaceholderText("Search Imgur");
});

it("update search state", async () => {
  const { getByPlaceholderText } = render(<SearchScreen />);

  const searchInput = getByPlaceholderText("Search Imgur");
  fireEvent.changeText(searchInput, "Cat");
});
