import { createContext, useState } from "react";

export const GlobalSnackContext = createContext();

export const GlobalSnackProvider = ({ children }) => {
  const [visibleGlobalSnack, setVisibleGlobalSnack] = useState(false);
  const [snackText, setSnackText] = useState("Text content of the snackbar");
  const showGlobalSnack = () => setVisibleGlobalSnack(true);
  const closeGlobalSnack = () => setVisibleGlobalSnack(false);

  return (
    <GlobalSnackContext.Provider
      value={{
        visibleGlobalSnack,
        setVisibleGlobalSnack,
        showGlobalSnack,
        closeGlobalSnack,
        snackText,
        setSnackText,
      }}
    >
      {children}
    </GlobalSnackContext.Provider>
  );
};
