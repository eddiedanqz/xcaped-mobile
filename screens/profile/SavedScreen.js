import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Icon, Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

import TopHeader from "../../components/TopHeader";

const SavedScreen = ({navigation}) => {
  const [events, setEvents] = useState([
    {
      id: 1,
      banner: require("../../assets/sosket.jpg"),
      title: "Event 11 Pool Party",
      category: "party",
      location: "Mirage Hotel, East Legon",
      startDate: "May 11 2021",
      startTime: "04:00",
      endDate: "May 12 2021",
      endTime: "06:00",
      desription: "",
    },
    {
      id: 2,
      banner: require("../../assets/awards.jpg"),
      title: "VG Music Awarrds",
      category: "award",
      location: "Amasaman, Accra",
      startDate: "Feb 8 2022",
      startTime: "05:59",
      endDate: "",
      endTime: "12:00",
      desription: "",
    },
    {
      id: 4,
      banner: require("../../assets/salaFest.jpg"),
      title: "Street Festival",
      category: "carnival",
      location: "Poolside Hotel,Accra,Ghana",
      startDate: "Jan 8 2022",
      startTime: "08:30",
      endDate: "Jan 31 2022",
      endTime: "12:00",
      desription: "",
    },
  ]);

  //
  const renderItem = ({ item }) => (
    <View style={tw`mx-4 p-2 rounded-md`}>
      <TouchableOpacity
        style={tw`flex-row  h-32  items-center`}
        onPress={() => navigation.navigate("Event", { item })}
      >
        <Image
          source={item.banner}
          resizeMode="cover"
          style={tw`w-28 h-28 rounded`}
        />
        <View style={tw`flex-1 justify-center ml-2 `}>
          {/**Title */}
          <Text style={tw`text-lg font-bold`}> {item.title} </Text>
          {/**Location */}
          <Text style={tw`text-base`}> {item.location} </Text>
        </View>
      </TouchableOpacity>
        {/** */}
        <TouchableOpacity style={tw`absolute right-0 bottom-14`}>
        <Icon type="font-awesome-5" name="ellipsis-h" size={18} />
        </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white mt-6`}>
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

      {/**Search Results */}
      <FlatList
        data={events}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={tw`py-5`}
      />
    </View>
  );
};

export default SavedScreen;
