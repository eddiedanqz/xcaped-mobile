import React, { useEffect, useState, } from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
 Image
} from "react-native";
import {  Text,Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";


const VerticalEventCard = ({containerStyle,item,onPress}) => {
  return (
    <View style={[tw`rounded-lg`,{width:200},containerStyle]}>
        {/**Save Icon
        <TouchableOpacity
          style={tw`flex-row absolute bg-white p-2 items-center right-3 top-0 z-10`}
          onPress={() => console.log("saved")}
        >
          <Icon type="font-awesome-5" name="heart" size={18}/>
        </TouchableOpacity>
*/}
        <TouchableOpacity
          style={tw`justify-center mb-5 `}
          onPress={onPress}
        >
          <View  style={[tw`h-60 rounded-lg w-full`]}>
          <Image
            source={item.banner}
            resizeMode="cover"
            style={[tw`h-full rounded-lg w-full`]}
          />
          {/**Distance */}
          <View
            style={[tw`flex-row bg-white 
          rounded-bl-md rounded-tr-lg p-2 items-center absolute bottom-0`,
      ]}
          >
            <Icon type="font-awesome-5" name="map" size={17} />
            <Text style={tw`text-base ml-2`}>
              {item.distance} km
            </Text>
          </View>
          </View>

          {/**Category */}
          <View style={tw`mt-1 flex-row`}>
            <View style={tw`flex-row items-center pl-1.5`}>
            <Icon type="font-awesome-5" name="crown" color="#fdcc97" size={13}/>
              <Text h5 style={[tw`text-base text-gray-600 font-bold mx-1`,{color:'#fdcc97'}]}>
                {item.category}
              </Text>
            </View>
            {/*Reactions*/}
            <View style={tw`flex-row absolute right-0`}>
              <Image
                style={tw`mr-1 w-7 h-7`}
                source={require("../assets/party.png")}
              />
              <Text style={tw`mr-1 text-base`}>10%</Text>
            </View>
          </View>
          {/**Event Title */}
          <Text style={tw`text-lg font-bold ml-1`} numberOfLines={1}>
            {item.title}
          </Text>
          {/*Location*/}
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
          </View>
        </TouchableOpacity>
      </View>
  )
}

export default VerticalEventCard