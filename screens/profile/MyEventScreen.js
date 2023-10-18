import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import { Icon, BottomSheet, ListItem } from "react-native-elements";
import tw from "twrnc";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { BASEURL } from "../../config/config";
import TopHeader from "../../components/TopHeader";
import ListCard from "../../components/cards/ListCard";
import List from "../../components/content/List";

const MyEventScreen = ({ navigation }) => {
  const [passedId, setPassedId] = useState(0);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  const openSheet = (id) => {
    setPassedId(id);
    setShowModal(true);
  };

  //
  const closeSheet = () => {
    setPassedId(0);
    setShowModal(false);
  };

  //
  const renderEvents = () => {
    //
    const renderItem = ({ item }) => (
      <View>
        <ListCard
          item={item}
          onPress={() => navigation.navigate("Event", { id: item.id })}
          iconName="more-vertical"
          iconMethod={() => openSheet(item.id)}
        />

        <BottomSheet
          isVisible={showModal}
          modalProps={{ animationType: "slide" }}
        >
          <View style={tw`flex-1 bg-white py-3 px-4`}>
            {/**Header */}
            <View style={tw`flex-row justify-end items-center py-2 px-3`}>
              <TouchableOpacity
                style={tw`rounded-lg z-10`}
                onPress={() => closeSheet()}
              >
                <Icon type="feather" name="x-circle" size={20} color="gray" />
              </TouchableOpacity>
            </View>

            <List
              icon="users"
              iconColor="#374e51"
              title="Attendees"
              containerStyle={tw``}
              onPress={() => {
                closeSheet();

                navigation.navigate("Attendee", { id: passedId });
              }}
            />
            <List
              icon="bar-chart"
              iconColor="#374e51"
              title="Report"
              containerStyle={tw``}
              onPress={() => {
                closeSheet();
                navigation.navigate("Report", { id: passedId });
              }}
            />
            <List
              icon="calendar"
              iconColor="#374e51"
              title="Edit Event"
              containerStyle={tw``}
              onPress={() => {
                closeSheet();
                navigation.navigate("Edit Event", { id: passedId });
              }}
            />
            <List
              icon="edit"
              iconColor="#374e51"
              title="Edit Ticket"
              containerStyle={tw`mb-2`}
              onPress={() => {
                closeSheet();
                navigation.navigate("Edit Ticket", {
                  id: passedId,
                  count: item.ticket,
                });
              }}
            />
          </View>
        </BottomSheet>
      </View>
    );

    return (
      <FlatList
        data={events}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={tw`my-5`}
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
        .get(`${BASEURL}/api/my-events?page=${page}`, config)
        .then((res) => {
          // let { data } = res.data;
          // console.log(res.data.data)
          setEvents((prev) => [...prev, ...res.data.data]);
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
      <View style={tw`overflow-hidden`}>
        <TopHeader
          title="My Events"
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
      <View style={tw`px-2 pb-16`}>{renderEvents()}</View>
    </SafeAreaView>
  );
};

export default MyEventScreen;
