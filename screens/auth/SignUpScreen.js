import React, { useState,useEffect } from "react";
import {SafeAreaView, View, Text, Image,TouchableOpacity } from "react-native";
import { Input, Divider } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Icon} from "react-native-elements";

import { AuthContext } from "../../context/AuthContext";
import appStyle from "../../style/appStyle";
import TextButton from "../../components/buttons/TextButton";
import Validator from "../../components/errors/Validator";

const SignUpScreen = ({ navigation }) => {
  const { signUp,errorData,setData,isVisible,setIsVisible} = React.useContext(AuthContext);
  const [fullname, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const onRadioBtnClick = (item) => {
  //   let updatedState = isLiked.map((isLikedItem) =>
  //     isLikedItem.id === item.id
  //       ? { ...isLikedItem, selected: true }
  //       : { ...isLikedItem, selected: false }
  //   );
  //   setIsLiked(updatedState);
  // };

 const clearError = () => {
 if (isVisible) {
  setTimeout(() => {
    setIsVisible(false)
     setData([])
  }, 5000);
 }
 
 }

  useEffect(() => {
    clearError()
  }, [isVisible])
  
  return (
    <SafeAreaView style={tw`flex-1 bg-white items-center justify-center p-1`}>
      {isVisible&&
      (    
       <Validator data={errorData} isVisible={isVisible}/>
      )
      }
      <View style={tw`mb-12`}>
        <Image
          style={tw`w-24 h-24`}
          source={require("../../assets/logo.png")}
          />
      </View>
      <Input placeholder="Username"  onChangeText = {val => setUsername(val)} />
      <Input placeholder="Name"  onChangeText = {val => setName(val)} />
      <Input placeholder="Email"  onChangeText = {val => setEmail(val)}/>
      <Input placeholder="Password" secureTextEntry={true} 
       onChangeText = {val => setPassword(val)}
       />
      {/*Button*/}
      <TextButton
        label="Sign Up"
        buttonContainerStyle={tw`h-12 rounded w-11/12 `}
        onPress={() => signUp({fullname,username,email,password})}
      />

      <Text h3 style={tw`text-gray-700 text-center mt-4`}>
        By signing up you accept the
        <Text style={tw`text-blue-500`}> Terms of Service</Text> and
        <Text style={tw`text-blue-500`}> Privacy Policy</Text>
      </Text>
      <Divider orientation="horizontal" style={appStyle.mb10} />
      <Text h3 style={tw`text-gray-700`}>
        Already have an account?
        <Text
          style={tw`text-blue-500`}
          onPress={() => navigation.navigate("LogIn")}
        >
          {" "}
          Log In
        </Text>
      </Text>
    </SafeAreaView>
  );
};


export default SignUpScreen;
