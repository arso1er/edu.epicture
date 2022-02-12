// import "react-native-gesture-handler";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import CustomNavigationBar from "./components/CustomNavigationBar";
import HomeScreen from "./screens/home";
import PhotoDetailsScreen from "./screens/photoDetails";
import LoginScreen from "./screens/login";
import SearchScreen from "./screens/search";
import FavoritesScreen from "./screens/favorites";

import UploadScreen from "./screens/upload";
import CameraScreen from "./screens/UploadScreens/Camera";
import PostDraftScreen from "./screens/UploadScreens/PostDraft";

import { UserProvider } from "./components/context/UserContext";
import { GlobalSnackProvider } from "./components/shared/snack/snackContext";
import GlobalSnack from "./components/shared/snack/globalSnack";

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <UserProvider>
      <GlobalSnackProvider>
        <PaperProvider>
          {/* <Home /> */}
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="ePicture"
              screenOptions={{
                header: (props) => <CustomNavigationBar {...props} />,
                headerMode: "screen", // float, screen
                ...TransitionPresets.SlideFromRightIOS,
              }}
            >
              <Stack.Screen name="ePicture" component={HomeScreen} />
              <Stack.Screen
                name="PhotoDetails"
                component={PhotoDetailsScreen}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Search" component={SearchScreen} />
              <Stack.Screen name="Favorites" component={FavoritesScreen} />
              <Stack.Screen
                name="Upload"
                options={{ title: "New post" }}
                component={UploadScreen}
              />
              <Stack.Screen name="CameraScreen" component={CameraScreen} />
              <Stack.Screen
                name="PostDraftScreen"
                component={PostDraftScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <GlobalSnack />
        </PaperProvider>
      </GlobalSnackProvider>
    </UserProvider>
  );
}
