import React from "react";
import tw from "tailwind-react-native-classnames";
import { View, Text ,TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";


const List =  ({containerStyle,title, icon,onPress,iconColor,titleStyle}) => {
  return (
  <TouchableOpacity style={[tw `mb-2 p-3 flex-row items-center border-b border-gray-300`,containerStyle]}
   onPress={onPress}>
    <Icon type='feather' name={icon} size={20} color={iconColor} />
      <Text style={[tw `mx-3 font-bold text-lg text-gray-700`,titleStyle]}>{title}</Text>
  </TouchableOpacity>
  )}

export default List;
