import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Text, Icon } from "react-native-elements";
import tw, { useDeviceContext } from "twrnc";
import * as SecureStore from "expo-secure-store";

import TopHeader from "../../components/TopHeader";
import VerticalCard from "../../components/cards/VerticalCard";
import CascadedCard from "../../components/cards/CascadedCard";
import ImageCard from "../../components/cards/ImageCard";
import FilterModal from "../../components/search/FilterModal";
import { BASEURL } from "../../config/config";

const PlaceScreen = ({ navigation }) => {
  return <SafeAreaView style={tw`h-full bg-white`}>Add</SafeAreaView>;
};

export default PlaceScreen;
