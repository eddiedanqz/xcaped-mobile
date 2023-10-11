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
        .get(`${BASEURL}/api/event/saved`, config)
        .then((res) => {
          // let { data } = res.data;
          // console.log(res.data)
          setEvents(res.data.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  useEffect(() => {
    getData();

    return () => {
      setEvents([]);
    };
  }, [isFocused]);

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
