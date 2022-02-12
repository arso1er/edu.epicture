import axios from "axios";
// import FormData from "form-data";
// import { getAuthToken } from "../utils/auth";
import { getAuthToken } from "../components/context/UserContext";

export async function uploadImage(image_url, title, description) {
  // const data = new FormData();
  const token = await getAuthToken();
  const dataObj = { image: image_url, title, description };
  const data = Object.entries(dataObj)
    .map((pair) => `${pair[0]}=${encodeURIComponent(pair[1])}`)
    .join("&");

  // data.append("image", image_url);
  // data.append("title", title);
  // data.append("description", description);
  // data.append("type", "base64");
  // data.append("name", "image");

  // Display the key/value pairs
  // for (var pair of data.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }
  // console.log(data);

  // const config = {
  //   method: "post",
  //   url: "https://api.imgur.com/3/image",
  //   headers: {
  //     "content-type": "multipart/form-data",
  //     // Accept: "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  //   data,
  // };

  const config = {
    method: "post",
    url: "https://api.imgur.com/3/image",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    data, //: `image=${image_url}`,
  };

  const ret = await axios(config);
  return ret.data.data;
}

export async function shareImage(image_id, title, mature) {
  // const data = new FormData();
  const token = await getAuthToken();
  const dataObj = { title, mature: mature ? 0 : 1 };
  const data = Object.entries(dataObj)
    .map((pair) => `${pair[0]}=${encodeURIComponent(pair[1])}`)
    .join("&");

  // data.append("title", title);
  // data.append("mature", mature ? 0 : 1);

  const config = {
    method: "post",
    url: `https://api.imgur.com/3/gallery/image/${image_id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  const ret = await axios(config);
  return ret.data.data;
}

export async function deleteImage(id) {
  // const data = new FormData();
  const token = await getAuthToken();

  const config = {
    method: "delete",
    url: `https://api.imgur.com/3/image/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // data,
  };

  await axios(config);
}
