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

const AddTicketScreen = ({ navigation, route }) => {
  const [tickets, setTickets] = useState([]);
  const [id, setId] = useState(null);
  const [capacity, setCapacity] = useState(0);
  const [numInputs, setNumInputs] = useState(1);
  // all our input fields are tracked with this array
  const refInputs = useRef([{ title: "", price: "", capacity: "" }]);

  const setValue = (index, value, field) => {
    refInputs.current[index][field] = value;
    // console.log(inputs[index])
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
      <Section containerStyle={tw`mb-4`} key={i}>
        {/**remove */}
        <View
          style={tw`absolute right-3 -top-1 flex-row items-center justify-end mr-5 z-20 rounded-lg`}
        >
          <TouchableOpacity
            style={[tw`items-center justify-center`, {}]}
            onPress={() => removeForm(i)}
          >
            <Icon name="x-circle" type="feather" size={20} color="red" />
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
          />
        </View>
      </Section>
    );
  }

  const handleSubmit = () => {
    setTickets(refInputs.current);

    let formData = new FormData();
    formData.append("tickets", JSON.stringify(tickets));
    formData.append("id", id);

    // console.log(tickets)

    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Authorization: `Bearer ${parsed}`,
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(`${BASEURL}/api/ticket`, formData, config)
        .then((res) => {
          console.log(res.data);
          navigation.navigate("Profile");
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  useEffect(() => {
    let { eventId } = route.params;
    setId(eventId);
  }, []);

  return (
    <SafeAreaView style={tw`h-full bg-white`}>
      {/*Header*/}
      <View style={tw`overflow-hidden pb-1 mt-2`}>
        <View
          style={[
            tw`flex-row w-full h-16 items-center justify-center px-3 shadow `,
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
          {/* <TouchableOpacity style={tw`justify-center ml-2`}  onPress={() => navigation.goBack()}>
          <Icon type="feather" name="x" size={20}  color='#151618'/>
        </TouchableOpacity> */}
          <TouchableOpacity
            style={tw`justify-center ml-2`}
            onPress={() => navigation.goBack()}
          >
            <Text style={tw`text-base`}>Add Tickets</Text>
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
      <Section containerStyle={tw`items-center justify-center mb-1`}>
        <TextButton
          label="Finish"
          buttonContainerStyle={[
            tw`rounded-lg p-3 w-72`,
            { backgroundColor: "#ff8552" },
          ]}
          onPress={handleSubmit}
        />
      </Section>
    </SafeAreaView>
  );
};

export default AddTicketScreen;
