import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Text, Icon } from "@rneui/themed";
import tw, { useDeviceContext } from "twrnc";
import * as SecureStore from "expo-secure-store";

import ImageCard from "../../components/cards/ImageCard";
import { BASEURL } from "../../config/config";
import { firstToUpper } from "../../utils/utils";

const ListingScreen = ({ navigation, route }) => {
  useDeviceContext(tw);
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");

  //
  const loadMore = () => {
    setPage(page + 1);
  };

  const renderEvents = () => {
    //
    const renderItem = ({ item }) => (
      <ImageCard
        item={item}
        onPress={() => navigation.navigate("Event", { id: item.id })}
      />
    );

    return (
      <FlatList
        data={events}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={tw`py-5`}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    );
  };

  const getEvents = (link) => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      fetch(`${BASEURL}/api/${link}?page=${page}`, {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          // console.log(page);
          setEvents((prev) => [...prev, ...res.data]);
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  };

  useEffect(() => {
    // console.log(route.params.link);
    let header = firstToUpper(route.params.link);
    setTitle(header);
    getEvents(route.params.link);
  }, [page]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View style={tw`overflow-hidden mt-1`}>
        <View
          style={[
            tw`flex-row w-full h-15 items-center justify-between px-5 pt-2`,
          ]}
        >
          <TouchableOpacity
            style={tw`justify-center`}
            onPress={() => navigation.goBack()}
          >
            <Icon type="feather" name="arrow-left" size={20} color="#151618" />
          </TouchableOpacity>

          <Text style={[tw`text-black text-gray-700 text-lg font-bold`]}>
            {title} Events
          </Text>

          <TouchableOpacity
            style={tw`justify-center`}
            onPress={() => navigation.navigate("Search")}
          >
            <Icon type="feather" name="search" size={20} color="#151618" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`px-2 pb-17`}>{renderEvents()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  shadow: {
    backgroundColor: "#fff",
    width: 300,
    height: 60,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default ListingScreen;
