import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { Input } from "@rneui/themed";
import tw from "twrnc";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AuthContext } from "../../context/AuthContext";
import TextButton from "../../components/buttons/TextButton";
import { logo } from "../../utils/helpers";
import { COLORS } from "../../constants/theme";
import { requestValidator } from "../../utils/utils";

const LoginScreen = ({ navigation }) => {
  const {
    passwordReset,
    errorData,
    setData,
    isVisible,
    setIsVisible,
    success,
    setSuccess,
    isLoading,
    setLoading,
  } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");

  let error = {};
  if (isVisible) {
    let first = requestValidator(errorData);

    error = first;
    console.log(error);
  }

  const clearError = () => {
    if (isVisible) {
      setTimeout(() => {
        setIsVisible(false);
        setData([]);
        error = {};
      }, 5000);
    }
  };

  useEffect(() => {
    clearError();
  }, [isVisible, success]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center`}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAwareScrollView
        keyboardDismissMode="interactive"
        style={tw`w-full`}
        contentContainerStyle={tw`flex-1 justify-center items-center p-1`}
      >
        <View style={tw`mb-3 justify-center`}>
          <Image style={tw`w-28 h-28`} source={logo} resizeMode="contain" />
        </View>
        <View style={tw`flex justify-center items-center p-2 mb-5`}>
          <Text style={tw`text-base`}>
            Just let us know your email address and we will email you a password
            reset link that will allow you to choose a new one.
          </Text>
        </View>

        <View style={tw`flex flex-row justify-center items-center p-2 mb-2`}>
          <Text style={tw`text-sm text-green-400`}>{success}</Text>
        </View>

        <Input
          placeholder="Email"
          textContentType="emailAddress"
          onChangeText={(val) => setEmail(val)}
          containerStyle={tw`w-full px-4`}
          errorMessage={error.email}
        />
        {/*Button*/}
        <TextButton
          label="Send"
          buttonContainerStyle={tw`h-12 rounded w-6/12 my-6`}
          onPress={() => passwordReset({ email })}
        />

        <Text
          style={tw`text-[${COLORS.primary}] ml-1`}
          onPress={() => navigation.navigate("LogIn")}
        >
          {" "}
          Back
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
