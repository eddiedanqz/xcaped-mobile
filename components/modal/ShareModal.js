import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  FlatList,
  Text,
  Image,
  Pressable,
} from "react-native";
import { Icon } from "@rneui/themed";
import tw from "twrnc";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { BASEURL } from "../../config/config";
import TextButton from "../buttons/TextButton";
import Section from "../content/Section";
import { noImage } from "../../utils/helpers";

const MapModal = ({ isVisible, onClose, ticketId, action }) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = useState(isVisible);
  const [value, setVal] = useState("");
  const [users, setResults] = useState([]);
  const [id, setId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  function renderSearch() {
    return (
      <View
        style={tw`flex-row items-center justify-center bg-gray-200 mx-4 my-2 py-1.5 px-3 rounded-lg`}
      >
        <TextInput
          style={tw`flex-1 text-lg`}
          placeholder="Search..."
          placeholderTextColor="gray"
          onChangeText={(val) => setVal(val)}
          returnKeyType="search"
          value={value}
          onSubmitEditing={() => handleSubmit()}
        />
      </View>
    );
  }

  //
  const renderUsers = () => {
    //
    const renderItem = ({ item }) => (
      <View style={tw`flex-row items-center justify-center mb-2 p-1`}>
        <View
          style={tw`flex-row items-center bg-white`}
          //onPress={onPress}
        >
          <View style={tw`bg-white w-16 h-16 shadow-xl`}>
            <Image
              source={
                item.profile?.banner
                  ? {
                      uri: `${BASEURL}/storage/images/uploads/${item.profile?.banner}`,
                    }
                  : noImage
              }
              resizeMode="stretch"
              style={tw`w-full h-full rounded p-1`}
            />
          </View>
          <View style={tw`flex-1 justify-start items-start px-5`}>
            <Text style={tw`text-lg text-gray-700 font-bold`}>
              {" "}
              {item.fullname}{" "}
            </Text>
            <Text style={tw`text-base text-gray-500`}> {item.username}</Text>
          </View>
        </View>
        {/**Check button */}
        <TouchableOpacity
          style={tw`absolute right-0 mr-1 z-10`}
          onPress={() => {
            setId(item.id);
            setModalVisible(true);
          }}
        >
          <View
            style={tw`rounded-full p-1 mx-1 border-2 ${
              item.id === id ? "border-green-400" : "border-gray-400"
            }
            `}
            //onPress={() => selectHandler(item)}
          >
            <Icon
              name="check"
              type="feather"
              size={12}
              color={`${item.id === id ? "white" : "gray"}`}
              containerStyle={tw`rounded-full  ${
                item.id === id ? "bg-green-400" : ""
              }`}
            />
          </View>
        </TouchableOpacity>
      </View>
    );

    return (
      <FlatList
        data={users}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={tw`py-5`}
      />
    );
  };

  //
  const send = () => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .post(`${BASEURL}/api/ticket/share/${ticketId}`, { id }, config)
        .then((res) => {
          let { data } = res;
          // console.log(data)
          if (data.message == "success") {
            setShowModal(false);
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  const getData = () => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .get(`${BASEURL}/api/followers`, config)
        .then((res) => {
          console.log(res.data);
          setResults(res.data.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  const handleSubmit = () => {
    if (value == "") {
      getData();
      return;
    }

    SecureStore.getItemAsync("mytoken").then((token) => {
      fetch(`${BASEURL}/api/followers/search?query=${value}`, {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res.data);
          setResults(res.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (showModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [550, 100],
  });

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={tw`flex-1 bg-black bg-opacity-50`}>
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={tw`absolute bottom-0 top-0 left-0 right-0 `} />
        </TouchableWithoutFeedback>
      </View>
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          top: modalY,
          width: "100%",
          height: "87%",
          backgroundColor: "white",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        {/**Header */}
        <View style={tw`flex-row justify-end items-center pt-4 pb-2 px-5`}>
          {/* <TouchableOpacity
            style={tw`rounded-lg`}
            onPress={() => setShowModal(false)}
          >
            <Icon type="feather" name="x" size={20} color="gray" />
          </TouchableOpacity> */}
        </View>

        {/**Search */}
        {renderSearch()}
        <View style={tw`flex-1 px-2`}>{renderUsers()}</View>
        {/** */}
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={tw`flex-1 bg-black bg-opacity-70`}>
            <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
              <View style={tw`absolute bottom-0 top-0 left-0 right-0 `} />
            </TouchableWithoutFeedback>
          </View>
          <View style={tw`flex-1 justify-center items-center absolute inset-0`}>
            <View style={tw`bg-white rounded p-6`}>
              <Text style={tw`font-bold text-center text-base text-gray-700`}>
                Are you sure?
              </Text>
              <Text style={tw`text-center mb-5 mt-1 mx-2 text-gray-600`}>
                This action cannot be reversed.
              </Text>
              <View style={tw`flex-row justify-between items-center`}>
                <TextButton
                  label="Cancel"
                  buttonContainerStyle={tw`p-1 bg-transparent`}
                  labelStyle={tw`text-red-400`}
                  onPress={() => setModalVisible(false)}
                />
                <TextButton
                  label="Yes"
                  buttonContainerStyle={tw`p-1 bg-transparent`}
                  labelStyle={tw`text-black`}
                  onPress={() => {
                    send();
                    setModalVisible(false);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        {/**Button 
        <View style={tw`absolute h-24 bottom-20 left-0 right-0 p-3 bg-white`}>
      <TextButton label='Done' buttonContainerStyle={tw`h-11 rounded`}/>
        </View>*/}
      </Animated.View>
    </Modal>
  );
};

export default MapModal;
