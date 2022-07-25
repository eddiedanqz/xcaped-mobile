import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";

import TopHeader from "../components/TopHeader";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TopHeader
        lefttIcon="map-marker-check-outline"
        rightIcon="magnify"
        rightMethod={() => navigation.navigate("Search")}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
