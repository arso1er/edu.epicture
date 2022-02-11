import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { globalStyles } from "../styles/global";
import { useState } from "react";
import useFeedSearch from "../hooks/useFeedSearch";
import PictureCard from "../components/PictureCard/BigPictureCard";
import { ActivityIndicator, Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: Color.dark.background,
  // },
  searchBar: {
    padding: 5,
    alignItems: "center",
    justifyContent: "space-around",
    // width: Dimensions.window.width * 0.9,
    // height: "75%",
    backgroundColor: "#fff",
    marginBottom: 5,
    borderRadius: 50,
    flexDirection: "row",
  },
  titleInput: {
    fontSize: 17,
    width: "85%",
    height: "100%",
    marginLeft: 5,
    color: "#333",
    textAlignVertical: "center",
    borderRadius: 5,
  },
});

const SearchBar = ({ onValidate }) => {
  const [searchString, setSearchString] = useState("");

  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Search Imgur"
        keyboardType="default"
        returnKeyType="done"
        blurOnSubmit
        value={searchString}
        onSubmitEditing={() => {
          onValidate(searchString);
          Keyboard.dismiss();
        }}
        style={styles.titleInput}
        placeholderTextColor="#b9d3dc"
        onChangeText={(t) => setSearchString(t)}
      />
      <AntDesign size={20} name="search1" color="#333" />
    </View>
  );
};

export default function Search() {
  const navigation = useNavigation();

  const {
    loading,
    images,
    refreshing,
    handleRefresh,
    loadNewPage,
    setSearchString,
  } = useFeedSearch();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyles.container}>
        <SearchBar onValidate={setSearchString} />
        {loading ? (
          <ActivityIndicator
            size={60}
            style={{ marginTop: 32 }}
            animating={true}
            color={Colors.blue800}
          />
        ) : (
          <FlatList
            data={images}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            keyExtractor={(item, index) => `${index}`}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            windowSize={10}
            onEndReached={() => loadNewPage()}
            renderItem={({ item }) => (
              <PictureCard
                onPress={() => {
                  // console.log(item);
                  navigation.navigate("PhotoDetails", { data: item });
                }}
                id={item.id}
                width={item.width}
                height={item.height}
                favorite={item.favorite}
                ups={item.ups}
                comment_count={item.comment_count}
                favorite_count={item.favorite_count}
                vote={item.vote}
                link={item.link}
                views={item.views}
                account_url={item.account_url}
                type={item.type}
                title={item.title}
                description={item.description}
              />
            )}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
