import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
import tw from "twrnc";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AuthContext } from "../../context/AuthContext";
import TextButton from "../../components/buttons/TextButton";
import { logo } from "../../utils/helpers";
import { COLORS } from "../../constants/theme";
import { requestValidator } from "../../utils/utils";

const SignUpScreen = ({ navigation }) => {
  const { signUp, errorData, setData, isVisible, setIsVisible } =
    React.useContext(AuthContext);
  const [fullname, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const onRadioBtnClick = (item) => {
  //   let updatedState = isLiked.map((isLikedItem) =>
  //     isLikedItem.id === item.id
  //       ? { ...isLikedItem, selected: true }
  //       : { ...isLikedItem, selected: false }
  //   );
  //   setIsLiked(updatedState);
  // };

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
      }, 5000);
    }
  };

  useEffect(() => {
    clearError();
  }, [isVisible]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white items-center justify-center p-1`}>
      <KeyboardAwareScrollView
        keyboardDismissMode="interactive"
        style={tw`w-full`}
        contentContainerStyle={tw`flex-1 justify-center items-center p-1`}
      >
        <View style={tw`mb-5 justify-center`}>
          <Image style={tw`w-32 h-32`} source={logo} resizeMode="contain" />
        </View>
        {isVisible && (
          <View style={tw`flex flex-row justify-center items-center p-2 mb-2`}>
            <Text style={tw`text-base text-yellow-500`}>{error.message}</Text>
          </View>
        )}
        <Input
          placeholder="Username"
          onChangeText={(val) => setUsername(val)}
          containerStyle={tw`w-full px-4`}
          errorMessage={error.username}
        />
        <Input
          placeholder="Name"
          onChangeText={(val) => setName(val)}
          containerStyle={tw`w-full px-4`}
          errorMessage={error.fullname}
        />
        <Input
          placeholder="Email"
          onChangeText={(val) => setEmail(val)}
          containerStyle={tw`w-full px-4`}
          errorMessage={error.email}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(val) => setPassword(val)}
          containerStyle={tw`w-full px-4`}
          errorMessage={error.password}
        />
        {/*Button*/}
        <TextButton
          label="Sign Up"
          buttonContainerStyle={tw`h-12 rounded w-11/12 my-4`}
          onPress={() => signUp({ fullname, username, email, password })}
        />

        <Text style={tw`text-gray-700 text-center mt-4 mb-6`}>
          By signing up you accept the
          <Text style={tw`text-[${COLORS.primary}]`}>
            {" "}
            Terms of Service
          </Text>{" "}
          and
          <Text style={tw`text-[${COLORS.primary}]`}> Privacy Policy</Text>
        </Text>
        <Text style={tw`text-gray-700`}>
          Already have an account?
          <Text
            style={tw`text-[${COLORS.primary}]`}
            onPress={() => navigation.navigate("LogIn")}
          >
            {" "}
            Log In
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
