import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Text,
} from "react-native";
import { Icon } from "@rneui/themed";
import tw from "twrnc";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";

import List from "../../components/content/List";

const HelpScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync("http://127.0.0.1:8000/");
    setResult(result);
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={tw`flex-1`}>
      {/*Header*/}
      <View
        style={tw`flex-row w-full h-14 items-center justify-between px-4 border-b border-gray-200`}
      >
        <TouchableOpacity
          style={tw`justify-center p-2`}
          onPress={() => navigation.goBack()}
        >
          <Icon type="feather" name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-black text-base`}>Help </Text>
        <TouchableOpacity></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={tw`p-5`}>
        <List
          title="Feedback"
          titleStyle={tw`text-gray-600`}
          onPress={_handlePressButtonAsync}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpScreen;
