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

import { noImage } from "../../utils/helpers";
import FilterModal from "../../components/search/FilterModal";
import { BASEURL } from "../../config/config";

const FollowEventScreen = ({ navigation, route }) => {
  useDeviceContext(tw);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);

  //
  const loadMore = () => {
    setPage(page + 1);
  };

  const renderEvents = () => {
    //
    const renderItem = ({ item }) => (
      <TouchableOpacity style={tw`mt-1 mx-3 mb-5`}>
        <View style={tw`rounded w-36 h-[150px] `}>
          <Image
            source={
              item.user.profile?.profilePhoto
                ? {
                    uri: `${BASEURL}/storage/images/user/${item.user.profile.profilePhoto}`,
                  }
                : noImage
            }
            resizeMode="stretch"
            style={[tw`h-full w-full rounded`]}
          />
          <Text
            style={tw`absolute bg-white bg-opacity-80 text-sm text-gray-600 font-semibold px-2
          py-1 bottom-0 right-0 rounded`}
          >
            {item.count} Events
          </Text>
        </View>
        <Text style={tw`text-base font-bold m-1`} numberOfLines={1}>
          {item.user.username}
        </Text>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={events}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={tw`py-5`}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    );
  };

  const getEvents = () => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      fetch(`${BASEURL}/api/events/following?page=${page}`, {
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
    getEvents();
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

      <View style={tw`flex-1 px-2 pb-7`}>{renderEvents()}</View>
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

export default FollowEventScreen;
