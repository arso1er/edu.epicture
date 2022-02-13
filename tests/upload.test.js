import React from "react";
import { render } from "@testing-library/react-native";
import UploadScreen from "../screens/upload";

it("render Camera element", () => {
  const { getAllByText } = render(<UploadScreen />);
  expect(getAllByText("Camera").length).toBe(1);
});

it("render Browse element", () => {
  const { getAllByText } = render(<UploadScreen />);
  expect(getAllByText("Browse").length).toBe(1);
});

it("render photo lib element", () => {
  const { getAllByText } = render(<UploadScreen />);
  expect(getAllByText("Import from photo library").length).toBe(1);
});
