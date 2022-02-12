import { Appbar, Menu } from "react-native-paper";

export default function CustomNavigationBarAlt(props) {
  const { navigation, back, route, options } = props;
  const { CustomRight } = options;

  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction color="#fff" onPress={navigation.goBack} />
      ) : null}
      <Appbar.Content title={options?.title || route.name} />

      <CustomRight />
    </Appbar.Header>
  );
}
