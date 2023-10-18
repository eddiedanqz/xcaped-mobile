import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
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
        contentContainerStyle={tw`py-5 px-3`}
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
          setEvents((prev) => [...prev, ...res.data.data]);
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
      <View style={[tw`overflow-hidden pb-1`]}>
        <TopHeader
          title="Saved"
          leftIcon={
            <Icon
              type="font-awesome-5"
              name="arrow-left"
              size={20}
              color="white"
              onPress={() => navigation.goBack()}
            />
          }
        />
      </View>

      {/**Search Results */}
      {renderEvents()}
    </SafeAreaView>
  );
};

export default SavedScreen;
