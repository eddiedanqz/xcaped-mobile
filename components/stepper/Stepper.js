import React,{useState} from 'react'
import {
    StyleSheet,Text,View,
    Image,

  } from "react-native";
  import { Icon} from "react-native-elements";
  import StepContent from './StepContent'
  import StepHeader from './StepHeader'
  import StepFooter from './StepFooter'


const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([
    "Review",
    "Payment",
    "Submit",
    "Before",
    "Finish",
  ]);

  return (
    <View>

      {/**Stepper */}
      <StepHeader steps={steps} currentStep={currentStep} />

      <View style={tw`mt-5`}>
        {currentStep == 0 && (
          <View style={tw`h-80 self-center`}>
            <Text style={tw`text-lg`}>val 1</Text>
          </View>
        )}
      </View>
      <StepFooter
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </View>
  );
}

export default Stepper

