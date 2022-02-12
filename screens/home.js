import axios from "axios";
import { Text, View, FlatList } from "react-native";
import { Card, ActivityIndicator, Colors } from "react-native-paper";
import { globalStyles } from "../styles/global";
import { useEffect, useState } from "react";
import { IMGUR_API_CLIENT_ID } from "@env";

export default function Home() {
  const [topImages, setTopImages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: "https://api.imgur.com/3/gallery/search/top/day?q=funny&q_type=jpg",
      headers: {
        "content-type": "application/json",
        Authorization: `Client-ID ${IMGUR_API_CLIENT_ID}`,
      },
    })
      .then((res) => {
        const newImages = [];
        for (let i = 0; i < 8; i++) {
          const element = res.data.data[i];
          newImages.push(element);
        }
        // console.log(res.data.data);
        // console.log(newImages.length);
        setTopImages(newImages);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => setLoading(false));
  }, []);

  return (
    <View style={{ ...globalStyles.container }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ ...globalStyles.titleText }}>Welcome to ePicture</Text>
        <Text style={{ ...globalStyles.regularText, textAlign: "center" }}>
          The ultimate online photo sharing platform.
        </Text>
      </View>

      <View style={{ ...globalStyles.flex_1, marginTop: 16 }}>
        <Text style={{ ...globalStyles.titleText, marginBottom: 10 }}>
          Top rated photos
        </Text>
        {loading ? (
          <ActivityIndicator animating={true} color={Colors.blue800} />
        ) : (
          <FlatList
            data={topImages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              if (!item.is_album) {
                return (
                  <Card style={{ marginBottom: 12 }}>
                    <Card.Title title={item.title} />
                    <Card.Cover source={{ uri: item.link }} />
                    {/* <Card.Actions>
                      <Text style={{ ...globalStyles.regularText }}>
                        {item.views} views
                      </Text>
                    </Card.Actions> */}
                  </Card>
                );
              } else {
                return (
                  <Card style={{ marginBottom: 12 }}>
                    <Card.Title title={item.title} />
                    <Card.Cover source={{ uri: item.images[0].link }} />
                    {/* <Card.Actions>
                      <Text style={{ ...globalStyles.regularText }}>
                        {item.views} views
                      </Text>
                    </Card.Actions> */}
                  </Card>
                );
              }
            }}
          />
        )}
      </View>
    </View>
  );
}
