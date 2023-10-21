import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Text, Icon } from "@rneui/themed";
import tw from "twrnc";
import { BASEURL } from "@env";

const noImage = require("../../assets/salaFest.jpg");

const CascadedEventCard = ({ containerStyle, item, onPress }) => {
  return (
    <View style={tw`rounded bg-white border border-gray-100 mb-5 mx-3 p-2`}>
      {/**Save Icon*/}
      {/* <TouchableOpacity
      style={tw`flex-row absolute bg-white p-2 items-center right-3 top-0 z-10`}
      onPress={() => console.log("saved")}
    >
      <Icon type="font-awesome-5" name="heart" size={17}/>
    </TouchableOpacity> */}

      <TouchableOpacity style={tw`justify-center pb-2 `} onPress={onPress}>
        <View style={tw`h-56 w-full rounded shadow-lg`}>
          <Image
            source={
              /*item.banner
                ? { uri: `${BASEURL}/storage/images/uploads/${item.banner}` }
                : */ noImage
            }
            resizeMode="stretch"
            style={tw`h-full w-full rounded`}
          />
          {/**Distance */}
          <View
            style={[
              tw`flex-row bg-white absolute
      rounded-bl-sm rounded-tr-lg p-1 items-center`,
              { bottom: 0 },
            ]}
          >
            <Icon type="font-awesome-5" name="map" size={17} />
            <Text style={tw`text-base ml-2`}>{item.distance} -km</Text>
          </View>
        </View>

        {/**Category */}
        <View style={tw`mt-1 flex-row`}>
          <View style={tw`flex-row items-center pl-2`}>
            <Icon
              type="font-awesome-5"
              name="crown"
              color="#fdcc97"
              size={13}
            />
            <Text
              style={[
                tw`text-base text-gray-600 font-bold mx-1`,
                { color: "#fdcc97" },
              ]}
            >
              {item.category?.name}
            </Text>
          </View>
          {/*Reactions*/}
          {/* <View style={tw`flex-row absolute right-1 top-1`}>
        <View style={tw`w-6 h-6 mr-1 `}>
          <Image
            style={tw`w-full h-full`}
            source={require("../../assets/cool.png")}
          />
          </View>
          <Text style={tw`mr-1 text-base`}>55%</Text>
        </View> */}
        </View>
        {/**Event Title */}
        <Text style={tw`text-lg font-bold ml-2`} numberOfLines={1}>
          {item.title}
        </Text>
        {/*Location*/}
        <View style={tw`flex-row items-center ml-2`}>
          <Icon
            type="font-awesome-5"
            name="map-marker-alt"
            size={16}
            color="gray"
          />
          <Text style={tw`ml-1 text-base text-gray-600`}>{item.venue}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CascadedEventCard;
