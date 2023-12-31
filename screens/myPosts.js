import { RefreshControl, StyleSheet, View } from "react-native";
import RNMasonryScroll from "react-native-masonry-scrollview";
import { useNavigation } from "@react-navigation/native";
import PictureCard from "../components/PictureCard/SmallPictureCard";
import Color from "../constants/Colors";
import useSubmissions from "../hooks/useSubmissions";
import { ActivityIndicator, Colors } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.dark.background,
  },
});

/**
 * DIsplay the user public posts
 * Posts can be removed by pressing the trash icon
 */
export default function SubmissionsScreen() {
  const navigation = useNavigation();
  const { loading, images, refreshing, handleSuppress, handleRefresh } =
    useSubmissions();

  return (
    <View style={{ ...styles.container }}>
      {loading ? (
        <ActivityIndicator
          size={60}
          style={{ marginTop: 32 }}
          animating={true}
          color={Colors.blue800}
        />
      ) : (
        <RNMasonryScroll
          columns={2}
          oddColumnStyle={{ marginLeft: 2, marginRight: 5 }}
          evenColumnStyle={{ marginLeft: 8, marginRight: 2 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          showsHorizontalScrollIndicator={false}
        >
          {images.map((item, index) => (
            <PictureCard
              key={index.toString()}
              style={{
                marginTop: index < 2 ? 10 : 0,
                marginBottom: 5,
              }}
              onPress={() =>
                navigation.navigate("PhotoDetails", { data: item })
              }
              onSuppress={() => handleSuppress(item.deletehash)}
              id={item.id}
              width={item.width}
              height={item.height}
              ups={item.ups}
              link={item.link}
              type={item.type}
              title={item.title}
              cardType="submission"
            />
          ))}
        </RNMasonryScroll>
      )}
    </View>
  );
}
