import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

const Validator = ({ data }) => {
  data?.errors
    ? Object.entries(data.errors).map(([key, value], i) => {
        key + ":" + value;
      })
    : data.message;
};

export default Validator;
