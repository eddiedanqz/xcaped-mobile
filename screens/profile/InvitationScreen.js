import React, { Fragment, useState, useEffect } from "react";
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
import { Icon } from "@rneui/themed";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import moment from "moment";

import { BASEURL } from "../../config/config";
import { noImage } from "../../utils/helpers";
import { COLORS } from "../../constants/theme";

const InvitationScreen = ({ navigation }) => {
  const [invites, setInvites] = useState([]);
  const [page, setPage] = useState(1);

  const renderInvitations = () => {
    //
    const renderItem = ({ item }) => (
      <View style={[tw`flex justify-start items-center mb-2 px-3 py-2`]}>
        <TouchableOpacity
          style={tw`flex-row items-center w-full`}
          onPress={() => navigation.navigate("User Profile", { id: item.id })}
        >
          <Image
            source={
              item.banner
                ? { uri: `${BASEURL}/storage/images/uploads/${item.banner}` }
                : noImage
            }
            resizeMode="stretch"
            style={tw`w-16 h-16 rounded`}
          />
          <View style={tw`px-3 items-center`}>
            <Text style={tw`text-base font-semibold text-[${COLORS.primary}]`}>
              {moment(item.start_date).format("MMM")}
            </Text>
            <Text style={tw`text-sm font-semibold text-[${COLORS.primary}]`}>
              {moment(item.start_date).day()}
            </Text>
          </View>
          <View style={tw`flex-row px-3`}>
            <Text style={tw`text-base font-semibold`} numberOfLines={1}>
              {" "}
              {item.title}{" "}
            </Text>
            {/* <Text numberOfLines={1} style={tw`text-gray-600 text-base`}>
            </Text> */}
          </View>
        </TouchableOpacity>
      </View>
    );

    return (
      <FlatList
        data={invites}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={tw`bg-white `}
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
        .get(`${BASEURL}/api/invitations/all?page=${page}`, config)
        .then((res) => {
          let { data } = res.data;
          console.log(data);
          setInvites((prev) => [...prev, ...data]);
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
  }, [page]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View
        style={tw`bg-white flex-row w-full h-16 items-center justify-between px-4 z-20 border-b border-gray-200`}
      >
        <TouchableOpacity>
          <Icon
            type="feather"
            name="arrow-left"
            size={20}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-black text-gray-700 text-lg font-bold`,
            // {color:'#ff8552'}
          ]}
        >
          Invitations
        </Text>
        <TouchableOpacity></TouchableOpacity>
      </View>

      <View style={tw`flex-1 bg-gray-100 px-2`}>{renderInvitations()}</View>
    </SafeAreaView>
  );
};

export default InvitationScreen;
