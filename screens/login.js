import { Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { Button } from "react-native-paper";
import { IMGUR_API_CLIENT_ID } from "@env";

// import { privateConfig } from "../config/private";
import { useContext, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from "expo-auth-session";
import { UserContext } from "../components/context/UserContext";
import { GlobalSnackContext } from "../components/shared/snack/snackContext";
WebBrowser.maybeCompleteAuthSession();
const discovery = {
  authorizationEndpoint: "https://api.imgur.com/oauth2/authorize",
  tokenEndpoint: "https://api.imgur.com/oauth2/token",
};

export default function Login({ navigation }) {
  const { logIn } = useContext(UserContext);
  const { setSnackText, showGlobalSnack } = useContext(GlobalSnackContext);

  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: IMGUR_API_CLIENT_ID,
      redirectUri: makeRedirectUri({
        scheme: "exp",
      }),
      scopes: [],
    },
    discovery
  );
  useEffect(() => {
    if (response?.type === "success") {
      const { access_token, account_username, refresh_token } = response.params;
      logIn({ access_token, account_username, refresh_token });
      setSnackText("You are logged in!");
      showGlobalSnack();
      navigation.navigate("ePicture");
    }
  }, [response]);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>
        Click the button bellow to log in.
      </Text>
      <Button
        icon="account"
        mode="contained"
        // loading
        // disabled
        disabled={!request}
        onPress={() => promptAsync()}
      >
        Log in with imgur
      </Button>
    </View>
  );
}
