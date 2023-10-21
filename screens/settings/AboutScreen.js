import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Text,
} from "react-native";
import { Input, Icon } from "@rneui/themed";
import tw from "twrnc";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import List from "../../components/content/List";

const AboutScreen = ({ navigation }) => {
  useEffect(() => {}, []);

  return (
    <SafeAreaView style={tw`flex-1`}>
      {/*Header*/}
      <View
        style={tw`flex-row w-full h-14 items-center justify-between px-4 border-b border-gray-200`}
      >
        <TouchableOpacity
          style={tw`justify-center`}
          onPress={() => navigation.goBack()}
        >
          <Icon type="feather" name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={tw`text-black text-gray-700 text-base`}> </Text>
        </View>
        <TouchableOpacity></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={tw`p-5`}>
        <List
          title="Privacy Policy"
          titleStyle={tw`text-gray-600`}
          //onPress={() => navigation.navigate("Edit Profile")}
        />
        <List
          title="Terms & Conditions"
          titleStyle={tw`text-gray-600`}
          // onPress={() => navigation.navigate("Password")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
