import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

const Validator = ({ data, isVisible, viewStyle, messageStyle, onPress }) => {
  const [isError, setIsError] = useState(isVisible);

  return (
    <TouchableOpacity
      style={[tw`absolute top-16 right-2 z-10`, viewStyle]}
      onPress={onPress}
    >
      {data.errors ? (
        Object.entries(data.errors).map(([key, value], i) => (
          <View
            key={i + 1}
            style={tw`flex flex-row justify-between items-center bg-red-400 z-10 mr-4 p-2
  rounded z-30 mb-2 shadow-xl`}
          >
            <Text style={tw`text-base text-white`}>{value}</Text>
          </View>
        ))
      ) : (
        <View
          style={[
            tw`flex flex-row justify-center items-center bg-yellow-400 z-10 p-2
  rounded z-20 mb-2 shadow`,
            messageStyle,
          ]}
        >
          <Text style={tw`text-base text-white`}>{data.message}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Validator;
