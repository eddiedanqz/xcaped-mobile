import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import tw from "tailwind-react-native-classnames";

const StepFooter = ({steps,currentStep,setCurrentStep}) => {
 // const [currentStep, setCurrentStep] = useState(1)

  return (
    <View style={tw`flex-row justify-between`}>
    {currentStep > 0 ?
      <TouchableOpacity style={tw`justify-center items-center bottom-0 left-3 w-20 h-9 bg-black rounded-3xl`} onPress={() => {
        if(currentStep > 0){
          setCurrentStep(currentStep - 1);
        }
      }}>
        <Text style={[tw``,{color:'#fdcc97'}]}>Back</Text>
      </TouchableOpacity>
      : <Text> </Text>
    }
    {(currentStep+1) < steps.length /* add other conditions here */ &&
      <TouchableOpacity style={[tw`justify-center items-center bottom-0 right-3 w-20 h-9 bg-black rounded-3xl`,]} onPress={() => {
        if((currentStep+1) < steps.length){
          setCurrentStep(currentStep + 1);
        }
      }}>
        <Text style={[tw``,{color:'#fdcc97'}]}>Next</Text>
      </TouchableOpacity>
    }
    {(currentStep+1) == steps.length /* add other conditions here */ &&
      <TouchableOpacity style={tw`justify-center items-center bottom-0 right-3 w-20 h-9 bg-black rounded-3xl`} onPress={() => {
        console.log('Finish');
      }}>
        <Text style={[tw``,{color:'#fdcc97'}]}>Finish</Text>
      </TouchableOpacity>
    }
  </View>
  );
};

export default StepFooter;
