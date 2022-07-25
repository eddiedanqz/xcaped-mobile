import React, { useState } from "react";
import { StyleSheet,SafeAreaView, View, Text, Image,ScrollView, TouchableOpacity} from "react-native";
import { Input, Button, Divider } from "react-native-elements";
import RadioButton from "../../components/RadioButton";
import tw from 'tailwind-react-native-classnames';

import appStyle from '../../style/appStyle'
import TextButton from "../../components/TextButton";


const SignUpScreen = ({navigation}) => {
  const [isLiked, setIsLiked] = useState([
    { id: 1, value: true, name: "Personal", selected: false },
    { id: 2, value: false, name: "Business", selected: false },
  ]);

  const onRadioBtnClick = (item) => {
    let updatedState = isLiked.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );
    setIsLiked(updatedState);
  };

  return (
    <View style={tw`flex-1 bg-white items-center justify-center mt-6 p-2`}>
     <View style={tw`mb-12`}>
       <Image
          style={tw`w-24 h-24`}
          source={require("../../assets/logo.png")}
        />
      </View>
      {/*
      <Text h2 style={appStyle.label}>
        Choose account type
      </Text>
      <View style={{flex:1,flexDirection: "row", marginBottom:10,alignSelf:'stretch'}}>
      {isLiked.map((item) => (
        <RadioButton
          onPress={() => onRadioBtnClick(item)}
          selected={item.selected}
          key={item.id}
        >
          {item.name}
        </RadioButton>
      ))}
      </View>*/}
      <Input placeholder="Username" />
      <Input placeholder="Name" />
     {/* <Text  h2 style={appStyle.label}>Choose category</Text>*/}
      <Input placeholder="Email" />
      <Input placeholder="Password" />
       {/*Button*/}
      <TextButton  label='Sign Up' buttonContainerStyle={tw`h-12 rounded w-11/12 `} onPress={() => signIn()}/>

      <Text h3 style={tw`text-gray-700 text-center mt-4`}>
        By signing up you accept the
        <Text style={tw`text-blue-500`}> Terms of Service</Text> and
        <Text style={tw`text-blue-500`}> Privacy Policy</Text>
      </Text>
      <Divider orientation="horizontal" style={appStyle.mb10} />
      <Text h3 style={tw`text-gray-700`}>
        Already have an account?
        <Text style={tw`text-blue-500`} onPress={() =>
        navigation.navigate('LogIn')
      }> Log In</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  
 
});

export default SignUpScreen;
