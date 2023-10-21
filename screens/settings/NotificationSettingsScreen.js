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

import { BASEURL } from "../../config/config";
import Section from "../../components/content/Section";
import { requestValidator } from "../../utils/utils";

const NotificationSettingsScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidator] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

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
          `${BASEURL}/api/profile/password`,
          {
            oldPassword,
            password,
          },
          config
        )
        .then((res) => {
          console.log(res.data);
          setValidator(res.data);
          setIsVisible(true);
          if (res.data.message === "Password Updated") {
            setOldPassword("");
            setPassword("");
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          setValidator(err.response.data);
          setIsVisible(true);
        });
    });
  };

  let error = {};
  if (isVisible) {
    let first = requestValidator(validation);

    error = first;
    // console.log(error);
  }

  const clearError = () => {
    if (isVisible) {
      setTimeout(() => {
        setIsVisible(false);
        setValidator([]);
      }, 5000);
    }
  };

  useEffect(() => {
    clearError();
  }, [isVisible]);

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
        <Section containerStyle={tw`mb-3`}>
          {isVisible && (
            <View
              style={tw`flex flex-row justify-center items-center p-2 mb-2`}
            >
              <Text style={tw`text-base text-green-500`}>{error.message}</Text>
            </View>
          )}

          <Input
            placeholder="Old Password"
            textContentType="password"
            secureTextEntry={!showOldPassword}
            onChangeText={(val) => setOldPassword(val)}
            containerStyle={tw`w-full px-4`}
            errorMessage={error.oldPassword}
            defaultValue={oldPassword}
            rightIcon={
              <Icon
                type="feather"
                name={showOldPassword ? "eye" : "eye-off"}
                size={20}
                color="gray"
                onPress={() => setShowOldPassword(!showOldPassword)}
              />
            }
          />

          <Input
            placeholder="New Password"
            textContentType="password"
            secureTextEntry={!showPassword}
            onChangeText={(val) => setPassword(val)}
            containerStyle={tw`w-full px-4`}
            errorMessage={error.password}
            defaultValue={password}
            rightIcon={
              <Icon
                type="feather"
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="gray"
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationSettingsScreen;
