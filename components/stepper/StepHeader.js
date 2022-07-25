import React, { useState } from 'react';
import { View,StyleSheet,TouchableOpacity,Text } from 'react-native'
import {
    Icon,
  } from "react-native-elements";
 import tw from "tailwind-react-native-classnames";


const StepHeader = ({steps,currentStep}) => {
    
  return (
    <View style={tw`items-center my-5`}>
    <View style={tw`w-72 h-16`}>
      <View style={tw`items-center`}>
        <View style={{height: 2, backgroundColor: '#fdcc97', width: 320, position: 'absolute', top: 27, zIndex: 10}} />
      </View>
      <View style={tw`flex-row w-full items-center justify-center absolute z-20`}>
        {steps.map((label, i) =>
          <View key={i} style={tw`items-center w-36`}>
            {i > currentStep && i != currentStep && /* Not selected */
              <View style={[tw`items-center justify-center w-12 h-12 bg-white border rounded-full mb-3 mx-3`,
              {borderColor:'#fdcc97'}]}>
                <Text style={{fontSize: 13, color: '#151618'}}>{i+1}</Text>
              </View>
            }
            {i < currentStep && /* Checked */
              <View style={[tw`items-center justify-center w-12 h-12 bg-green-400 border-green-400 rounded-full mb-3 mx-3`,
              {backgroundColor: '#151618'}]}>
                <Icon type='font-awesome-5' name="check" size={20} color="#fdcc97" />
              </View>
            }
            {i == currentStep && /* Selected */
              <View style={[tw`items-center justify-center w-12 h-12 rounded-full mb-3 mx-3`,
              {borderColor:'#fdcc97',backgroundColor:'#fdcc97'}]}>
                <Text style={{fontSize: 13, color: '#fff'}}>{i+1}</Text>
              </View>
            }
          </View>
        )}
      </View>
    </View>
  </View>
  )
};

export default StepHeader;
/*{currentStep == 1 &&	
    <View style={tw`h-80 self-center`}>
        <Text style={{fontSize: 30}}>Step 2</Text>
    </View>
}	
{currentStep == 2 &&	
    <View style={tw`h-80 self-center`}>
        <Text style={{fontSize: 30}}>Step 3</Text>
    </View>
}	
{currentStep == 3 &&	
    <View style={tw`h-80 self-center`}>
        <Text style={{fontSize: 30}}>Step 4</Text>
    </View>
}
{currentStep == 4 &&	
    <View style={tw`h-80 self-center`}>
        <Text style={{fontSize: 30}}>Step 5</Text>
    </View>
}
*/