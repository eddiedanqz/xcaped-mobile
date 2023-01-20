
import React, {useState} from "react";
import {
  View,
  Text,
  Pressable,
} from "react-native";
import tw from "tailwind-react-native-classnames";

const RadioButton = ({ data, onSelect,buttonStyle,option }) => {
  const [userOption, setUserOption] = useState(option);

  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };

  return (
    <View style={[tw`flex-row`,buttonStyle]}>
      {data.map((item,i) =>
         (
          <View style={[tw`flex-row items-center m-2`]} key={i+1}>
            <Pressable
              style={tw`rounded-full p-1 mx-1 border-2 ${item == userOption ? 'border-blue-400' : "border-gray-300"}
            `}
              onPress={() => selectHandler(item)}
            >
                <View 
                 style={tw`rounded-full p-1 border border-white
                  ${item === userOption ? 'bg-blue-400' : "bg-gray-300"}`}></View>
            </Pressable>
              <Text style={tw`text-lg text-gray-700 mx-1`}>{item}</Text>
          </View>
        )
      )}
    </View>
  );
};

export default RadioButton;
