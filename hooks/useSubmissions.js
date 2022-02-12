import { useState, useEffect } from "react";
import { getUserSubmissions } from "../network/user";
import { deleteImage } from "../network/image";
import { deleteAlbum } from "../network/album";

export default function useSubmissions() {
  const [images, setImages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSubmissions = async () => {
      setLoading(true);
      const submissions = await getUserSubmissions();
      if (submissions) setImages(submissions);
      setLoading(false);
    };
    if (images.length === 0) loadSubmissions();
  }, [images]);

  const handleSuppress = (deletehash) => {
    const oldImages = images ? [...images] : [];
    for (let index = 0; index < oldImages.length; index += 1) {
      if (oldImages[index].deletehash === deletehash) {
        if (oldImages[index].is_album) deleteAlbum(deletehash);
        else deleteImage(deletehash);
        oldImages.splice(index, 1);
        break;
      }
    }
    setImages(oldImages);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    const submissions = await getUserSubmissions();
    if (submissions) {
      setImages([]);
      setImages(submissions);
    }
    setRefreshing(false);
  };
  return { loading, images, refreshing, handleSuppress, handleRefresh };
}
