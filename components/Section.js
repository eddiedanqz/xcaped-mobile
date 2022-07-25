import React from 'react'
import tw from "tailwind-react-native-classnames";
import {
    View,
     Text
  } from "react-native";

const Section = ({containerStyle,title, children}) => {
  return (
    
        <View style={[tw`my-2 p-3 border-t border-gray-300`,containerStyle]}>
            <Text style={tw`font-bold text-gray-600 text-xl text-left mb-3`}>{title}</Text>
            {children}
        </View>
    
  )
}

export default Section