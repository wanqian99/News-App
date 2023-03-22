import React, { useState, useContext } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import Home from "../screens/homeScreen.js"
import Categories from "../screens/categoriesScreen.js"
import Search from "../screens/searchScreen.js"
import { ThemeProvider, ThemeContext } from '../utils/ThemeManager.js'
import { NewsContext } from "../API/context.js";

export default function NavTabs() {

  const Tab = createBottomTabNavigator();

  const ToggleIcon = () => {
    // to toggle the theme
    const { toggleTheme } = useContext(ThemeContext);

    // to get the value of the current theme
    const { theme } = useContext(ThemeContext)
    return (
      <View>
        <TouchableOpacity style={styles.toggletheme} onPress={() => toggleTheme()}>
          <MaterialCommunityIcons name="theme-light-dark" size={30} color="#e91e63"/>
          <Text style={styles.toggletext}>{theme}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // when the button is clicked, it calls fetchNews() from context.js,
  // which fetches data agaon from the api. This refreshed the news
  const RefreshBtn = () => {
    const { fetchNews, fetchNewsfromSource, refreshType } = useContext(NewsContext);

    // this function determines the type of news to refresh, cateogory/source news
    // it refreshes the news based on the refreshType
    const refreshNews = () => {
      if (refreshType == "category") {
        console.log("refreshing category news");
        fetchNews();
      }
      else if (refreshType == "source") {
        console.log("refreshing source news");
        fetchNewsfromSource();
      }
    }

    return (
      <TouchableOpacity style={styles.refreshBtn} onPress={() => refreshNews()}>
        <FontAwesome name="refresh" size={26} color="#e91e63" />
      </TouchableOpacity>
    );
  }


  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: '#e91e63',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: { fontSize: 12 },
          }}
        >
        <Tab.Screen
          name="Discover"
          component={Categories}
          options={{
            tabBarLabel: 'Categories',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="collage" color={color} size={24} />
            ),
            headerLeft: () => (
              <ToggleIcon/>
            ),
          }}
        />
          <Tab.Screen
            name="News"
            component={Home}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" color={color} size={30} />
              ),
              headerLeft: () => (
                <ToggleIcon/>
              ),
              headerRight: () => (
                <RefreshBtn />
              ),
            }}
          />
          <Tab.Screen
            name="Search News"
            component={Search}
            options={{
              tabBarLabel: 'Search',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="search" color={color} size={24} />
              ),
              headerLeft: () => (
                <ToggleIcon/>
              ),
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </ThemeProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggletheme: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  toggletext: {
    marginLeft: 10,
    fontSize: 18,
    textTransform: "capitalize",
  },
  refreshBtn: {
    marginRight: 20,
  },
});
