import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import tw from "twrnc";
import { Icon, BottomSheet } from "@rneui/themed";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";

import { BASEURL } from "../../config/config";
import List from "../../components/content/List";
import { noImage } from "../../utils/helpers";
import { AuthContext } from "../../context/AuthContext";

const NotificationScreen = ({ navigation }) => {
  const [lists, setList] = useState([]);
  const { setCount } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [passedId, setPassedId] = useState(0);
  const isFocused = useIsFocused();

  const openSheet = (id) => {
    setPassedId(id);
    setShowModal(true);
  };

  //
  const closeSheet = () => {
    setPassedId(0);
    setShowModal(false);
  };

  const markAsRead = () => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .get(`${BASEURL}/api/notifications/read`, config)
        .then((res) => {
          // console.log(res.data)
          setList(res.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  const remove = (id) => {
    //console.log(id);
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .delete(`${BASEURL}/api/notifications/${id}`, config)
        .then((res) => {
          console.log(res.data);
          getData();
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  //
  const renderList = () => {
    //
    const renderItem = ({ item }) => (
      <View
        style={tw`flex-row items-center justify-center mb-2 p-2 rounded 
      ${!item.read_at ? "bg-gray-100" : ""}`}
      >
        <TouchableOpacity
          style={tw`flex-row items-center`}
          onPress={() =>
            navigation.navigate(item.data.link, { id: item.data.id })
          }
        >
          <View style={tw`bg-white w-11 h-11 shadow-xl rounded`}>
            <Image
              source={
                item.data.image
                  ? {
                      uri: `${BASEURL}/storage/images/uploads/${item.data.image}`,
                    }
                  : noImage
              }
              resizeMode="stretch"
              style={tw`w-full h-full rounded p-1`}
            />
          </View>
          <View style={tw`flex-1 justify-start ml-1`}>
            {/**Title */}
            <Text style={tw`text-base text-gray-700`}> {item.data.title} </Text>
            {/**Location */}
            <Text style={tw`text-base text-gray-500`}> {item.data.body}</Text>
            <Text style={tw`text-sm text-gray-500`}>
              {" "}
              {moment(item.created_at).fromNow()}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`absolute right-0 mr-1 z-10 p-2`}
          onPress={() => openSheet(item.id)}
        >
          <Icon type="feather" name="more-vertical" color="#151618" size={20} />
        </TouchableOpacity>

        <BottomSheet
          isVisible={showModal}
          modalProps={{ animationType: "slide" }}
          onBackdropPress={() => closeSheet()}
        >
          <View style={tw`flex-1 bg-white pt-3 pb-8 px-5`}>
            <List
              icon="trash"
              iconColor="#374e51"
              title="Delete"
              containerStyle={tw``}
              onPress={() => {
                setShowModal(false);
                remove(passedId);
              }}
            />
          </View>
        </BottomSheet>
      </View>
    );

    return (
      <FlatList
        data={lists}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={tw`flex-1 bg-white py-2`}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    );
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
        .get(`${BASEURL}/api/notifications?page=${page}`, config)
        .then((res) => {
          //console.log(res.data.data);
          setList((prev) => [...prev, ...res.data.data]);
          setCount(null);
          //
          setTimeout(() => {
            markAsRead();
          }, 3000);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    getData();
  }, [page, isFocused]);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View
        style={tw`flex-row w-full h-16 items-center justify-between mt-6 px-4 border-b border-gray-200`}
      >
        <TouchableOpacity
          style={tw`justify-center p-1 rounded-full`}
          onPress={() => navigation.goBack()}
        >
          <Icon type="feather" name="arrow-left" size={20} color="#151618" />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-black text-gray-700 text-lg font-bold`,
            // {color:'#ff8552'}
          ]}
        >
          Notifications
        </Text>
        <TouchableOpacity></TouchableOpacity>
      </View>

      <View style={tw`bg-gray-100 flex-1 px-2`}>{renderList()}</View>
    </View>
  );
};

export default NotificationScreen;
