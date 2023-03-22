import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useContext } from 'react';
import Carousel from 'react-native-snap-carousel';
import { ThemeContext } from "../utils/ThemeManager.js"
import { NewsContext } from "../API/context.js";
import { categories, sources } from "../API/api.js"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Categories = ({navigation}) => {

  const { theme } = useContext(ThemeContext);

  // get the categories
  const { setCategory, setSource } = useContext(NewsContext);

  // change the category, and navigate to all news page
  const goToCategoryNews = ({item}) => {
    setCategory(item.name);
    // reset the source, so that useEffect can be called when a new source is selected
    //else, if the selected source is the same as the previously selected source, useEffect would not be called, and the source news would not be shown
    setSource("");
    navigation.jumpTo('News');
  }

  // change the source, and navigate to all news page
  const goToSourceNews = ({item}) => {
    setSource(item.id);
    // reset the category, so that useEffect can be called when a new category is selected
    //else, if the selected category is the same as the previously category source, useEffect would not be called, and the category news would not be shown
    setCategory("");
    navigation.jumpTo('News');
  }

  return (
    <View style={[styles.container, theme=='light' ? styles.lightContainer:styles.darkContainer]} testID="CategoryScreen">

      {/* categories */}
      <View style={[styles.categoryContainer, theme=='light' ? styles.lightText:styles.darkText]}>
        <Text style={[styles.category, theme=='light' ? styles.lightText:styles.darkText]}>Category</Text>
      </View>
      <Carousel
        testID="CategoryCarousel"
        layout={'default'}
        data={categories}
        sliderWidth={windowWidth*0.95}
        itemWidth={150}
        // maps each category item
        renderItem={({item, index}) => (
          <TouchableOpacity style={styles.categoryCarousel}
                            onPress={() => goToCategoryNews({item})}>
            <Image source={{ uri: item.image }} style={styles.categoryImage}/>
            <Text style={[styles.categoryName, theme=='light' ? styles.lightText:styles.darkText]}>{item.name.toUpperCase()}</Text>
          </TouchableOpacity>
        )}
        activeSlideAlignment={"start"}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />

      {/* sources */}
      <View style={[styles.categoryContainer, theme=='light' ? styles.lightText:styles.darkText]}>
        <Text style={[styles.category, theme=='light' ? styles.lightText:styles.darkText]}>Sources</Text>
      </View>
      <View style={styles.sourcesContainer} testID="SourcesBtns">
        {sources.map((item) => (
          <TouchableOpacity
            onPress={() => goToSourceNews({item})}
            key={item.id}
            accessibilityRole={'imagebutton'}
          >
            <Image source={{ uri: item.image }} style={styles.sourceImage} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    // height: windowHeight,
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
  categoryContainer: {
    alignSelf: 'center',
    width: "90%",
    marginVertical: 10,
    paddingBottom: 3,
    borderBottomWidth: 5,
    borderBottomColor: "#e91e63",
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryCarousel: {
    alignSelf: 'center',
    marginLeft: 15,
    width: "85%",
    marginBottom: 20,
  },
  categoryImage: {
    marginVertical: 10,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: "#e91e63",
    width: 140,
    height: 110,
    resizeMode: "contain",
  },
  categoryName: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sourcesContainer: {
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'center',
    marginBottom: 100,
  },
  sourceImage: {
    width: 110,
    height: 110,
    resizeMode: "cover",
    margin: 5,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#e91e63",
  },
});
