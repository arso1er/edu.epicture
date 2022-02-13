import React, { useContext } from "react";
import { Appbar, Menu } from "react-native-paper";
import { UserContext } from "./context/UserContext";
import { GlobalSnackContext } from "./shared/snack/snackContext";

export default function CustomNavigationBar(props) {
  const { navigation, back, route, options } = props;

  const { user, logOut } = useContext(UserContext);

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const { setSnackText, showGlobalSnack } = useContext(GlobalSnackContext);

  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction color="#fff" onPress={navigation.goBack} />
      ) : null}
      <Appbar.Content title={options?.title || route.name} />

      {!back ? (
        <>
          <Appbar.Action
            icon="magnify"
            color="#fff"
            onPress={() => {
              navigation.navigate("Search");
            }}
          />
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action icon="menu" color="white" onPress={openMenu} />
            }
          >
            {!user ? (
              <>
                <Menu.Item title="Guest user" disabled />
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    navigation.navigate("Login");
                  }}
                  title="Login with imgur"
                />
              </>
            ) : (
              <>
                <Menu.Item title={user.account_username} disabled />
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    navigation.navigate("Upload");
                  }}
                  title="Upload photo"
                />
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    navigation.navigate("MyPosts");
                  }}
                  title="My photos"
                />
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    navigation.navigate("Favorites");
                  }}
                  title="My favorites"
                />
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    navigation.navigate("About");
                  }}
                  title="About me"
                />
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    logOut();
                    setSnackText("You were logged out!");
                    showGlobalSnack();
                    navigation.navigate("ePicture");
                  }}
                  title="Logout"
                />
              </>
            )}
          </Menu>
        </>
      ) : null}
    </Appbar.Header>
  );
}
