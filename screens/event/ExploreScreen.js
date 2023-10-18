import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Text, Icon } from "@rneui/themed";
import tw, { useDeviceContext } from "twrnc";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import TopHeader from "../../components/TopHeader";
import VerticalCard from "../../components/cards/VerticalCard";
import ImageCard from "../../components/cards/ImageCard";
import { BASEURL } from "../../config/config";
import { logo, noImage } from "../../utils/helpers";

const ExploreScreen = ({ navigation }) => {
  useDeviceContext(tw);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [people, setPeople] = useState([]);

  const renderEvents = () => {
    //
    const renderItem = ({ item }) => (
      <View style={tw`bg-white`}>
        <ImageCard
          item={item}
          onPress={() => navigation.navigate("Event", { id: item.id })}
        />
      </View>
    );

    const renderLiveEvents = () => {
      return (
        <View style={tw`bg-white`}>
          <View style={tw`flex-row mt-2 pb-4 px-3`}>
            <Text
              style={tw`flex-1 font-bold text-gray-700 text-base text-left`}
            >
              Live Events
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Listing", { link: "live" })}
            >
              <Text style={[tw`font-bold text-base`, { color: "#ff8552" }]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={liveEvents}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <VerticalCard
                containerStyle={tw`mx-2`}
                item={item}
                onPress={() => navigation.navigate("Event", { id: item.id })}
              />
            )}
          />
        </View>
      );
    };

    const renderFollowingEvents = () => {
      return (
        <View style={tw`bg-white mb-2`}>
          <View style={tw`flex-row mt-2 pb-4 px-3`}>
            <Text
              style={tw`flex-1 font-bold text-gray-700 text-base text-left`}
            >
              People You Follow
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Follow Event")}
            >
              <Text style={[tw`font-bold text-base`, { color: "#ff8552" }]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={people}
            keyExtractor={(item) => `${item.user.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={tw`mt-1 mx-3 mb-5`}
                onPress={() =>
                  navigation.navigate("Calendar", { id: item.user.id })
                }
              >
                <View style={tw`rounded w-48 h-[150px] `}>
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
            )}
          />
        </View>
      );
    };

    const renderHeaderTitle = () => {
      return (
        <View style={tw`bg-white flex-row mt-2 pb-4 pt-1 px-3`}>
          <Text style={tw`flex-1 font-bold text-gray-700 text-base text-left`}>
            Nearby Events
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Listing", { link: "nearby" })}
          >
            <Text style={[tw`font-bold text-base`, { color: "#ff8552" }]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <FlatList
        data={events}
        keyExtractor={(item) => `${item.id}`}
        ListHeaderComponent={
          <View>
            {/**Following */}
            {renderFollowingEvents()}

            {/**Live */}
            {renderLiveEvents()}

            {/**Header Title */}
            {renderHeaderTitle()}
          </View>
        }
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={tw`py-1`}
      />
    );
  };

  const getEvents = () => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .get(`${BASEURL}/api/home`, config)
        .then((res) => {
          // console.log(res.data.following.count);
          setEvents(res.data.events);
          setLiveEvents(res.data.live);
          setPeople(res.data.following);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });
  };

  useEffect(() => {
    getEvents();

    return () => {
      setEvents([]);
    };
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View style={tw`overflow-hidden border-b border-gray-200`}>
        <View
          style={[tw`flex-row w-full h-15 items-center justify-between px-4`]}
        >
          <Image style={tw`w-24 h-24`} source={logo} resizeMode="contain" />

          <TouchableOpacity
            style={tw`justify-center`}
            onPress={() => navigation.navigate("Create")}
          >
            <Icon type="feather" name="calendar" size={20} color="#151618" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`flex-1 bg-gray-100`}>{renderEvents()}</View>
    </SafeAreaView>
  );
};

export default ExploreScreen;
