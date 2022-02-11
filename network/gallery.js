import axios from "axios";
// import { getAuthToken, AUTH_CLIENT_ID } from "../utils/auth";
import { getAuthToken } from "../components/context/UserContext";
// import { IMGUR_API_CLIENT_ID } from "@env";

// export async function getGallery({ section, sort, page, window }) {
//   const data = new FormData();

//   const config = {
//     method: "get",
//     url: `https://api.imgur.com/3/gallery/${section}/${sort}/${window}/${page}`,
//     headers: {
//       Authorization: `Client-ID ${AUTH_CLIENT_ID}`,
//     },
//     data,
//   };
//   const ret = await axios(config);
//   const res = [];

//   ret.data.data.forEach((item) =>
//     res.push({
//       id: item.id,
//       favorite: item.favorite,
//       ups: item.ups,
//       comment_count: item.comment_count,
//       favorite_count: item.favorite_count,
//       vote: item.vote,
//       views: item.views,
//       account_url: item.account_url,
//       title: item.title,
//       cover: item.cover,
//       is_album: item.is_album,
//       description: item.is_album
//         ? item.images[0].description
//         : item.description,
//       link: item.is_album ? item.images[0].link : item.link,
//       width: item.is_album ? item.images[0].width : item.width,
//       height: item.is_album ? item.images[0].height : item.height,
//       type: item.is_album ? item.images[0].type : item.type,
//     })
//   );

//   return res;
// }

export async function searchGallery(query, page) {
  const token = await getAuthToken();

  const config = {
    method: "get",
    url: `https://api.imgur.com/3/gallery/search/viral/all/${page}?q=${query}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
      link: item.is_album ? item.images[0].link : item.link,
      width: item.is_album ? item.images[0].width : item.width,
      height: item.is_album ? item.images[0].height : item.height,
      type: item.is_album ? item.images[0].type : item.type,
    })
  );

  return res;
}

// export async function getGalleryComments(hash) {
//   const data = new FormData();
//   const token = await getAuthToken();

//   const config = {
//     method: "get",
//     url: `https://api.imgur.com/3/gallery/${hash}/comments/`,
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     data,
//   };
//   const ret = await axios(config);
//   return ret.data.data;
// }
