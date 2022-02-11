import axios from "axios";
import { getAuthToken } from "../components/context/UserContext";

export async function faveAlbum(id) {
  // const data = new FormData();
  const token = await getAuthToken();

  const config = {
    method: "post",
    url: `https://api.imgur.com/3/album/${id}/favorite`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // data,
  };

  await axios(config);
}

export async function voteAlbum(id, vote) {
  // const data = new FormData();
  const token = await getAuthToken();

  const config = {
    method: "post",
    url: `https://api.imgur.com/3/gallery/${id}/vote/${vote}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // data,
  };

  await axios(config);
}

export async function uploadAlbum(image_id, title, description, privacy) {
  const data = new FormData();
  const token = await getAuthToken();

  data.append("ids[]", [image_id]);
  data.append("title", title);
  data.append("description", description);
  data.append("privacy", privacy ? "public" : "hidden");
  data.append("cover", image_id);

  const config = {
    method: "post",
    url: "https://api.imgur.com/3/album",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  const ret = await axios(config);
  return ret.data.data;
}

export async function deleteAlbum(id) {
  // const data = new FormData();
  const token = await getAuthToken();

  const config = {
    method: "delete",
    url: `https://api.imgur.com/3/album/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // data,
  };

  await axios(config);
}
