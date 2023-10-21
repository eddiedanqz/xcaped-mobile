import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Icon } from "@rneui/themed";
import tw from "twrnc";
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { BASEURL } from "../../config/config";

import Section from "../../components/content/Section";
import TextButton from "../../components/buttons/TextButton";
import Validator from "../../components/errors/Validator";

const EditTicketScreen = ({ navigation, route }) => {
  const [ticket, setTicket] = useState([]);
  const [id, setId] = useState(null);
  const [capacity, setCapacity] = useState(0);
  const [numInputs, setNumInputs] = useState(null);
  const [errors, setError] = useState([]);
  const [isError, setIsError] = useState(false);
  // all our input fields are tracked with this array
  const refInputs = useRef({ title: "", price: "", capacity: "" });

  const setValue = (index, value, field) => {
    refInputs.current[index][field] = value;
    // console.log(inputs[index])
  };

  const getValue = (index, field) => {
    let val = refInputs.current[index][field];
    return val.toString();
  };

  const addInput = () => {
    refInputs.current.push({ title: "", price: "", capacity: "" });
    setNumInputs((value) => value + 1);
  };

  const removeForm = (i) => {
    refInputs.current.splice(i, 1)[0];
    setNumInputs((value) => value - 1);
  };

  const form = [];

  for (let i = 0; i < numInputs; i++) {
    form.push(
      <Section containerStyle={tw`mb-5 mt-3`} key={i}>
        {/**remove */}
        <View
          style={tw`absolute right-3 -top-1 flex-row items-center justify-end mr-5 z-20 rounded-lg`}
        >
          <TouchableOpacity
            style={[tw`items-center justify-center`, {}]}
            onPress={() => removeForm(i)}
          >
            <Icon name="minus" type="feather" size={20} color="red" />
          </TouchableOpacity>
        </View>
        {/**Ticket Type */}
        <View
          style={tw`flex-row items-center border-b border-gray-400 mx-3 my-1 p-2 rounded-lg`}
        >
          <TouchableOpacity>
            <Icon name="ticket" type="font-awesome" size={20} />
          </TouchableOpacity>

          <TextInput
            style={tw`flex-1 text-lg mx-3`}
            placeholder="Type"
            placeholderTextColor="gray"
            keyboardType="default"
            onChangeText={(value) => setValue(i, value, "title")}
            defaultValue={getValue(i, "title")}
          />
        </View>
        {/**Ticket Price */}
        <View
          style={tw`flex-row items-center border-b border-gray-400 mx-3 my-1 p-2 rounded-lg`}
        >
          <TouchableOpacity>
            <Icon name="dollar-sign" type="feather" size={20} />
          </TouchableOpacity>

          <TextInput
            style={tw`flex-1 text-lg mx-3`}
            placeholder="Price"
            placeholderTextColor="gray"
            keyboardType="numeric"
            onChangeText={(value) => setValue(i, value, "price")}
            defaultValue={getValue(i, "price")}
          />
        </View>
        {/**Ticket Type */}
        <View
          style={tw`flex-row items-center border-b border-gray-400 mx-3 my-1 p-2 rounded-lg`}
        >
          <TouchableOpacity>
            <Icon name="thermometer" type="feather" size={20} />
          </TouchableOpacity>

          <TextInput
            style={tw`flex-1 text-lg mx-3`}
            placeholder="Number of tickets *(capacity)"
            placeholderTextColor="gray"
            keyboardType="numeric"
            onChangeText={(value) => setValue(i, value, "capacity")}
            defaultValue={getValue(i, "capacity")}
          />
        </View>
      </Section>
    );
  }

  const handleSubmit = () => {
    setTicket(refInputs.current);
    let formData = new FormData();
    formData.append("tickets", JSON.stringify(ticket));
    formData.append("id", JSON.stringify(id));

    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Authorization: `Bearer ${parsed}`,
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(`${BASEURL}/api/ticket/${id}`, formData, config)
        .then((res) => {
          // console.log(res.data)
          setError(res.data);
          setIsError(true);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  const getTickets = (id, count) => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .get(`${BASEURL}/api/event/ticket/${id}`, config)
        .then((res) => {
          setTicket(res.data);
          refInputs.current = res.data;
          console.log(res.data);
          setNumInputs(res.data.length);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  const clearError = () => {
    if (isError) {
      setTimeout(() => {
        setIsError(false);
        setError([]);
      }, 5000);
    }
  };

  useEffect(() => {
    clearError();
  }, [isError]);

  useEffect(() => {
    let { id, count } = route.params;
    setId(id);
    getTickets(id, count);

    return () => {
      setTicket([]);
      setId("");
      setNumInputs(0);
    };
  }, []);

  return (
    <SafeAreaView style={tw`h-full bg-white`}>
      {/*Header*/}
      <View style={tw`overflow-hidden pt-1 mt-2`}>
        <View
          style={[
            tw`flex-row w-full h-16 items-center justify-between px-3 shadow `,
            {
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 1,
            },
          ]}
        >
          <TouchableOpacity
            style={tw`justify-center ml-2`}
            onPress={() => navigation.goBack()}
          >
            <Icon type="feather" name="x" size={20} color="#151618" />
          </TouchableOpacity>
          <Text style={tw`text-base`}>Edit Tickets</Text>
          <TouchableOpacity
            style={tw`justify-center ml-2`}
            onPress={handleSubmit}
          >
            <Text style={tw`text-base`}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAwareScrollView>
        <View style={tw``}>
          {form}

          {/**Button */}
          {numInputs < 3 && (
            <View style={tw`mt-2 p-2 mx-3`}>
              <TextButton
                label="Add New Ticket"
                buttonContainerStyle={[
                  tw`h-12 rounded bg-transparent justify-start`,
                  {},
                ]}
                labelStyle={[tw`ml-2 text-base`, { color: "#ff8552" }]}
                iconName="plus"
                iconColor="#ff8552"
                size={16}
                onPress={addInput}
              />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
      {isError && (
        <Validator
          data={errors}
          isVisible={isError}
          messageStyle={tw`bg-black p-3 rounded-lg bg-opacity-70 self-center`}
        />
      )}
    </SafeAreaView>
  );
};

export default EditTicketScreen;
