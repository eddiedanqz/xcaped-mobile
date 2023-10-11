import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Text,
} from "react-native";
import { Input, Icon } from "react-native-elements";
import tw from "twrnc";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { BASEURL } from "../../config/config";
import Section from "../../components/content/Section";
import Validator from "../../components/errors/Validator";

const SettingsScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState([]);
  const [isError, setIsError] = useState(false);

  const updatePaswword = () => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Authorization: `Bearer ${parsed}`,
        },
      };

      axios
        .post(
          `${BASEURL}/api/profile/update`,
          {
            fullname,
            username,
            email,
            bio,
            location,
          },
          config
        )
        .then((res) => {
          console.log(res.data);
          setError(res.data);
          setIsError(true);
        })
        .catch((err) => {
          console.log(err.response.data);
          setError(err.response.data);
          setIsError(true);
        });
    });
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      {/*Header*/}
      <View
        style={tw`flex-row w-full h-16 items-center justify-between mt-6 px-3 z-20`}
      >
        <TouchableOpacity
          style={tw`justify-center`}
          onPress={() => navigation.goBack()}
        >
          <Icon type="feather" name="x" size={20} color="#ff8552" />
        </TouchableOpacity>
        <View>
          <Text style={tw`text-black text-gray-700 text-base`}>
            {" "}
            Edit Password
          </Text>
        </View>
        <TouchableOpacity onPress={() => updatePaswword()}>
          <Text style={[tw`text-base`, { color: "#ff8552" }]}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={tw`p-5`}>
        <Section containerStyle={tw`mb-3 p-3`}>
          <View style={tw`p-1 items-center justify-center`}>
            <Input
              placeholder="Old Password"
              textContentType="password"
              onChangeText={(pass) => setPassword(pass)}
            />
          </View>

          <View style={tw` p-1 items-center justify-center`}>
            <Input
              placeholder="New Password"
              textContentType="password"
              onChangeText={(pass) => setEmail(pass)}
            />
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
