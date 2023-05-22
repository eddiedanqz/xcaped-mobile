import React, { Fragment, useState, useEffect } from "react";
import {
  Pressable,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Keyboard,
} from "react-native";
import { Icon, Input, BottomSheet, ListItem } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import base64 from "react-native-base64";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { BASEURL } from "@env";
import TextButton from "../../components/buttons/TextButton";

const AddScreen = () => {
  const renderLogo = () => {};
  const renderName = () => {};
  const renderType = () => {};
  const renderOpenDays = () => {};
  const renderLocation = () => {};
  const renderContact = () => {};
  const render = () => {};

  return <Text>AddScreen</Text>;
};

export default AddScreen;
