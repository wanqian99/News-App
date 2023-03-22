import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import React, { useContext, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';

import { ThemeContext } from "../utils/ThemeManager.js"
import { NewsContext } from "../API/context.js";
import News from './news.js';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Search = ({ navigation }) => {

  const { theme } = useContext(ThemeContext);

  // get the articles
  const {
    news: { articles },
  } = useContext(NewsContext);

  const [searchResults, setSearchResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewedNews, setViewedNews] = useState();

  // default image if the news does not have an image
  const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVGa04OI-Nz_WVhfGsDZy-lXU9Z2LwpWnvtQ&usqp=CAU';

  // search function
  const searchForNews = (keyword) => {
    // if there is no search keyword, return
    if (!keyword) {
      setSearchResults([]);
      return;
    }
    setSearchResults(articles.filter((query) => query.title.includes(keyword)));
  };

  // make the news modal visible, and set the news to display
  const handleModal = (item) => {
    setModalVisible(true);
    setViewedNews(item);
  };

  // renders the search results
  const renderSearchResult = ({ item }) => (
    <TouchableOpacity style={styles.resultContainer} onPress={() => handleModal(item)}>
      <Image
        source={{ uri: item.urlToImage || defaultImg }}
        style={styles.newsImg}
        resizeMode={'cover'}/>
      <View style={styles.newsTitle}>
        <Text style={theme=='light' ? styles.lightText:styles.darkText}>
          {item.title}
        </Text>

        <View style={styles.newsPublishedTime}>
          <Entypo name="back-in-time" size={26} style={theme=='light' ? styles.lightText:styles.darkText}/>
          <Text style={[styles.newsPublished, theme=='light' ? styles.lightText:styles.darkText]}>
            {moment(item.publishedAt || moment.now()).fromNow()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, theme=='light' ? styles.lightContainer:styles.darkContainer]}>
      {/* search bar */}
      <TextInput
        testID="searchInput"
        placeholder="Search for news"
        placeholderTextColor= {theme=='light' ? "grey" : "#e91e63"}
        onChangeText={(keyword) => searchForNews(keyword)}
        style={[styles.searchBar, theme=='light' ? styles.lightText:styles.darkText]}
      />

      {/* show search results */}
      <View style={styles.searchResults} key={searchResults.id}>
        <FlatList
          testID="searchResult"
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View style={styles.modalContainer}>
        {/* news modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          {/* close modal */}
          <TouchableOpacity style={styles.closeModal}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Entypo name="circle-with-cross" size={45} color="#e91e63" />
          </TouchableOpacity>
          {/* display news modal */}
          <View style={styles.modal}>
            <News item={viewedNews} style={[theme=='light' ? styles.lightContainer:styles.darkContainer]}/>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  darkContainer: {
    backgroundColor: '#242424',
  },
  lightContainer: {
    backgroundColor: 'white',
  },
  darkText: {
    color: "white"
  },
  lightText: {
    color: "black"
  },
  searchBar: {
    width: "90%",
    borderWidth: 2,
    borderColor: "#e91e63",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    margin: 15,
  },
  resultContainer: {
    flex: 1,
    flexDirection: 'row',
    width: "90%",
    borderWidth: 2,
    borderColor: "#e91e63",
    borderRadius: 10,
    marginHorizontal: "5%",
    marginVertical: 5,
    padding: 15,
    fontWeight: 'bold',
  },
  newsImg: {
    width: "35%",
    marginRight: "5%",
    borderRadius: 5,
  },
  newsTitle: {
    width: "60%",
  },
  newsPublishedTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  newsPublished: {
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    // marginTop: "50%",
    justifyContent: "center",
    height: "100%",
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  closeModal: {
    position: 'absolute',
    alignSelf: "center",
    bottom: "10%",
    zIndex: 1,
  },
});
