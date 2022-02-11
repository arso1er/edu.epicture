import { useState, useEffect } from "react";
import { searchGallery } from "../network/gallery";

export default function useFeedSearch() {
  const [searchString, setSearchString] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadGallery = async () => {
      setLoading(true);
      setImages([]);
      const gallery = await searchGallery(searchString, 1);
      if (gallery) setImages(gallery);
      setLoading(false);
    };
    if (searchString) loadGallery();
  }, [searchString]);

  const handleRefresh = async () => {
    setRefreshing(true);
    const gallery = await searchGallery(searchString, page + 1);
    if (gallery) {
      setImages([]);
      setImages(gallery);
      setPage(page + 1);
    }
    setRefreshing(false);
  };

  const loadNewPage = async () => {
    const gallery = await searchGallery(searchString, page + 1);
    if (gallery) {
      setImages([...images, ...gallery]);
      setPage(page + 1);
    }
  };
  return {
    loading,
    images,
    searchString,
    refreshing,
    handleRefresh,
    loadNewPage,
    setSearchString,
  };
}
