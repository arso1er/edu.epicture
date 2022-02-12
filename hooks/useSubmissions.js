import { useState, useEffect } from "react";
import { getUserSubmissions } from "../network/user";
import { deleteImage } from "../network/image";
import { deleteAlbum } from "../network/album";

export default function useSubmissions() {
  const [images, setImages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const loadSubmissions = async () => {
      const submissions = await getUserSubmissions();
      if (submissions) setImages(submissions);
    };
    if (images.length === 0) loadSubmissions();
  }, [images]);

  const handleSuppress = (id) => {
    const oldImages = images ? [...images] : [];
    for (let index = 0; index < oldImages.length; index += 1) {
      if (oldImages[index].id === id) {
        if (oldImages[index].is_album) deleteAlbum(id);
        else deleteImage(id);
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
  return { images, refreshing, handleSuppress, handleRefresh };
}
