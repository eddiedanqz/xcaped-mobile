import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import * as SecureStore from "expo-secure-store";
import { Icon } from "@rneui/themed";
import axios from "axios";

import { BASEURL } from "../../config/config";

const StepFooter = ({
  navigation,
  steps,
  currentStep,
  setCurrentStep,
  params,
  inputs,
}) => {
  const [errors, setError] = useState("");
  const [isError, setIsError] = useState(false);

  const checkFields = () => {
    //title
    if (inputs.title == "") {
      setError("Title is required");
      setIsError(true);
      return;
    }
    //category
    if (inputs.category == "") {
      setError("Select a category");
      setIsError(true);
      return;
    }
    //startDate //StartTime
    if (inputs.startDate == "" || inputs.startTime == "") {
      setError("Date and Time are required");
      setIsError(true);
      return;
    }
    //Venue
    if (inputs.location == "") {
      setError(["Event venue is required"]);
      setIsError(true);
      return;
    }
    if (inputs.address == "") {
      setError(["Event Address is required"]);
      setIsError(true);
      return;
    }
    sendData();
  };

  const sendData = () => {
    console.log(params);
    //   SecureStore.getItemAsync("mytoken").then((token) => {
    //     let parsed = JSON.parse(token)
    // fetch(`${BASEURL}/api/event/create`, {
    //   method: "POST",
    //   headers: new Headers({
    //     "Accept": "application/json",
    //     "Content-Type": undefined,
    //     "Authorization": `Bearer ${parsed}`,
    //   }),
    //   body: JSON.stringify(params),
    // })
    //   .then((response) => response.text())
    //   .then((data) => {
    //       console.log(data)
    //       // console.log(data.message)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // })

    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Authorization: `Bearer ${parsed}`,
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(`${BASEURL}/api/event/create`, params, config)
        .then((res) => {
          if (res.data) {
            // console.log(res.data)
            navigation.navigate("Profile");
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  return (
    <View style={tw`flex-1 justify-end`}>
      {isError && (
        <View
          style={tw`flex flex-row justify-between items-center bg-red-600 z-10 mx-1 p-2 bottom-20 rounded z-10`}
        >
          <Text style={tw`text-base text-white`}>{errors}</Text>
          <TouchableOpacity
            style={tw``}
            onPress={() => {
              setIsError(false);
              setError("");
            }}
          >
            <Icon type="feather" name="x" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {/**Buttons */}
      <View style={tw`bottom-8 w-full flex-row justify-between bg-white`}>
        {currentStep > 0 ? (
          <View style={tw`w-1/2 border-r items-center justify-center`}>
            <TouchableOpacity
              style={tw`justify-center items-center`}
              onPress={() => {
                if (currentStep > 0) {
                  setCurrentStep(currentStep - 1);
                }
              }}
            >
              <Text style={[tw`text-black text-base`]}>Back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={tw`w-1/2 border-r items-center justify-center `}>
            <Text style={tw`text-center text-base text-gray-400`}> Back</Text>
          </View>
        )}
        {currentStep + 1 < steps.length /* add other conditions here */ && (
          <View style={tw`w-1/2 items-center justify-center`}>
            <TouchableOpacity
              style={[tw`justify-center items-center`]}
              onPress={() => {
                if (currentStep + 1 < steps.length) {
                  setCurrentStep(currentStep + 1);
                }
              }}
            >
              <Text style={[tw`text-base text-black` /*,{color:'#fdcc97'}*/]}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {currentStep + 1 == steps.length /* add other conditions here */ && (
          <View style={tw`w-1/2 items-center justify-center`}>
            <TouchableOpacity
              style={tw`justify-center items-center`}
              onPress={checkFields}
            >
              <Text style={[tw`text-base text-black` /*,{color:'#fdcc97'}*/]}>
                Finish
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default StepFooter;
