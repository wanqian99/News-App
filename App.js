import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer} from '@react-navigation/native';

import NavTabs from "./components/bottomTabs.js"
import Context from "./API/context.js"


// temporary remove warnings
import {LogBox} from "react-native";

LogBox.ignoreLogs([
"ViewPropTypes will be removed",
"ColorPropType will be removed",
])


function App() {
  return (
    <NavigationContainer>
      <NavTabs />
    </NavigationContainer>
  );
}


export default () => {
  return (
    <Context>
      <App />
    </Context>
  );
};
