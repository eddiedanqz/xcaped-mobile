import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import { Icon, BottomSheet, ListItem } from "react-native-elements";
import tw from "twrnc";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BarCodeScanner } from "expo-barcode-scanner";

import { BASEURL } from "../../config/config";
import TextButton from "../../components/buttons/TextButton";

const AttendeeScreen = ({ navigation, route }) => {
  const [lists, setLists] = useState([]);
  const [name, setName] = useState("");
  const [eventId, setId] = useState(0);
  const [offset, setOffset] = useState(2);

  const renderLists = () => {
    //
    const renderItem = ({ item }) => (
      <View
        style={tw`bg-white flex-row justify-between items-center mb-2 p-2 
       rounded-lg border-b border-gray-300`}
      >
        {/**Content */}
        <View style={tw`flex-row items-center w-8/12`}>
          <Icon
            type="feather"
            name={item.status == "checked" ? "check-circle" : "alert-octagon"}
            size={20}
            color="white"
            containerStyle={tw`${
              item.status == "checked" ? "bg-green-400" : "bg-yellow-400"
            } rounded p-3`}
          />

          <View style={tw`p-3 `}>
            <Text style={tw`text-sm text-gray-700 font-bold`}>
              ID:{item.reference}
            </Text>
            <Text
              style={tw`text-base text-gray-600 font-semibold`}
              numberOfLines={1}
            >
              {item.fullname}
            </Text>
            <View style={tw`flex-row`}>
              <Text style={tw`text-sm font-semibold text-gray-500`}>
                {item.ticket.title}
              </Text>
              <Text style={tw`text-sm font-semibold text-gray-500 mx-1`}>
                |
              </Text>
              <Text style={tw`text-sm font-semibold text-gray-500`}>
                GHS{item.ticket.price}
              </Text>
            </View>
          </View>
        </View>
        {/**Time */}
        <View style={tw`p-3 items-center`}>
          <Text style={tw`text-xs text-gray-400 font-medium`}>
            {item.checkIn_time}
          </Text>
          <TextButton
            label="Check-in"
            labelStyle={tw`text-sm`}
            buttonContainerStyle={tw`py-1 px-2 rounded mt-2 bg-black shadow`}
            onPress={() => checkIn(item.id)}
          />
        </View>
      </View>
    );

    return (
      <FlatList
        data={lists}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={tw`mb-5 px-2`}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    );
  };

  const getList = (id) => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .get(`${BASEURL}/api/attendees/${id}`, config)
        .then((res) => {
          // console.log(res.data.data)
          setLists(res.data.data);
          setOffset(2);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  const loadMore = () => {
    //param0
    SecureStore.getItemAsync("mytoken").then((token) => {
      fetch(
        `${BASEURL}/api/search/attendee?term=${name}&eventId=${eventId}&page=${offset}`,
        {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          }),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          // let { data } = res;
          setLists((results) => [...results, ...res.data]);
          setOffset(offset + 1);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  };

  const checkIn = (id) => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .post(`${BASEURL}/api/attendee/checkin`, { eventId, id: id }, config)
        .then((res) => {
          console.log(res.data);
          getList(eventId);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  const handleSubmit = () => {
    if (name == "") {
      getList(eventId);
      return;
    }

    SecureStore.getItemAsync("mytoken").then((token) => {
      setOffset(2);
      fetch(`${BASEURL}/api/search/attendee?term=${name}&eventId=${eventId}`, {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          // console.log(res.data);
          setLists(res.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  useEffect(() => {
    let { id } = route.params;
    getList(id);
    setId(id);
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View style={tw`overflow-hidden mt-2`}>
        <View
          style={[
            tw`flex-row w-full h-16 items-center justify-between px-5`,
            {
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 1,
            },
          ]}
        >
          <TouchableOpacity
            style={tw`justify-center`}
            onPress={() => navigation.goBack()}
          >
            <Icon type="feather" name="arrow-left" size={20} color="#151618" />
          </TouchableOpacity>
          <Text style={tw`text-lg font-semibold`}>Attendees</Text>
          <TouchableOpacity
            style={tw`flex-row justify-center items-center p-3`}
            onPress={() => navigation.navigate("Scanner")}
          >
            <Icon type="font-awesome" name="qrcode" size={22} color="#151618" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`mt-4`}>
        {/**Search */}
        <View
          style={tw`flex-row justify-center items-center bg-gray-300 mx-3 my-1 p-1.5 rounded-lg`}
        >
          <TextInput
            style={tw`flex-1 text-lg `}
            placeholderTextColor="black"
            placeholder="Search..."
            onChangeText={(val) => setName(val)}
            returnKeyType="search"
            // onChange={handleSubmit}
            onSubmitEditing={handleSubmit}
          />
        </View>
        {/*Card*/}
        {renderLists()}
      </View>
    </SafeAreaView>
  );
};

export default AttendeeScreen;
