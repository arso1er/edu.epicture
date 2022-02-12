import axios from "axios";
// import FormData from 'form-data';
// import { getAuthToken, getUsername } from '../utils/auth';
import { getAuthToken, getUsername } from "../components/context/UserContext";
// import Gallery from '../types/gallery';
// import Favorite from '../types/favorite';
// import Image from '../types/image';
// import Comment from '../types/comment';
// import UserBase from '../types/userBase';
// import Settings from '../types/settings';

export async function getUserFavorite() {
  // const data = new FormData();
  const username = await getUsername();
  const token = await getAuthToken();

  const config = {
    method: "get",
    url: `https://api.imgur.com/3/account/${username}/favorites`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // data,
  };
  const ret = await axios(config);
  const res = [];

  ret.data.data.forEach((item) =>
    res.push({
      id: item.id,
      favorite: item.favorite,
      ups: item.ups,
      comment_count: item.comment_count,
      favorite_count: item.favorite_count,
      vote: item.vote,
      views: item.views,
      account_url: item.account_url,
      title: item.title,
      cover: item.cover,
      description: item.description,
      link: `https://i.imgur.com/${item.cover}.${
        item.type === "video/mp4" ? "mp4" : "jpg"
      }`,
      width: item.width,
      height: item.height,
      type: item.type,
      is_album: item.is_album,
    })
  );
  return res;
}

export async function getUserBase() {
  // const data = new FormData();
  const username = await getUsername();
  const token = await getAuthToken();

  const config = {
    method: "get",
    url: `https://api.imgur.com/3/account/${username}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // data,
  };
  const ret = await axios(config);
  return ret.data.data;
}

export async function getUserSubmissions() {
  // const data = new FormData();
  const username = await getUsername();
  const token = await getAuthToken();

  const config = {
    method: "get",
    url: `https://api.imgur.com/3/account/${username}/submissions`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // data,
  };
  const ret = await axios(config);
  const res = [];

  ret.data.data.forEach((item) =>
    res.push({
      id: item.id,
      favorite: item.favorite,
      ups: item.ups,
      comment_count: item.comment_count,
      favorite_count: item.favorite_count,
      vote: item.vote,
      views: item.views,
      account_url: item.account_url,
      title: item.title,
      cover: item.cover,
      is_album: item.is_album,
      description: item.is_album
        ? item.images[0].description
        : item.description,
      width: item.is_album ? item.images[0].width : item.width,
      height: item.is_album ? item.images[0].height : item.height,
      type: item.is_album ? item.images[0].type : item.type,
      link: item.is_album
        ? `https://i.imgur.com/${item.cover}.${
            (item.is_album ? item.images[0].type : item.type) === "video/mp4"
              ? "mp4"
              : "jpg"
          }`
        : item.link,
    })
  );
  return res;
}

export async function getUserComments() {
  // const data = new FormData();
  const username = await getUsername();
  const token = await getAuthToken();

  const config = {
    method: "get",
    url: `https://api.imgur.com/3/account/${username}/comments`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // data,
  };
  const ret = await axios(config);
  return ret.data.data;
}

export async function getUserSettings() {
  // const data = new FormData();
  const token = await getAuthToken();

  const config = {
    method: "get",
    url: "https://api.imgur.com/3/account/me/settings",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // data,
  };
  const ret = await axios(config);
  return ret.data.data;
}

export async function updateUserSettings(
  username,
  bio,
  messaging_enabled,
  public_images,
  show_mature,
  newsletter_subscribed
) {
  const data = new FormData();
  const token = await getAuthToken();
  const user = await getUsername();

  data.append("bio", bio);
  data.append("username", username);
  data.append("show_mature", show_mature);
  data.append("messaging_enabled", messaging_enabled);
  data.append("public_images", public_images);
  data.append("newsletter_subscribed", newsletter_subscribed);

  const config = {
    method: "put",
    url: `https://api.imgur.com/3/account/${user}/settings`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data,
  };
  const ret = await axios(config);
  return ret.data.data;
}
