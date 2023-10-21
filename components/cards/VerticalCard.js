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
import { noBanner } from "../../utils/helpers";
import { COLORS } from "../../constants/theme";

const VerticalEventCard = ({ containerStyle, item, onPress }) => {
  return (
    <View
      style={[
        tw`rounded-lg bg-white mb-3 mx-1`,
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
        <View style={tw`flex-1 justify-center h-48 w-[200px]`}>
          <Image
            source={
              item.banner
                ? { uri: `${BASEURL}/storage/images/uploads/${item.banner}` }
                : noBanner
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
            <Icon type="font-awesome-5" name="map" size={16} />
            <Text style={tw`text-sm ml-2`}>{item.distance.toFixed(2)} -km</Text>
          </View>
        </View>

        {/**Category */}
        <View style={tw`mt-1 flex-row`}>
          <Text
            h5
            style={[
              tw`text-sm text-gray-600 font-semibold mx-1`,
              { color: COLORS.primary },
            ]}
          >
            {item.category?.name}
          </Text>
        </View>
        {/**Event Title */}
        <Text style={tw`text-base font-bold ml-1`} numberOfLines={1}>
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerticalEventCard;
