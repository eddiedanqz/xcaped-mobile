import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { Icon, Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { StatusBar } from "expo-status-bar";
import SafeAreaView from "react-native-safe-area-view";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import Reactions from "../../components/Reactions";
import Section from "../../components/content/Section";
import ReactionModal from "../../components/search/ReactionModal";
import TextButton from "../../components/buttons/TextButton";
import { BASEURL } from "@env";
import { noImage } from "../../utils/helpers";

const PlaceScreen = () => {
  return <div>PlaceScreen</div>;
};

export default PlaceScreen;
