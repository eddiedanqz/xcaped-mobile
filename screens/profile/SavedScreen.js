import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/themed";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import tw from "twrnc";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import ListCard from "../../components/cards/ListCard";
import TopHeader from "../../components/TopHeader";
import { BASEURL } from "../../config/config";

const SavedScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);

  const isFocused = useIsFocused();

  const renderEvents = () => {
    //
    const renderItem = ({ item }) => (
      <ListCard
        item={item}
        onPress={() => navigation.navigate("Event", { id: item.id })}
      />
    );

    return (
      <FlatList
        data={events}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={tw`flex-1 bg-white py-1`}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    );
  };

  const loadMore = () => {
    setPage(page + 1);
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
        .get(`${BASEURL}/api/event/saved?page=${page}`, config)
        .then((res) => {
          // let { data } = res.data;
          // console.log(res.data)
          setEvents((prev) => [...res.data.data]);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  useEffect(() => {
    getData();
  }, [isFocused, page]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <TopHeader
        title="Saved"
        leftIcon={
          <Icon
            type="feather"
            name="arrow-left"
            size={20}
            color="black"
            onPress={() => navigation.goBack()}
          />
        }
      />

      {/**Search Results */}
      <View style={tw`flex-1 bg-gray-100 px-2`}>{renderEvents()}</View>
    </SafeAreaView>
  );
};

export default SavedScreen;
