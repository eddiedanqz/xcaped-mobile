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

import TopHeader from "../../components/TopHeader";
import VerticalCard from "../../components/cards/VerticalCard";
import CascadedCard from "../../components/cards/CascadedCard";
import ImageCard from "../../components/cards/ImageCard";
import FilterModal from "../../components/search/FilterModal";
import { BASEURL } from "../../config/config";

const ListingScreen = ({ navigation }) => {
  useDeviceContext(tw);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [offset, setOffset] = useState(1);

  //
  const loadMore = () => {
    //param
    SecureStore.getItemAsync("mytoken").then((token) => {
      fetch(`${BASEURL}/api/events?page=${offset}`, {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          let { data } = res;
          console.log(res.meta);
          setEvents((events) => [...events, ...data]);
          setOffset(offset + 1);
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
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
        contentContainerStyle={tw`py-5`}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    );
  };

  const getEvents = () => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      fetch(`${BASEURL}/api/events`, {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          // console.log(res.data);
          setEvents(res.data);
          setOffset(offset + 1);
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  };

  useEffect(() => {
    getEvents();

    return () => {
      setEvents([]);
      setOffset(1);
    };
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View style={tw`overflow-hidden mt-1`}>
        <View
          style={[
            tw`flex-row w-full h-15 items-center justify-between px-5 pt-2`,
            {
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 1,
            },
          ]}
        >
          <TouchableOpacity
            style={tw`justify-center`}
            onPress={() => navigation.goBack()}
          >
            <Icon type="feather" name="arrow-left" size={20} color="#151618" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`justify-center`}
            onPress={() => navigation.navigate("Search")}
          >
            <Icon type="feather" name="search" size={20} color="#151618" />
          </TouchableOpacity>
        </View>
      </View>

      {/**Filter 
         <TouchableOpacity style={[tw`absolute right-3 justify-center items-center 
         p-3 w-12 h-12 rounded-full bottom-5 z-10 shadow-md`,{backgroundColor:"#fdcc97"}]}
         onPress={() => setShowFilterModal(true)}>
         <Icon
            type="font-awesome-5"
              name="sliders-h"
              size={18}
              color="#151618"
            />
         </TouchableOpacity>*/}

      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      )}

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
