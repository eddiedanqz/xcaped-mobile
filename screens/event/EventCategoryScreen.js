import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Text, Icon } from "react-native-elements";
import tw, { useDeviceContext } from "twrnc";
import * as SecureStore from "expo-secure-store";

import ImageCard from "../../components/cards/ImageCard";
import { BASEURL } from "../../config/config";

const EventCategoryScreen = ({ navigation, route }) => {
  useDeviceContext(tw);
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);

  //
  const loadMore = () => {
    setPage(page + 1);
  };

  const renderEvents = () => {
    //
    const renderItem = ({ item }) => (
      <ImageCard
        item={item}
        onPress={() => navigation.navigate("Event", { item })}
      />
    );

    return (
      <FlatList
        data={events}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={tw`bg-white flex-1 py-2`}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    );
  };

  const getEvents = (id) => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      fetch(`${BASEURL}/api/category/event/${id}?page=${page}`, {
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
    getEvents(route.params.id);
  }, [page]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View style={tw`overflow-hidden mt-1 border-b border-gray-200`}>
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

          <Text
            style={[tw`text-black text-gray-700 self-center text-lg font-bold`]}
          >
            {route.params.name}
          </Text>
          <TouchableOpacity></TouchableOpacity>
        </View>
      </View>

      <View style={tw`bg-gray-100 flex-1 px-2`}>{renderEvents()}</View>
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

export default EventCategoryScreen;
