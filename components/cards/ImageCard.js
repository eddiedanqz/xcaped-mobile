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
import { noBanner } from "../../utils/helpers";

const CascadedEventCard = ({ containerStyle, item, onPress }) => {
  return (
    <View style={tw`rounded-xl mb-5 mt-1 mx-3`}>
      {/**Save Icon
    <TouchableOpacity
      style={tw`flex-row absolute bg-white p-2 items-center right-3 top-0 z-10`}
      onPress={() => console.log("saved")}
    >
      <Icon type="font-awesome-5" name="heart" size={17}/>
    </TouchableOpacity>*/}

      <TouchableOpacity style={tw`justify-center`} onPress={onPress}>
        <View style={tw`h-60 w-full  rounded-xl`}>
          <Image
            source={
              item.banner
                ? { uri: `${BASEURL}/storage/images/uploads/${item.banner}` }
                : noBanner
            }
            resizeMode="stretch"
            style={tw`h-full w-full rounded-xl`}
          />
          {/**Overlay */}
          <View
            style={[
              tw`flex-1 bg-black w-full h-full rounded-xl absolute inset-0 bg-opacity-30`,
            ]}
          >
            <View style={tw`flex-1 justify-end px-6 pb-2 w-full h-full`}>
              {/* Category  */}
              {item.ticket.length > 0 && (
                <View
                  style={[
                    tw`flex-row text-left self-start items-center rounded mb-1 p-1 `,
                    { backgroundColor: "#ff8552" },
                  ]}
                >
                  <Icon
                    type="font-awesome"
                    name="ticket"
                    color="white"
                    size={16}
                    style={tw`mr-1`}
                  />
                  {item.ticket?.map((ticket, i) => {
                    return (
                      <Text
                        key={`${ticket.id}`}
                        style={[tw`text-xs text-gray-600 font-bold text-white`]}
                      >
                        ${ticket.price}
                        {i + 1 !== item.ticket.length ? " - " : ""}
                      </Text>
                    );
                  })}
                </View>
              )}
              {/**Event Title */}
              <Text style={tw`text-white text-2xl font-bold`} numberOfLines={1}>
                {item.title}
              </Text>

              <View style={tw`mt-1 flex-row  justify-between`}>
                {/*Category*/}
                <View style={tw`flex-row items-center`}>
                  <Icon
                    type="font-awesome-5"
                    name="crown"
                    size={16}
                    color="white"
                  />
                  <Text style={tw`ml-1 text-base text-white`}>
                    {item.category?.name}
                  </Text>
                </View>
                {/**Date */}
                <View style={tw`flex-row items-center`}>
                  <Icon
                    type="font-awesome-5"
                    name="clock"
                    size={16}
                    color="white"
                  />
                  <Text style={tw`ml-1 text-base text-white`}>
                    {new Date(item.start_date).toDateString()}
                  </Text>
                </View>
              </View>

              <View style={tw`flex-row p-1 items-center`}>
                {/**Distance */}
                <View style={tw`flex-row items-center`}>
                  <Icon
                    type="font-awesome-5"
                    name="map"
                    size={17}
                    color="white"
                  />
                  <Text style={tw`text-base text-white ml-2`}>
                    {item.distance?.toFixed(2)} -km
                  </Text>
                </View>

                {/*Reactions**/}
                {/* <View style={tw`flex-row items-center absolute right-1 top-1`}>
                  <View style={tw`w-6 h-6 mr-1 `}>
                    <Image
                      style={tw`w-full h-full`}
                      source={require("../../assets/cool.png")}
                    />
                  </View>
                  <Text style={tw`mr-1 text-white text-base`}>55%</Text>
                </View> */}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CascadedEventCard;
