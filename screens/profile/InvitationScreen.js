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
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import moment from "moment";

import { BASEURL } from "@env";
import { noImage } from "../../utils/helpers";

const InvitationScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [invites, setInvites] = useState([]);
  const [offset, setOffset] = useState(0);
  const [next, setNext] = useState("");

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
          <View style={tw`px-3`}>
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
        contentContainerStyle={tw`py-5`}
        // onEndReached={loadMore}
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
        .get(`${BASEURL}/api/invitations/all/`, config)
        .then((res) => {
          let { data } = res.data;
         // console.log(data);
          setInvites(data);
          setNext(res.data.next_page_url);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  const loadMore = () => {
    //param0
    SecureStore.getItemAsync("mytoken").then((token) => {
      fetch(`${next}`, {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          let { data } = res;
          setInvites((invites) => [...invites, ...data]);
          //setOffset(offset + 1);
          console.log(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View
        style={tw`bg-white flex-row w-full h-16 items-center justify-between mt-6 px-4 z-20`}
      >
        <TouchableOpacity>
          <Icon
            type="feather"
            name="arrow-left"
            size={20}
            color="#ff8552"
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
      </View>

      <View style={tw`px-2 pb-16`}>{renderInvitations()}</View>
    </View>
  );
};

export default InvitationScreen;
