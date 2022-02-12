import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getAuthToken() {
  const storageVal = await AsyncStorage.getItem("currentUser");
  const user = JSON.parse(storageVal);
  return user?.access_token || "";

  // return SecureStore.getItemAsync(AUTH_CLIENT_ID || "?");
}
export async function getUsername() {
  const storageVal = await AsyncStorage.getItem("currentUser");
  const user = JSON.parse(storageVal);
  return user?.account_username || "";
}

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initCurrentUser = async () => {
      try {
        const storageVal = await AsyncStorage.getItem("currentUser");
        const user = JSON.parse(storageVal);
        if (user) logIn(user);
      } catch (e) {
        // saving error
      }
    };
    // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // if (currentUser) {
    //   logIn(currentUser);
    // }
    initCurrentUser();
  }, []); //eslint-disable-line

  const logIn = async (user, option) => {
    await AsyncStorage.setItem("currentUser", JSON.stringify(user));
    // localStorage.setItem("currentUser", JSON.stringify(user));
    setUser(user);
  };

  const logOut = async () => {
    // localStorage.removeItem("currentUser");
    await AsyncStorage.setItem("currentUser", JSON.stringify(""));
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
