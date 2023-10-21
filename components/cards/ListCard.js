import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Image,
  Text,
} from "react-native";
import { Icon } from "@rneui/themed";
import tw from "twrnc";
import { BASEURL } from "@env";
import List from "../content/List";

const noImage = require("../../assets/banner-placeholder.png");

const ListCard = ({
  containerStyle,
  item,
  onPress,
  iconName,
  iconMethod,
  isVisible,
  activeItem,
}) => {
  // const [showModal, setShowModal] = useState(isVisible);
  const [id, setId] = useState(null);

  return (
    <View
      style={[
        tw`flex-row justify-between items-center mb-2 p-1`,
        containerStyle,
      ]}
    >
      <View style={tw`flex-row items-center w-8/12`}>
        <TouchableOpacity
          style={tw`flex-row items-center w-11/12`}
          onPress={onPress}
        >
          <Image
            source={
              item.banner
                ? { uri: `${BASEURL}/storage/images/uploads/${item.banner}` }
                : noImage
            }
            resizeMode="stretch"
            style={tw`w-28 h-24 rounded`}
          />
          <View style={tw`px-1`}>
            {/**Title */}
            <Text style={tw`text-base font-bold`} numberOfLines={1}>
              {" "}
              {item.title}{" "}
            </Text>
            {/**Location */}
            <Text numberOfLines={1} style={tw`text-base`}>
              {item.venue}
            </Text>
            {item.ticket.length > 0 && (
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
                  style={tw`mx-1`}
                />
                {item.ticket?.map((ticket, i) => {
                  return (
                    <Text
                      key={`${ticket.id}`}
                      style={[tw`text-lg text-gray-600 font-bold text-black`]}
                    >
                      ${ticket.price}
                      {i + 1 !== item.ticket.length ? " - " : ""}
                    </Text>
                  );
                })}
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {iconName && (
        <TouchableOpacity style={tw``} onPress={iconMethod}>
          <Icon type="feather" name={iconName} size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListCard;
