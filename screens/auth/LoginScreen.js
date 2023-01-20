import React,{useState,useEffect} from "react";
import {SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import { Input, Divider } from "react-native-elements";
import tw from 'tailwind-react-native-classnames';

import {AuthContext} from '../../context/AuthContext'
import TextButton from "../../components/buttons/TextButton";
import Validator from "../../components/errors/Validator";

const LoginScreen = ({navigation}) => {
  const {signIn,errorData,setData,isVisible,setIsVisible} = React.useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
    <SafeAreaView style={tw `flex-1 bg-white items-center justify-center p-2`}>
      {isVisible&&
      (    
       <Validator data={errorData} isVisible={isVisible}/>
      )
      }
       <View style={tw`mb-14`}>
       <Image
          style={tw`w-24 h-24`}
          source={require("../../assets/logo.png")}
        />
      </View>
      <Input placeholder="Username" textContentType='givenName' onChangeText = {val => setUsername(val)}/>
      <Input placeholder="Password" textContentType='password' secureTextEntry={true} 
       onChangeText = {val => setPassword(val)}
      />
      {/*Button*/}
      <TextButton  label='Log In' buttonContainerStyle={tw`h-12 rounded w-11/12 my-4`} 
      onPress={() => signIn({username,password})}/>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default LoginScreen;
