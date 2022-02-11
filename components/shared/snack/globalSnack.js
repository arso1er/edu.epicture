import { useContext } from "react";
import { Snackbar } from "react-native-paper";
import { GlobalSnackContext } from "./snackContext";

export default function GlobalSnack() {
  const { visibleGlobalSnack, closeGlobalSnack, snackText } =
    useContext(GlobalSnackContext);

  return (
    <Snackbar
      visible={visibleGlobalSnack}
      onDismiss={closeGlobalSnack}
      duration={5000}
    >
      {snackText}
    </Snackbar>
  );
}
