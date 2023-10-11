import React from "react";
import { View, TouchableOpacity, ScrollView, Text } from "react-native";
import tw from "twrnc";
import { Icon } from "react-native-elements";

const TextButton = ({
  label,
  labelStyle,
  onPress,
  buttonContainerStyle,
  iconName,
  size,
  iconColor,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        tw`flex-row items-center justify-center`,
        { backgroundColor: "#151618" },
        buttonContainerStyle,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {iconName && (
        <Icon
          type="font-awesome-5"
          name={iconName}
          size={size}
          color={iconColor}
        />
      )}
      {label && (
        <Text style={[tw`text-white text-lg`, labelStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default TextButton;
