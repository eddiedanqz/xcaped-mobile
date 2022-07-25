import React from "react";
import {TouchableOpacity, Button, StyleSheet, View, Text, Image } from "react-native";
import { Input, Divider } from "react-native-elements";
import tw from 'tailwind-react-native-classnames';

import {AuthContext} from '../../context/AuthContext'
import TextButton from "../../components/TextButton";

const LoginScreen = ({navigation}) => {
  const {signIn} = React.useContext(AuthContext)

  return (
    <View style={tw `flex-1 bg-white items-center justify-center mt-6 p-2`}>
       <View style={tw`mb-14`}>
       <Image
          style={tw`w-24 h-24`}
          source={require("../../assets/logo.png")}
        />
      </View>
      <Input placeholder="Email" textContentType='emailAddress'/>
      <Input placeholder="Password" textContentType='password'/>
      {/*Button*/}
      <TextButton  label='Log In' buttonContainerStyle={tw`h-12 rounded w-11/12 `} onPress={() => signIn()}/>
     {/** */}
      <Text h4 style={tw`text-blue-600 mt-2`}>
        Forgot password?{" "}
      </Text>
      <Divider
        orientation="horizontal"
        subHeader="Or"
        subHeaderStyle={tw`text-gray-700 my-5`}
      />
        <Text h4 style={tw`text-gray-700`}>
        Don't have any account?
        <Text style={tw`text-blue-600`} onPress={() =>
        navigation.navigate('SignUp')
      }> Sign Up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default LoginScreen;
