import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
} from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
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

const SearchBar = ({ onValidate, onFilterPress, sort, window }) => {
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
          onValidate(`/${sort}/${window}|${searchString}`);
          Keyboard.dismiss();
        }}
        style={styles.titleInput}
        placeholderTextColor="#b9d3dc"
        onChangeText={(t) => setSearchString(t)}
      />
      <AntDesign size={20} name="filter" color="#333" onPress={onFilterPress} />
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

  const [modalOpen, setModalOpen] = useState(false);
  const [sort, setSort] = useState("viral");
  const [window, setWindow] = useState("all");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ ...globalStyles.container }}>
        <Modal
          isVisible={modalOpen}
          onBackButtonPress={() => setModalOpen(false)}
          onBackdropPress={() => setModalOpen(false)}
        >
          <View
            style={{ backgroundColor: "#fff", padding: 16, borderRadius: 10 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ ...globalStyles.titleText, color: "#333" }}>
                Search filters
              </Text>
              <AntDesign
                size={20}
                name="closecircleo"
                color="#333"
                onPress={() => setModalOpen(false)}
              />
            </View>

            <View>
              <Text
                style={{
                  ...globalStyles.titleText,
                  color: "#333",
                  fontSize: 16,
                  marginTop: 16,
                }}
              >
                Sort
              </Text>
              <Picker
                style={{ backgroundColor: "#eee" }}
                selectedValue={sort}
                onValueChange={(itemValue, itemIndex) => setSort(itemValue)}
              >
                <Picker.Item label="Time" value="time" />
                <Picker.Item label="Viral" value="viral" />
                <Picker.Item label="Top" value="top" />
              </Picker>

              <Text
                style={{
                  ...globalStyles.titleText,
                  color: "#333",
                  fontSize: 16,
                  marginTop: 16,
                }}
              >
                Window
              </Text>
              <Picker
                style={{ backgroundColor: "#eee" }}
                selectedValue={window}
                onValueChange={(itemValue, itemIndex) => setWindow(itemValue)}
              >
                <Picker.Item label="All" value="all" />
                <Picker.Item label="Day" value="day" />
                <Picker.Item label="Week" value="week" />
                <Picker.Item label="Month" value="month" />
                <Picker.Item label="Year" value="year" />
              </Picker>
            </View>
          </View>
        </Modal>
        <SearchBar
          onValidate={setSearchString}
          onFilterPress={() => setModalOpen(true)}
          sort={sort}
          window={window}
        />
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
