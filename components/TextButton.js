import React from "react";
import { View, TouchableOpacity, ScrollView, Text } from "react-native";
import tw from "tailwind-react-native-classnames";

const TextButton = ({ label, labelStyle, onPress, buttonContainerStyle }) => {
  return (
    <TouchableOpacity
      style={[tw`items-center justify-center`, {backgroundColor:'#151618'},buttonContainerStyle]}
      onPress={onPress}
    >
      <Text style={[tw`text-white text-lg`,{color:'#fdcc97'},labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
