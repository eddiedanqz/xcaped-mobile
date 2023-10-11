import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Text, Icon } from "react-native-elements";
import tw from "twrnc";
import { BASEURL } from "@env";

const noImage = require("../../assets/banner-placeholder.png");

const VerticalEventCard = ({ containerStyle, item, onPress }) => {
  return (
    <View
      style={[
        tw`rounded-lg bg-white shadow-lg mb-3 mx-1`,
        { width: 200 },
        containerStyle,
      ]}
    >
      {/**Save Icon
        <TouchableOpacity
          style={tw`flex-row absolute bg-white p-2 items-center right-3 top-0 z-10`}
          onPress={() => console.log("saved")}
        >
          <Icon type="font-awesome-5" name="heart" size={18}/>
        </TouchableOpacity>
*/}
      <TouchableOpacity style={tw`justify-center mb-5`} onPress={onPress}>
        <View style={[tw`flex-1 justify-center h-48 `, { width: 200 }]}>
          <Image
            source={
              item.banner
                ? { uri: `${BASEURL}/storage/images/uploads/${item.banner}` }
                : noImage
            }
            resizeMode="stretch"
            style={[tw`h-full w-full rounded-lg self-center `]}
          />
          {/**Distance */}
          <View
            style={[
              tw`flex-row bg-white 
          rounded-bl-sm rounded-tr-lg p-1 items-center absolute bottom-0`,
            ]}
          >
            <Icon type="font-awesome-5" name="map" size={17} />
            <Text style={tw`text-base ml-2`}>
              {item.distance.toFixed(2)} -km
            </Text>
          </View>
        </View>

        {/**Category */}
        <View style={tw`mt-1 flex-row`}>
          <View style={tw`flex-row items-center pl-1.5`}>
            <Icon
              type="font-awesome-5"
              name="crown"
              color="#ff8552"
              size={13}
            />
            <Text
              h5
              style={[
                tw`text-sm text-gray-600 font-semibold mx-1`,
                { color: "#ff8552" },
              ]}
            >
              {item.category?.name}
            </Text>
          </View>
          {/*Reactions*/}
          {/* <View style={tw`flex-row absolute right-0`}>
            <Image
              style={tw`mr-1 w-6 h-6`}
              source={require("../../assets/party.png")}
            />
            <Text style={tw`mr-1 text-base`}>10%</Text>
          </View> */}
        </View>
        {/**Event Title */}
        <Text style={tw`text-lg font-bold ml-1`} numberOfLines={1}>
          {item.title}
        </Text>
        {/*Location
          <View style={tw`flex-row items-center ml-1`}>
            <Icon
             type="font-awesome-5"
              name="map-marker-alt"
              size={16}
              color="gray"
            />
            <Text style={tw`ml-1 text-base text-gray-600`}  numberOfLines={1}>
              {item.location}
            </Text>
          </View>*/}
      </TouchableOpacity>
    </View>
  );
};

export default VerticalEventCard;
