import axios from 'axios';
import React, { createContext, useEffect, useState } from "react";
import { getNewsAPI, getSourceAPI } from "./api.js";

export const NewsContext = createContext();

export const Context = ({ children }) => {
  const [news, setNews] = useState([]);

  // used in categoriesScreen, to set the category/source of the news
  const [category, setCategory] = useState("general");
  const [source, setSource] = useState();

  // to display the type of news shown on the home page
  const [newsType, setNewsType] = useState();

  // to determine the type of news to refresh (which fetch news function to call)
  const [refreshType, setRefreshType] = useState();

  // fetch news by the category
  const fetchNews = async () => {
    // get the news by the category, and setNews to data
    const { data } = await axios.get(getNewsAPI(category));
    setNews(data);

    // set the category to the news type
    setNewsType(category);

    // set the type of news to refresh to be category
    setRefreshType("category");
    // console.log("fetched category: ", category);
  };

  const fetchNewsfromSource = async () => {
    try {
      // get the news by the source, and setNews to data
      const { data } = await axios.get(getSourceAPI(source));
      setNews(data);

      // since source doesnt have a default state, it might be undefined when the user hasn't select a source
      // (i didn't set a default source as i wanted the home page to display general news category when the app first loads)
      // this if statement checks for it, and calls fetchNews instead to get the category
      if(source == undefined) {
        // console.log("no source selected, fetch category news instead");
        fetchNews();
      }
      else {
        // set the source to the news type
        setNewsType(source);
        // set the type of news to refresh to be source
        setRefreshType("source");
        // console.log("fetched source: ", source);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //use effect will be fired once when app loads, and when category changes
  useEffect(() => {
    // in categoriesScreen, category is reset to "" when source is selected
    // here, i am checking if there is a category selected, instead of the ""
    if(category != "") {
      fetchNews();
    }
  }, [category]);

  //use effect will be fired once when app loads, and when source changes
  useEffect(() => {
    // in categoriesScreen, source is reset to "" when category is selected
    // here, i am checking if there is a source selected, instead of the ""
    if(source != "") {
        fetchNewsfromSource();
    }
  }, [source]);

  return (
    <NewsContext.Provider
      value = {{
        news,
        fetchNews,
        fetchNewsfromSource,
        setCategory,
        category,
        setSource,
        newsType,
        refreshType,
        setNews,
        setNewsType,
        setRefreshType,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export default Context;
