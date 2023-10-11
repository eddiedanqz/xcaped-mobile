import React, { useEffect, useState } from "react";
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
import { Icon, Input } from "react-native-elements";
import QRCode from "react-native-qrcode-svg";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import moment from "moment";

import { BASEURL } from "../../config/config";

const ShowTicketScreen = ({ navigation, route }) => {
  const [ticket, setTicket] = useState({});

  const getData = (id) => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .get(`${BASEURL}/api/my-ticket/${id}`, config)
        .then((res) => {
          let { data } = res.data;
          console.log(data);
          setTicket(data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  useEffect(() => {
    let { id } = route.params;
    getData(id);
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View
        style={tw`flex-row w-full h-16 items-center justify-between mt-6 px-4 z-20`}
      >
        <TouchableOpacity
          style={tw`justify-center`}
          onPress={() => navigation.goBack()}
        >
          <Icon
            type="feather"
            name="arrow-left"
            size={20}
            color="#151618"
            containerStyle={tw`p-1 rounded-full`}
          />
        </TouchableOpacity>

        <Text
          style={[
            tw`text-black text-gray-700 text-lg font-bold`,
            // {color:'#ff8552'}
          ]}
        >
          Ticket
        </Text>
      </View>

      <View style={tw`flex-1 bg-gray-100 p-2`}>
        <View style={tw`items-center mt-6`}>
          <View style={tw`bg-white rounded-lg py-2 px-5`}>
            <Text style={tw`text-base text-center text-gray-700 font-bold m-2`}>
              Scan This Qr Code
            </Text>
            {/**Qr Code */}
            <View
              style={tw`bg-gray-100 justify-center items-center rounded-md p-5`}
            >
              <QRCode
                enableLinearGradient={true}
                linearGradient={["#0484ce", "#1d4d84"]}
                size={252}
                value={JSON.stringify({
                  id: ticket.id,
                  reference: ticket.reference,
                })}
              />
            </View>
            {/**border */}
            <View style={tw`border border-dashed border-gray-200 my-6`}>
              <View
                style={tw`absolute bg-gray-100 rounded-full p-4 -top-4 -left-9`}
              ></View>
              <View
                style={tw`absolute bg-gray-100 rounded-full p-4 -top-4 -right-9`}
              ></View>
            </View>
            {/**Content */}
            <View style={tw``}>
              <Text
                style={tw`text-base text-center text-gray-700 font-bold m-2`}
              >
                {ticket.event?.title}
              </Text>
              <Text style={tw`text-base text-center text-gray-600`}>
                {ticket.event?.venue}
              </Text>
              <View style={tw`flex-row justify-between m-2`}>
                <View>
                  <Text style={tw`text-base text-gray-500`}>Date</Text>
                  <Text style={tw`text-lg text-gray-700 font-semibold`}>
                    {moment(ticket.event?.start_date).format("DD MMM YYYY")}
                  </Text>
                </View>
                <View>
                  <Text style={tw`text-base text-right text-gray-500`}>
                    Time
                  </Text>
                  <Text
                    style={tw`text-lg text-right text-gray-700 font-semibold`}
                  >
                    {ticket.event?.start_time}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row justify-between m-2`}>
                <View>
                  <Text style={tw`text-base text-gray-500`}>Type</Text>
                  <Text style={tw`text-lg text-gray-700 font-semibold`}>
                    {ticket.ticket?.title}
                  </Text>
                </View>
                <View>
                  <Text style={tw`text-base text-right text-gray-500`}>
                    Price
                  </Text>
                  <Text
                    style={tw`text-lg text-right text-green-400 font-semibold`}
                  >
                    GHC{ticket.ticket?.price}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShowTicketScreen;
