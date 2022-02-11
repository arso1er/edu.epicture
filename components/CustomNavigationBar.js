import React, { useContext } from "react";
import { Appbar, Menu } from "react-native-paper";
import { UserContext } from "./context/UserContext";
import { GlobalSnackContext } from "./shared/snack/snackContext";

export default function CustomNavigationBar(props) {
  const { navigation, back, route } = props;

  const { user, logOut } = useContext(UserContext);

  // console.log("====================================");
  // console.log(user);
  // console.log("====================================");

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  //   const [searchQuery, setSearchQuery] = React.useState("");
  //   const onChangeSearch = (query) => setSearchQuery(query);

  const { setSnackText, showGlobalSnack } = useContext(GlobalSnackContext);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={route.name} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
      {/* <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      /> */}
      {!back ? (
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
      ) : null}
    </Appbar.Header>
  );
}
