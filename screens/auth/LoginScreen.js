import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { Input, Icon } from "@rneui/themed";
import tw from "twrnc";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AuthContext } from "../../context/AuthContext";
import TextButton from "../../components/buttons/TextButton";
import { logo } from "../../utils/helpers";
import { requestValidator } from "../../utils/utils";
import { COLORS } from "../../constants/theme";

const LoginScreen = ({ navigation }) => {
  const {
    signIn,
    errorData,
    setData,
    isVisible,
    setIsVisible,
    isLoading,
    setLoading,
  } = React.useContext(AuthContext);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
        <View style={tw`mb-6 justify-center`}>
          <Image style={tw`w-28 h-28`} source={logo} resizeMode="contain" />
        </View>
        {isVisible && (
          <View style={tw`flex flex-row justify-center items-center p-2 mb-2`}>
            <Text style={tw`text-base text-yellow-500`}>{error.message}</Text>
          </View>
        )}
        <Input
          placeholder="Username / Email"
          textContentType="name"
          onChangeText={(val) => setUser(val)}
          containerStyle={tw`w-full px-4`}
          errorMessage={error.user}
        />
        <Input
          placeholder="Password"
          textContentType="password"
          secureTextEntry={!showPassword}
          onChangeText={(val) => setPassword(val)}
          containerStyle={tw`w-full px-4`}
          errorMessage={error.password}
          rightIcon={
            <Icon
              type="feather"
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="gray"
              onPress={toggleShowPassword}
            />
          }
        />
        {/*Button*/}
        <TextButton
          label="Log In"
          buttonContainerStyle={tw`h-12 rounded w-11/12 my-4`}
          onPress={() => signIn({ user, password })}
        />
        {/** */}
        <Text
          style={tw`text-[${COLORS.primary}] mt-2 mb-10`}
          onPress={() => navigation.navigate("PasswordReset")}
        >
          Forgot password?
        </Text>
        {/* <View style={tw`justify-center items-center p-2 w-11/12 my-4`}>
          <View style={tw`bg-gray-200 h-[1px] w-full`} />
          <Text
            style={tw`absolute text-center text-sm text-gray-600 bg-white px-2 py-1`}
          >
            Or
          </Text>
        </View> */}
        <Text style={tw`text-gray-700`}>
          Don't have any account?
          <Text
            style={tw`text-[${COLORS.primary}]`}
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
