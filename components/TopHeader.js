import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import {LinearGradient} from 'expo-linear-gradient';

const TopHeader = ({ leftIcon, rightIcon, title }) => {
  return (
    <View style={[tw`flex-row w-full h-16 items-center justify-center px-3 pt-2`,
    {backgroundColor:'#ff8552'}
    ]}>
      <TouchableOpacity style={tw`justify-center ml-2`}>
        {leftIcon}
      </TouchableOpacity>

      <View style={tw`flex-1 text-white items-center justify-center`}>
        <Text h4 style={tw`text-white`}>
          {title}
        </Text>
      </View>

      <TouchableOpacity style={tw`justify-center mr-2`}>
        {rightIcon}
      </TouchableOpacity>
    </View>
  );
};

export default TopHeader;

// Later on in your styles..
var styles = StyleSheet.create({
  linearGradient: {
 /*   flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,*/
  }
});