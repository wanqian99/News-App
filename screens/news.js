import { View, Text, StyleSheet, Dimensions, TouchableNativeFeedback, Linking, Image } from 'react-native';
import React, { useContext } from 'react';
import { Entypo } from '@expo/vector-icons';
import { ThemeContext } from "../utils/ThemeManager.js"
import moment from 'moment';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// render each news item
const News = ({item, index}) => {
  // for the light/dark theme
  const { theme } = useContext(ThemeContext)

  // get how long ago the news was posted
  const time = moment(item.publishedAt || moment.now()).fromNow();
  // default image if the news does not have an image
  const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVGa04OI-Nz_WVhfGsDZy-lXU9Z2LwpWnvtQ&usqp=CAU';

  return (
    <View style={[styles.container, theme=='light' ? styles.lightContainer:styles.darkContainer]}>

      {/* News title */}
      <Text style={[styles.newsTitle, theme=='light' ? styles.lightText:styles.darkText]}>{item.title}</Text>

      {/* News image */}
      <Image
        source={{ uri: item.urlToImage || defaultImg }}
        style={styles.newsImg}
        resizeMode={'contain'}
      />

      {/* News description */}
      <Text style={[styles.newsDescription, theme=='light' ? styles.lightText:styles.darkText]}>
        {item.description || ""}
      </Text>

      {/* how long ago the news was published */}
      <View style={styles.newsPublishedTime}>
        <Entypo name="back-in-time" size={26} style={theme=='light' ? styles.lightText:styles.darkText}/>
        <Text style={[styles.newsPublished, theme=='light' ? styles.lightText:styles.darkText]}>
          {time}
        </Text>
      </View>

      {/* published date */}
      <Text style={[styles.newsPublished, theme=='light' ? styles.lightText:styles.darkText]}>
        Published on: {item.publishedAt}
      </Text>

      {/* News source */}
      <Text style={[styles.newsPublished, theme=='light' ? styles.lightText:styles.darkText]}>
        Source: {item.source.name.toUpperCase()}
      </Text>

      {/* navigate user to original news site when tapped */}
      <TouchableNativeFeedback useForeground onPress={() => Linking.openURL(item.url)}>
        <Text style={styles.readMoreNews}>Read more...</Text>
      </TouchableNativeFeedback>
    </View>
  )
}

export default News;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    // height: windowHeight,
    paddingVertical: 15,
    borderRadius: 10,
  },
  darkContainer: {
    backgroundColor: '#242424',
  },
  lightContainer: {
    backgroundColor: 'whitesmoke',
  },
  darkText: {
    color: "white"
  },
  lightText: {
    color: "black"
  },
  newsTitle: {
    alignSelf: 'flex-start',
    marginVertical: 10, //margin top, bottom
    marginHorizontal: 10, //margin left, right
    fontSize: 20,
    fontWeight: 'bold',
  },
  newsImg: {
    alignSelf: 'center',
    width: windowWidth,
    height: 230,
  },
  newsDescription: {
    marginHorizontal: 10, //margin left, right
    fontSize: 16,
    fontWeight: '500',
  },
  newsPublishedTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30, //margin top, bottom
    marginHorizontal: 10, //margin left, right
  },
  newsPublished: {
    marginHorizontal: 10, //margin left, right
    fontSize: 14,
  },
  readMoreNews: {
    color: "dodgerblue",
    marginHorizontal: 10, //margin left, right
    fontSize: 14,
    textDecorationLine: 'underline',
    paddingBottom: 10,
  },
});
