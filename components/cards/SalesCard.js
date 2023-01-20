import React, { useEffect, useState } from "react";
import {
  View, Text, 
} from "react-native";
import {Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";


const SalesCard = ({label,containerStyle,icon,amount,labelStyle,amountStyle,iconStyle}) => {
  return (
    <View style={[tw`flex-1 bg-white p-4 mb-3 mx-1 shadow-md`,containerStyle]}>
    <View style={tw`flex-row justify-between items-center`}>
    <Text style={[tw`text-base font-semibold`,labelStyle]}>{label}</Text>
    <Icon
        type="feather"
        name={icon}
        size={20}
        color={iconStyle}
      />
    </View>
    <Text style={[tw`text-lg font-bold`,amountStyle]}>{amount}</Text>
  </View>
  )
}

export default SalesCard