import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";

const TopHeader = ({ leftIcon, rightIcon, title }) => {
  return (
    <View
      style={[
        tw`flex-row w-full h-16 items-center justify-center px-3 border-b border-gray-200 px-3`,
      ]}
    >
      <TouchableOpacity style={tw`justify-center p-2`}>
        {leftIcon}
      </TouchableOpacity>

      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-black text-gray-700 text-lg font-bold`}>
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
  },
});
