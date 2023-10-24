import React, { useState } from "react";
import { View, Text } from "react-native";
import { Icon } from "@rneui/themed";
import tw from "twrnc";

const StepHeader = ({ steps, currentStep }) => {
  return (
    <View style={tw`justify-center items-center w-full h-16 my-5`}>
      <View style={tw`flex-row w-full items-center justify-around  z-20`}>
        {steps.map((label, i) => (
          <View key={i} style={tw`items-center justify-between`}>
            {i > currentStep && i != currentStep /* Not selected */ && (
              <View style={tw`flex-row justify-center items-center mx-3`}>
                <View
                  style={[
                    tw`bg-gray-400 items-center justify-center w-8 h-8 text-base rounded-full`,
                  ]}
                >
                  <Text style={[tw`text-gray-400 text-white`]}>{i + 1}</Text>
                </View>
                {i + 1 !== steps.length && (
                  <View style={[tw`w-14 mx-2 bg-gray-400`, { height: 2 }]} />
                )}
              </View>
            )}
            {i < currentStep /* Checked */ && (
              <View style={tw`flex-row justify-center items-center mx-3`}>
                <View
                  style={[
                    tw`items-center justify-center w-8 h-8 rounded-full`,
                    { backgroundColor: "#151618" },
                  ]}
                >
                  <Icon type="feather" name="check" size={18} color="#fff" />
                </View>
                {i + 1 !== steps.length && (
                  <View
                    style={[
                      tw`w-14 mx-2`,
                      { height: 2, backgroundColor: "#151618" },
                    ]}
                  />
                )}
              </View>
            )}
            {i == currentStep /* Selected */ && (
              <View style={tw`flex-row justify-center items-center mx-3`}>
                <View
                  style={[
                    tw`items-center justify-center w-8 h-8 border-2 rounded-full`,
                    { borderColor: "#ffede6", backgroundColor: "#ff8552" },
                  ]}
                >
                  <Text style={{ fontSize: 13, color: "#fff" }}>{i + 1}</Text>
                </View>
                {i + 1 !== steps.length && (
                  <View
                    style={[
                      tw`w-14 mx-2`,
                      { height: 2, backgroundColor: "#ff8552" },
                    ]}
                  />
                )}
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
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
