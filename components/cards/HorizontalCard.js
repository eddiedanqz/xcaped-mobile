import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Text, Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { BASEURL } from "@env";

const noImage = require("../../assets/banner-placeholder.png")

const HorizontalEventCard = ({ containerStyle, item, onPress }) => {
  return (
    <TouchableOpacity style={[tw`bg-white mb-4 mx-4 rounded-md shadow-lg`,{containerStyle}]} onPress={onPress}>
      <View style={tw`flex-row items-center border-b border-gray-300 p-1`}>
        <Image
         source={item.banner ? {uri:  `${BASEURL}/storage/images/uploads/${item.banner}` } : noImage }
          resizeMode="stretch"
          style={tw`w-24 h-24 rounded`}
        />
        <View style={tw`flex-1 justify-center ml-2 `}>
            {/**Ticket Price */}
            {item.ticket.length > 0  && (
                <View
                  style={[
                    tw`flex-row text-left self-start items-center rounded `,
                  ]}
                >
                  <Icon
                    type="font-awesome"
                    name="ticket"
                    color="black"
                    size={17}
                    style={tw`mr-1`}
                  />
                  {item.ticket?.map((ticket, i) => {
                    return (
                      <Text
                        key={`${ticket.id}`}
                        style={[
                          tw`text-sm text-gray-600 font-bold text-black`,
                        ]}
                      >
                        ${ticket.price}
                        {i + 1 !== item.ticket.length ? " - " : ""}
                      </Text>
                    );
                  })}
                </View>
              )}
          {/**Title */}
          <Text style={tw`text-lg font-bold`}> {item.title} </Text>
          {/**Location */}
          <View style={tw`flex-row items-center`}>
          <Icon
                    type="feather"
                    name="map-pin"
                    color="black"
                    size={16}
                  />
          <Text style={tw`text-base text-gray-600`}> {item.venue} </Text>
          </View>
        </View>
      </View>
      {/**Extra Content */}
      <View style={tw`flex-row justify-between items-center p-1`}>
        {/**Category */}
        <View style={[
            tw`rounded-xl px-2 py-1 items-center`,
            { backgroundColor: "#ff8552", color: "white" },
          ]}>
        <Text style={[
            tw`text-sm font-semibold`,
            { backgroundColor: "#ff8552", color: "white" },
          ]}>
          {item.category?.name}
        </Text>
        </View>
        <View style={tw`flex-row items-center`}>
        {/**Distance
        <View style={tw`flex-row items-center border-r border-gray-400 px-1 mr-1`}>
          <Icon
            type="feather"
            name="map"
            size={15}
            color="#151618"
          />
          <Text style={tw`text-base text-gray-800 ml-1`}>
            {item.distance} -km
          </Text>
        </View> */}
        {/**Date */}
        <Text style={[tw`text-base font-semibold`, { color: "#151618" }]}>
        {new Date(item.start_date).toDateString()}
        </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalEventCard;
