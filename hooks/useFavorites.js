import { useState, useEffect } from "react";
import { getUserFavorite } from "../network/user";
import { faveAlbum } from "../network/album";

export default function useFavorites() {
  const [images, setImages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadFavorite = async () => {
      setLoading(true);
      const favorites = await getUserFavorite();
      if (favorites) setImages(favorites);
      setLoading(false);
    };
    if (images.length === 0) loadFavorite();
  }, [images]);

  const handleUnFave = async (id) => {
    const oldImages = [...images];
    for (let index = 0; index < oldImages.length; index += 1) {
      if (oldImages[index].id === id) {
        oldImages.splice(index, 1);
        break;
      }
    }
    setImages(oldImages);
    await faveAlbum(id);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    const favorites = await getUserFavorite();
    if (favorites) {
      setImages([]);
      setImages(favorites);
    }
    setRefreshing(false);
  };
  return { loading, images, refreshing, handleUnFave, handleRefresh };
}
