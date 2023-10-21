import React from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import tw from "twrnc";
import { Icon } from "@rneui/themed";

import MultiSlider from "@ptomasroos/react-native-multi-slider";

const TwoPointSlider = ({
  values,
  min,
  max,
  prefix,
  postfix,
  onValuesChange,
}) => {
  return (
    <MultiSlider
      values={values}
      sliderLength={290}
      min={min}
      max={max}
      step={1}
      markerOffsetY={20}
      selectedStyle={{ backgroundColor: "#ff8552" }}
      trackStyle={tw`h-3 rounded-md bg-gray-200`}
      minMarkerOverlapDistance={50}
      customMarker={(e) => {
        return (
          <View style={tw`h-16 items-center justify-center`}>
            <View
              style={[
                tw`h-6 w-6 rounded-xl border-4 border-white shadow-xl`,
                { backgroundColor: "#ff8552" },
              ]}
            />
            <Text style={tw`mt-1 text-base text-gray-600`}>
              {prefix} {e.currentValue} {postfix}{" "}
            </Text>
          </View>
        );
      }}
      onValuesChange={(values) => onValuesChange(values)}
    />
  );
};

export default TwoPointSlider;
