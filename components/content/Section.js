import React from "react";
import tw from "twrnc";
import { View, Text } from "react-native";

const Section = ({
  containerStyle,
  title,
  subtitle,
  titleStyle,
  subtitleStyle,
  children,
}) => {
  return (
    <View style={[tw`my-2`, containerStyle]}>
      {title && (
        <Text
          style={[tw`font-bold text-gray-700 text-xl text-left`, titleStyle]}
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          style={[
            tw`font-medium text-gray-500 text-base text-left`,
            subtitleStyle,
          ]}
        >
          {subtitle}
        </Text>
      )}

      {children}
    </View>
  );
};

export default Section;
