import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { Icon, Text } from "@rneui/themed";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import SafeAreaView from "react-native-safe-area-view";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import Section from "../../components/content/Section";
import TextButton from "../../components/buttons/TextButton";
import { BASEURL } from "../../config/config";
import { noImage } from "../../utils/helpers";
import InviteModal from "../../components/modal/InviteModal";
import { COLORS } from "../../constants/theme";

const EventScreen = ({ navigation, route }) => {
  const [authUser, setAuth] = useState(null);
  const [event, setEvent] = useState(null);
  const [tickets, setTicket] = useState([]);
  const [profile, setProfile] = useState("");
  const [status, setStatus] = useState(null);
  const [savedStatus, setSavedStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [invitees, setIvitees] = useState([]);

  const toggleFollow = (id) => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .post(`${BASEURL}/api/follow/${id}`, { id: "" }, config)
        .then((res) => {
          setStatus(!status);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setUser(JSON.parse(result));
      console.log("secure");
    } else {
      alert("No values stored under that key.");
    }
  }

  const getEvent = (id) => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .get(`${BASEURL}/api/event/show/${id}`, config)
        .then((res) => {
          let { event } = res.data;
          // console.log(res.data);
          setEvent(event);
          setTicket(event.ticket);
          setStatus(res.data.follows);
          setSavedStatus(res.data.saved);
          setProfile(res.data.profile);
          setIvitees(res.data.invitees);
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
  };

  const saveEvent = (id) => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .post(`${BASEURL}/api/event/save/${id}`, { id: "" }, config)
        .then((res) => {
          console.log(res.data);
          setSavedStatus(!savedStatus);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });
  };

  useEffect(() => {
    let { id } = route.params;

    //  console.log(route.params)
    getEvent(id);

    //  getValueFor('user')

    return () => {};
  }, [navigation]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar style="dark" />
      {/*Header*/}
      <View
        style={tw`flex-row w-full h-14 items-center justify-between px-3 
           mt-2 bg-white`}
      >
        <TouchableOpacity style={tw`p-2`} onPress={() => navigation.goBack()}>
          <Icon
            type="font-awesome-5"
            name="arrow-left"
            size={17}
            color="black"
          />
        </TouchableOpacity>

        <View style={tw`flex-row`}></View>
      </View>
      <ScrollView style={tw`flex-1 bg-gray-200`}>
        <View style={tw`bg-white  pt-4 px-5 pb-4`}>
          {/**Banner */}
          <View style={tw`flex-1 shadow-lg rounded-3xl h-60 w-full`}>
            <Image
              source={{
                uri: `${BASEURL}/storage/images/uploads/${event?.banner}`,
              }}
              resizeMode="stretch"
              style={tw`h-full w-full rounded-2xl`}
            />
          </View>
          {/**Invite */}
          <Section containerStyle={tw`p-1 mb-3`} subtitle="Invite People">
            <View style={tw`flex-row items-center `}>
              {invitees.map((avatar, index) => (
                <Image
                  key={index}
                  source={
                    avatar?.profilePhoto
                      ? {
                          uri: `${BASEURL}/storage/images/uploads/${avatar.profilePhoto}`,
                        }
                      : noImage
                  }
                  style={[tw`w-10 h-10 rounded-full border border-white -mr-4`]}
                />
              ))}
              <TouchableOpacity
                onPress={() => {
                  setShowModal(true);
                }}
              >
                <Icon
                  type="feather"
                  name="plus"
                  size={19}
                  color="white"
                  containerStyle={tw`bg-gray-700 w-10 h-10 rounded-full justify-center`}
                />
              </TouchableOpacity>
            </View>
          </Section>

          {/*Content*/}
          <View style={tw`flex-1 my-2 px-1 pb-10`}>
            <Section containerStyle={tw`border-b border-gray-400`}>
              {/*Category*/}
              <View
                style={[tw`flex-row justify-between items-center mb-1 px-1`]}
              >
                <Text
                  style={[
                    tw`text-base text-left font-medium text-gray-500 mx-1`,
                    { color: "#ff8552" },
                  ]}
                >
                  {event?.category.name}
                </Text>

                <View style={tw`flex-row items-center`}>
                  {/**Save/Favourite */}
                  <TouchableOpacity
                    style={tw`rounded-full mr-3`}
                    onPress={() => saveEvent(event?.id)}
                  >
                    <Icon
                      type="font-awesome-5"
                      name="bookmark"
                      size={19}
                      color={savedStatus ? "red" : "black"}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/*Title */}
              <Text style={tw`text-xl font-bold mb-1 text-gray-700`}>
                {event?.title}
              </Text>
            </Section>

            {/*Date & Time*/}
            <Section containerStyle={tw`p-1 mb-3`} subtitle="Date & Time">
              <View style={tw`flex-row items-center`}>
                {/**Icon */}
                <View
                  style={[
                    tw`p-2 items-center rounded-full`,
                    { backgroundColor: "#ffede6" },
                  ]}
                >
                  <Icon
                    type="font-awesome-5"
                    name="calendar"
                    size={16}
                    color="#ff8552"
                  />
                </View>
                <View style={tw`flex-1 flex-col p-2`}>
                  {/**Date */}
                  <View style={tw`flex-row justify-between mx-1`}>
                    <Text style={tw`text-sm font-semibold text-gray-500`}>
                      {new Date(event?.start_date).toDateString()}
                    </Text>

                    <Text style={tw`text-sm font-semibold text-gray-500 `}>
                      {event?.end_date
                        ? new Date(event.end_date).toDateString()
                        : ""}
                    </Text>
                  </View>

                  {/*Time*/}
                  <View style={tw`flex-row justify-between mx-1`}>
                    <Text style={tw`text-base text-gray-700`}>
                      {event?.start_time}
                    </Text>

                    <Text style={tw`text-base text-gray-700`}>
                      {event?.end_time}
                    </Text>
                  </View>
                </View>
              </View>
            </Section>

            <Section containerStyle={tw`p-1 mb-3`} subtitle="Location">
              <View style={tw`flex-row items-center`}>
                {/**Location*/}
                <View
                  style={[
                    tw`bg-black bg-opacity-30 p-2 items-center rounded-full`,
                    { backgroundColor: "#ffede6" },
                  ]}
                >
                  <Icon
                    type="font-awesome-5"
                    name="map"
                    size={16}
                    color="#ff8552"
                  />
                </View>
                <View style={tw`mx-2`}>
                  <Text style={tw`text-base text-gray-500`}>
                    {event?.address}
                  </Text>
                  <Text style={tw`text-lg text-gray-700`}>{event?.venue}</Text>
                </View>
              </View>
            </Section>

            {/*Description*/}
            <Section containerStyle={tw`p-1 mb-3`} title="Description">
              <Text style={tw`text-base text-gray-500`}>
                {event?.description}
              </Text>
            </Section>

            {/**Organizer */}
            <Section containerStyle={tw`p-1`}>
              <View style={tw`flex-row`}>
                <TouchableOpacity
                  style={tw``}
                  onPress={() =>
                    navigation.navigate("User Profile", { id: event?.userId })
                  }
                >
                  <Image
                    style={tw`mr-1 w-16 h-16 rounded-xl`}
                    source={
                      profile
                        ? {
                            uri: `${BASEURL}/storage/images/uploads/${profile}`,
                          }
                        : noImage
                    }
                  />
                </TouchableOpacity>
                <View style={tw`flex-col p-1`}>
                  <Text style={tw`text-xl mb-1 text-gray-700`}>
                    {event?.author}
                  </Text>
                  {/*  Follow  */}
                  <TouchableOpacity
                    style={tw``}
                    onPress={() => toggleFollow(event?.userId)}
                  >
                    <Text style={tw`text-red-400 text-base`}>
                      {status ? "Unfollow" : "Follow"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Section>
          </View>
        </View>
      </ScrollView>

      {/*Tickets*/}

      {tickets.length > 0 && (
        <Section containerStyle={tw`items-center justify-center mb-1`}>
          <TextButton
            label="Get Tickets ->"
            buttonContainerStyle={tw`rounded-lg p-3 w-80`}
            onPress={() => navigation.navigate("Order Tickets", { tickets })}
          />
        </Section>
      )}

      {/**Filter */}
      {showModal && (
        <InviteModal
          isVisible={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          event={{
            eventId: event?.id,
            title: event?.title,
            banner: event?.banner,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default EventScreen;
