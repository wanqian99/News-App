import { Text, View, StyleSheet, FlatList, Dimensions, Button, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import Carousel from 'react-native-snap-carousel';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemeContext } from "../utils/ThemeManager.js"
import { NewsContext } from "../API/context.js";
import News from './news.js';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Home = ({ navigation }) => {

  // for the light/dark theme
  const { theme } = useContext(ThemeContext);

  // active index of the news
  const [activeIndex, setActiveIndex] = useState();

  // get the articles
  const {
    news: { articles },
    newsType,
  } = useContext(NewsContext);

  // reference the carousel, for scroll to top button
  const carouselRef = useRef();

  return (
    <View style={[styles.container, theme=='light' ? styles.lightContainer:styles.darkContainer]}>

      {/* type of news */}
      <TouchableOpacity style={styles.newsTypeHeader} onPress={() => navigation.jumpTo('Discover')}>
        <Text style={styles.newsTypeText}>
          {newsType}
        </Text>
      </TouchableOpacity>


      {/* if there are articles */}
      {articles && (
        <Carousel
          ref = {carouselRef}
          layout={'default'}
          data={articles}
          extraData={articles}
          sliderHeight={300}
          itemHeight={windowHeight}
          vertical={true}
          // maps each article item
          renderItem={({item, index}) => (
            <View>
              <News item={item} index={index} style={[theme=='light' ? styles.lightContainer:styles.darkContainer]}/>
            </View>
          )}
          onSnapToItem={index => setActiveIndex(index)}
        />
      )}

      {/* scroll to top button */}
      <TouchableOpacity style={styles.toTopBtn} onPress={() => carouselRef.current.snapToItem(0)}>
        <MaterialCommunityIcons name="arrow-up-circle" size={35} color="#e91e63"/>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight,
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
  newsTypeHeader: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#e91e63",
    width: windowWidth,
  },
  newsTypeText: {
    color: "#e91e63",
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'italic',
    letterSpacing: 5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  toTopBtn: {
    position: 'absolute',
    bottom: "0%",
    right: "0%",
    marginRight: 20,
    marginBottom: 20,
    zIndex: 1,
  },
});
