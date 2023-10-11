import React, { useContext } from "react";
import { View, Text } from "react-native";
import StepsContext from "../../context/stepsContext";
import tw from "twrnc";

const Step = () => {
  return (
    <View>
      <Text>height</Text>
    </View>
  );
};

const StepContent = ({ steps, currentStep }) => {
  return (
    <View>
      {steps.map((val, i) => (
        <View key={i} style={tw`mt-5`}>
          {currentStep == i && (
            <View style={tw`h-80 w-full self-center`}>
              <Text style={tw`text-lg`}>
                {val} {i + 1}
              </Text>
              <Step />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default StepContent;
