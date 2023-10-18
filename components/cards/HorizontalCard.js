import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text, Icon } from "@rneui/themed";
import tw from "twrnc";
import { BASEURL } from "@env";
import { noImage } from "../../utils/helpers";

const HorizontalEventCard = ({ containerStyle, item, onPress }) => {
  return (
    <TouchableOpacity
      style={[tw`bg-white mb-3 rounded-md`, containerStyle]}
      onPress={onPress}
    >
      <View
        style={tw`flex-row items-center border-b border-gray-200 py-2 px-3`}
      >
        <Image
          source={
            item.banner
              ? { uri: `${BASEURL}/storage/images/uploads/${item.banner}` }
              : noImage
          }
          resizeMode="stretch"
          style={tw`w-24 h-24 rounded`}
        />
        <View style={tw`flex-1 justify-center ml-2 `}>
          {/**Ticket Price */}
          {item.ticket.length > 0 && (
            <View
              style={[tw`flex-row text-left self-start items-center rounded `]}
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
                    style={[tw`text-sm text-gray-600 font-bold text-black`]}
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
            <Icon type="feather" name="map-pin" color="black" size={16} />
            <Text style={tw`text-base text-gray-600`}> {item.venue} </Text>
          </View>
        </View>
      </View>
      {/**Extra Content */}
      <View style={tw`flex-row justify-between items-center py-1 px-4`}>
        {/**Category */}
        <View
          style={[
            tw`rounded-xl px-2 py-1 items-center`,
            { backgroundColor: "#ff8552", color: "white" },
          ]}
        >
          <Text
            style={[
              tw`text-sm font-semibold`,
              { backgroundColor: "#ff8552", color: "white" },
            ]}
          >
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
          <Text style={[tw`text-sm font-semibold`, { color: "#151618" }]}>
            {new Date(item.start_date).toDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalEventCard;
