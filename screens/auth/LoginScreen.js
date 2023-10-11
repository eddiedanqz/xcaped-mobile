import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import { Input } from "@rneui/themed";
import tw from "twrnc";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AuthContext } from "../../context/AuthContext";
import TextButton from "../../components/buttons/TextButton";
import { logo } from "../../utils/helpers";
import { requestValidator } from "../../utils/utils";
import { COLORS } from "../../constants/theme";

const LoginScreen = ({ navigation }) => {
  const { signIn, errorData, setData, isVisible, setIsVisible } =
    React.useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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
  }, [isVisible]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAwareScrollView
        keyboardDismissMode="interactive"
        style={tw`w-full`}
        contentContainerStyle={tw`flex-1 justify-center items-center p-1`}
      >
        <View style={tw`mb-6 justify-center`}>
          <Image style={tw`w-32 h-32`} source={logo} resizeMode="contain" />
        </View>
        {isVisible && (
          <View style={tw`flex flex-row justify-center items-center p-2 mb-2`}>
            <Text style={tw`text-base text-yellow-500`}>{error.message}</Text>
          </View>
        )}
        <Input
          placeholder="Username / Email"
          textContentType="givenName"
          onChangeText={(val) => setUsername(val)}
          containerStyle={tw`w-full px-4`}
          errorMessage={error.username}
        />
        <Input
          placeholder="Password"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={(val) => setPassword(val)}
          containerStyle={tw`w-full px-4`}
          errorMessage={error.password}
        />
        {/*Button*/}
        <TextButton
          label="Log In"
          buttonContainerStyle={tw`h-12 rounded w-11/12 my-4`}
          onPress={() => signIn({ username, password })}
        />
        {/** */}
        <Text h4 style={tw`text-[${COLORS.primary}] mt-2 mb-10`}>
          Forgot password?{" "}
        </Text>
        {/* <View style={tw`justify-center items-center p-2 w-11/12 my-4`}>
          <View style={tw`bg-gray-200 h-[1px] w-full`} />
          <Text
            style={tw`absolute text-center text-sm text-gray-600 bg-white px-2 py-1`}
          >
            Or
          </Text>
        </View> */}
        <Text h4 style={tw`text-gray-700`}>
          Don't have any account?
          <Text
            style={tw`text-[${COLORS.primary}] ml-1`}
            onPress={() => navigation.navigate("SignUp")}
          >
            {" "}
            Sign Up
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
