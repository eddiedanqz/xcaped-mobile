import React, { Fragment, useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import tw from "twrnc";
import { Icon, BottomSheet } from "@rneui/themed";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import Section from "../../components/content/Section";
import TextButton from "../../components/buttons/TextButton";
import ListCard from "../../components/cards/ListCard";
import { BASEURL } from "../../config/config";
import List from "../../components/content/List";
import { noImage } from "../../utils/helpers";
import { COLORS } from "../../constants/theme";

function UserProfileScreen({ navigation, route }) {
  const [authUser, setAuth] = useState({});
  const [user, setUser] = useState({});
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [events, setEvents] = useState([]);
  const [saved, setSaved] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [passedId, setPassedId] = useState(0);
  const [status, setStatus] = useState(null);
  const [routeId, setRouteId] = useState(route.params.id);
  const [more, setShowMore] = useState(false);

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

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      let parsed = JSON.parse(result);

      setAuth(parsed.user);
      // console.log(parsed);
    } else {
      alert("No values stored under that key.");
    }
  }

  const getProfile = (id) => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .get(`${BASEURL}/api/profile/${id}`, config)
        .then((res) => {
          // console.log(res.data);
          setUser(res.data.user);
          setEvents(res.data.events);
          setSaved(res.data.eventCount);
          setFollowers(res.data.followers);
          setFollowing(res.data.following);
          setStatus(res.data.follows);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });
  };

  const toggleFollow = () => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .post(`${BASEURL}/api/follow/${user.id}`, { id: "" }, config)
        .then((res) => {
          console.log(res.data);
          setStatus(!status);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });
  };

  useEffect(() => {
    getValueFor("user");

    getProfile(route.params.id);
  }, [navigation]);

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      {/*Header*/}
      <View
        style={tw`bg-white flex-row w-full h-14 items-center justify-between px-3 z-20 border-b border-gray-200`}
      >
        <TouchableOpacity
          style={tw`justify-center`}
          onPress={() => navigation.goBack()}
        >
          <Icon type="feather" name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        {/* <Text style={tw`text-black text-gray-700 text-lg font-bold`}>
          {user.username}
        </Text> */}
        <TouchableOpacity
          style={tw`justify-center`}
          //onPress={() => setShowMore(true)}
        >
          <Icon type="feather" name="more-horizontal" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={tw`bg-gray-100 pb-4`}>
        {/*Container*/}
        <View style={tw`bg-white py-4 px-3`}>
          <View style={tw`flex-row items-center justify-start my-4`}>
            {/**Profile Image */}
            <View style={tw`w-28 h-32 rounded-xl border-0 shadow-xl mr-3`}>
              <Image
                style={tw`w-full h-full rounded-xl`}
                source={
                  user.profile?.profilePhoto
                    ? {
                        uri: `${BASEURL}/storage/images/uploads/${user.profile.profilePhoto}`,
                      }
                    : noImage
                }
                resizeMode="cover"
              />
            </View>

            {/**Basic Info */}
            <View style={tw`flex-1`}>
              {/**Name */}
              <Text style={tw`text-2xl font-bold text-left text-gray-700`}>
                {user.username}
              </Text>
              {/**Location */}
              <View style={tw`flex-row mb-1 justify-start items-center`}>
                <Icon
                  type="font-awesome-5"
                  name="map-marker-alt"
                  size={15}
                  color="gray"
                />
                <Text style={tw`ml-1 text-gray-500 text-sm`}>
                  {user.profile?.location ? user.profile?.location : "N/A"}
                </Text>
              </View>

              {/**About */}
              {user.profile?.bio && (
                <Text style={tw`font-bold text-gray-600 text-sm`}>
                  {user.profile?.bio}
                </Text>
              )}
            </View>
          </View>
          {/**Follow */}
          {authUser?.id !== user.id && (
            <View
              style={tw`flex-row justify-center items-center bg-white my-3`}
            >
              <TextButton
                label={status ? "Unfollow" : "Follow"}
                buttonContainerStyle={[
                  tw`bg-[${COLORS.primary}] rounded-full shadow-xl p-1.5 w-28`,
                ]}
                onPress={() => toggleFollow()}
              />
            </View>
          )}
          {/** Stats*/}
          <View style={tw`justify-center items-center pb-4`}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`flex-row items-center`}
            >
              <TouchableOpacity
                style={tw`items-center m-3`}
                onPress={() =>
                  navigation.navigate("Fans", { index: 0, id: user.id })
                }
              >
                <Text style={tw`text-base font-bold text-gray-700`}>
                  {followers}
                </Text>
                <Text style={tw`text-base text-gray-500`}>Followers</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`items-center m-3`}
                onPress={() =>
                  navigation.navigate("Fans", { index: 1, id: user.id })
                }
              >
                <Text style={tw`text-base font-bold text-gray-700`}>
                  {following}
                </Text>
                <Text style={tw`text-base text-gray-500`}>Following</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`items-center m-3`}>
                <Text style={tw`text-base font-bold text-gray-700`}>
                  {saved}
                </Text>
                <Text style={tw`text-base text-gray-500`}>Events</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>

        {/** My Events*/}
        <Section containerStyle={tw`bg-white px-4 pt-4 mb-0`}>
          <View style={tw`flex-row px-1`}>
            <Text
              style={tw`flex-1 font-bold text-gray-600 text-base  text-left`}
            >
              Events
            </Text>

            <TouchableOpacity>
              <Text style={tw`font-bold text-base text-[${COLORS.primary}]`}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {events ? (
            events.map((item, i) => (
              <View key={item.id}>
                <ListCard
                  item={item}
                  onPress={() => navigation.navigate("Event", { id: item.id })}
                  iconName="more-vertical"
                  iconMethod={() => openSheet(item.id)}
                />
                <BottomSheet
                  isVisible={showModal}
                  modalProps={{ animationType: "slide" }}
                  onBackdropPress={() => closeSheet()}
                >
                  <View style={tw`flex-1 bg-white py-3 px-4`}>
                    {/**Header */}
                    <View
                      style={tw`flex-row justify-end items-center py-2 px-3`}
                    >
                      <TouchableOpacity
                        style={tw`rounded-lg z-10`}
                        onPress={() => closeSheet()}
                      >
                        <Icon
                          type="feather"
                          name="x-circle"
                          size={20}
                          color="gray"
                        />
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
            ))
          ) : (
            <View style={tw`h-36 justify-center items-center`}>
              <Text style={tw`text-xl text-gray-400`}>No Events</Text>
            </View>
          )}
        </Section>

        <BottomSheet
          isVisible={more}
          modalProps={{ animationType: "slide" }}
          onBackdropPress={() => setShowMore(false)}
        >
          <View style={tw`flex-1 bg-white pt-3 pb-5 px-4`}>
            <List
              icon="mail"
              iconColor="#374e51"
              title="Invitations"
              containerStyle={tw``}
              onPress={() => {
                setShowMore(false);
                navigation.navigate("Invitations");
              }}
            />
            <List
              icon="bookmark"
              iconColor="#374e51"
              title="Saved"
              containerStyle={tw`mb-2`}
              onPress={() => {
                setShowMore(false);
                navigation.navigate("Saved");
              }}
            />
          </View>
        </BottomSheet>
      </ScrollView>
    </SafeAreaView>
  );
}

export default UserProfileScreen;
