import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
