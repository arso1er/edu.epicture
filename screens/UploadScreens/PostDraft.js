import { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
} from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Dimensions from "../../constants/Layout";
import CheckBox from "../../components/Checkbox";
import UploadPictureCard from "../../components/PictureCard/UploadPictureCard";
import { uploadImage, shareImage } from "../../network/image";
import CustomNavigationBarAlt from "../../components/CustomNavigationBarAlt";
import { globalStyles } from "../../styles/global";
import Color from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: "5%",
    width: "95%",
    alignItems: "center",
  },
  titleBar: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#474a50",
    width: "100%",
    borderRadius: 5,
    overflow: "hidden",
  },
  titleInput: {
    fontSize: 17,
    width: "100%",
    backgroundColor: "#2e3034",
    padding: 15,
    color: "white",
    textAlignVertical: "center",
    paddingTop: 15,
  },
  checkboxArea: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginVertical: 13,
  },
  checkboxZone: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textCheckboxZone: {
    marginLeft: 10,
    color: "white",
    fontSize: 16,
    marginRight: "20%",
  },
});

/**
 * Post creation Screen.
 * A *title* is required and the *description* is optional
 */
export default function PostDraft({ route }) {
  const navigation = useNavigation();
  const history = useNavigationState((state) => state.routes);
  const [publicMode, setPublicMode] = useState(true);
  const [matureMode, setMatureMode] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const handlePost = () => {
      if (!title) return;
      setLoading(true);
      uploadImage(route.params.image.base64, title, description)
        .then((data) => {
          if (publicMode) shareImage(data.id, title, matureMode);
          navigation.navigate({ key: history[0].key });
        })
        .catch((err) => {
          console.log(err?.response?.data);
          setLoading(false);
        });
    };
    navigation.setOptions({
      header: (props) => <CustomNavigationBarAlt {...props} />,
      title: " ",
      CustomRight: () => (
        <TouchableOpacity onPress={handlePost} style={{ paddingRight: 16 }}>
          <Text style={{ color: "#fff", ...globalStyles.titleText }}>
            {loading ? "Loading" : "Post"}
          </Text>
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    navigation,
    history,
    loading,
    title,
    description,
    matureMode,
    publicMode,
  ]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        alignItems: "center",
        flex: 1,
        backgroundColor: Color.dark.background,
      }}
      extraScrollHeight={Dimensions.window.height * 0.05}
    >
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <TextInput
            placeholder="Post Title (required)"
            keyboardType="default"
            returnKeyType="done"
            multiline
            blurOnSubmit
            value={title}
            onSubmitEditing={() => Keyboard.dismiss()}
            numberOfLines={3}
            style={styles.titleInput}
            placeholderTextColor="#a0a1a3"
            onChangeText={(text) => setTitle(text)}
          />
          <View style={styles.checkboxArea}>
            <View style={styles.checkboxZone}>
              <Text style={styles.textCheckboxZone}>Public</Text>
              <CheckBox
                checked={publicMode}
                onPress={() => setPublicMode(!publicMode)}
              />
            </View>
            <View
              style={{
                borderColor: "#2e3034",
                borderWidth: 1,
                marginVertical: 1,
              }}
            />
            <View style={styles.checkboxZone}>
              <Text style={styles.textCheckboxZone}>Mature</Text>
              <CheckBox
                checked={matureMode}
                onPress={() => setMatureMode(!matureMode)}
              />
            </View>
          </View>
        </View>
        <UploadPictureCard
          uri={route.params.image.uri}
          width={route.params.image.width}
          height={route.params.image.height}
          type={route.params.image.type}
          description={description}
          setDescription={setDescription}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
