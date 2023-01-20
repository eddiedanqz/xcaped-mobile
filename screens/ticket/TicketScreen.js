import React, { Fragment, useState,useEffect } from "react";
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
import tw from "tailwind-react-native-classnames";
import { Icon, BottomSheet } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import moment from "moment";

import { BASEURL } from "@env";
import List from "../../components/content/List";
import TextButton from "../../components/buttons/TextButton";
import ShareModal from "../../components/modal/ShareModal";

const TicketScreen = ({navigation}) => {
  const [showMore, setShowMore] = useState(false);
  const [passedId, setPassedId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);

  const openSheet = (id) => {
    setPassedId(id)
    setShowMore(true)
  }

  //
  const closeSheet = () => {
    // setPassedId(0)
    setShowMore(false);
  };
 
  //
  const renderTickets = () => {
    //
    const renderItem = ({ item }) => (
      <View
        style={tw`flex-row justify-between mb-4 p-1 w-full bg-white rounded-lg shadow`}
      >
        {/**Content */}
        <TouchableOpacity style={tw`flex-row p-2`} onPress={() => navigation.navigate('Show Ticket',{id:item.id})}>
          <View style={[tw`w-8/12`]}>
            <Text style={tw`text-sm text-gray-500 font-semibold`}>
              Event Name
            </Text>
            <Text
              style={tw`text-base text-gray-700 font-bold`}
              numberOfLines={1}
            >
              {item.event.title}
            </Text>

            <Text style={tw`text-sm text-gray-500 font-semibold mt-2`}>
              Date
            </Text>
            <View style={tw`flex-row`}>
              <Text style={tw`text-base text-gray-700 font-bold`}>
                {moment(item.event.start_date).format("DD MMM")}
              </Text>
              <Text style={tw`text-base text-gray-700 font-bold mx-5`}>
                
                {item.event.start_time}
              </Text>
            </View>
          </View>
          {/**border */}
          <View style={tw`border border-dashed border-gray-200 rounded-full`}>
            <View
              style={[
                tw`bg-gray-100 absolute rounded-full -left-2 p-2`,
                { top: -25 },
              ]}
            ></View>
            <View
              style={[
                tw`bg-gray-100 absolute rounded-full -left-2 p-2`,
                { bottom: -25 },
              ]}
            ></View>
          </View>
          <View style={tw`px-3 w-4/12`}>
            <Text style={tw`text-sm text-gray-500 font-semibold`}></Text>
            <Text style={tw`text-base text-gray-700 font-bold`}>
              {item.ticket.title}
            </Text>
            <Text style={tw`text-sm text-gray-500 font-semibold mt-2`}>
              Price
            </Text>
            <Text style={tw`text-base text-green-400 font-bold`}>
              <Text style={tw`text-xs text-green-400 font-bold`}>GHC</Text>
              {item.ticket.price}
            </Text>
          </View>
        </TouchableOpacity>
        {/**Icon */}
        <TouchableOpacity style={tw`absolute right-1 top-1`} onPress={() =>  openSheet(item.id)}>
          <Icon
            type="feather"
            name="more-horizontal"
            size={19}
            color="gray"
            containerStyle={tw`rounded p-2`}
          />
        </TouchableOpacity>
        {/**Modal*/}
        <BottomSheet isVisible={showMore} modalProps={{ animationType:"slide",}}
         onBackdropPress={()=> closeSheet()}>
        <View style={tw`flex-1 bg-white py-6 px-4`}>
        <List
              icon="share-2"
              iconColor="#374e51"
              title="Change Ownership"
              containerStyle={tw``}
              onPress={() => {
                setShowModal(true);
                closeSheet();
              }}
            />
        <TextButton label='Cancel' buttonContainerStyle={tw`bg-transparent p-1`}
        labelStyle={tw`text-black`} onPress={()=>closeSheet()}/>
            </View>
        </BottomSheet>
      </View>
    );

    return (
      <FlatList
        data={events}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={tw`py-4`}
      />
    );
  };

 const getData = () => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .get(`${BASEURL}/api/my-tickets`, config)
        .then((res) => {
          let { data } = res.data;
          // console.log(data)
          setEvents(data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  useEffect(() => {
    getData();

  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View
        style={tw`bg-white flex-row w-full h-16 items-center justify-center mt-6 px-4 z-20`}
      >
        <TouchableOpacity>
          <Text
            style={[
              tw`text-black text-gray-700 text-lg font-bold`,
              // {color:'#ff8552'}
            ]}
          >
            My Tickets
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-1 bg-gray-100`}>
        <View style={tw`m-2 pb-20 px-1`}>{renderTickets()}</View>
      </View>
      {/**Filter */}
      {showModal && (
        <ShareModal
          isVisible={showModal}
          onClose={() => {getData();
            setShowModal(false);
          }}
          ticketId ={passedId}
        />
      )}
    </View>
  );
};

export default TicketScreen;
