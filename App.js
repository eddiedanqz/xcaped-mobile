import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { AuthProvider } from "./context/AuthContext";
import { FilterProvider } from "./context/filterContext";

import Routes from "./Routes";

// const Stack = createStackNavigator()
// const NavStack = createStackNavigator()

export default function App() {
  return (
    <AuthProvider>
      <FilterProvider>
        <Routes />
      </FilterProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
});
