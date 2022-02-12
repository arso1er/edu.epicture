import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

export function useImagePicker() {
  const [rollHasPermission, setRollHasPermission] = useState(0);

  useEffect(() => {
    (async () => {
      const imagePerm = await ImagePicker.getMediaLibraryPermissionsAsync();
      setRollHasPermission(imagePerm.status === "granted" ? 1 : -1);
    })();
  }, []);

  const AllowCameraRoll = async () => {
    if (Platform.OS === "ios") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setRollHasPermission(status === "granted" ? 1 : -1);
    }
  };

  return async () => {
    if (rollHasPermission === -1) await AllowCameraRoll();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: true,
    });
    return result.cancelled ? null : result;
  };
}
