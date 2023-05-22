import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Text, Icon } from "react-native-elements";
import tw, { useDeviceContext } from "twrnc";
import * as SecureStore from "expo-secure-store";

import TopHeader from "../../components/TopHeader";
import VerticalCard from "../../components/cards/VerticalCard";
import HorizontalCard from "../../components/cards/HorizontalCard";
import CascadedCard from "../../components/cards/CascadedCard";
import ImageCard from "../../components/cards/ImageCard";
import FilterModal from "../../components/search/FilterModal";
import { BASEURL } from "@env";
import axios from "axios";

const ExploreScreen = ({ navigation }) => {
  useDeviceContext(tw);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [events, setEvents] = useState([]);

  const renderEvents = () => {
    //
    const renderItem = ({ item }) => (
      <ImageCard
        item={item}
        onPress={() => navigation.navigate("Event", { id:item.id  })}
      />
    );

    const renderLiveEvents = () => {
      return (
        <View>
          <View style={tw`flex-row my-5 p-1 px-2`}>
            <Text style={tw`flex-1 font-bold text-gray-700 text-base text-left`}>
              Live Events
            </Text>

            <TouchableOpacity>
              <Text style={[tw`font-bold text-base`, { color: "#ff8552" }]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={events}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <VerticalCard
                containerStyle={tw`mx-2`}
                item={item}
                onPress={() => navigation.navigate("Event", { id:item.id })}
              />
            )}
          />
        </View>
      );
    };

    const renderHeaderTitle = () => {
      return (
        <View style={tw`flex-row mt-5 mb-4 p-1 px-2`}>
          <Text style={tw`flex-1 font-bold text-gray-700 text-base text-left`}>
            Nearby Events
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Listing",{link:'events'})}>
            <Text style={[tw`font-bold text-base`, { color: "#ff8552" }]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <FlatList
        data={events}
        keyExtractor={(item) => `${item.id}`}
        ListHeaderComponent={
          <View>
            {/**Live */}
            {renderLiveEvents()}

            {/**Header Title */}
            {renderHeaderTitle()}
          </View>
        }
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={tw`py-5`}
      />
    );
  };
  
  const getEvents = () => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token)
      const config = {
        headers: {
          Accept: "application/json", Authorization: `Bearer ${parsed}`,}
      }
      axios.get(`${BASEURL}/api/events`,config)
        .then((res) => {
          //  console.log(res.data)
           setEvents(res.data.data)
          } )
          .catch((err) => {
                console.log(err.response.data);
              });
            })
  }
 
  useEffect(() => {
    getEvents()
    
    return () => {
      setEvents([])
    }
  },[]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View style={tw`overflow-hidden`}>
        <View
          style={[
            tw`flex-row w-full h-15 items-center justify-between px-4`,
            {
              // backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 1,
            },
          ]}
        >
          <Text h4 style={tw`text-black `}>
            xcaped
          </Text>

          <TouchableOpacity
            style={tw`justify-center`}
            onPress={() => navigation.navigate("Create")}
          >
            <Icon
              type="font-awesome-5"
              name="calendar-plus"
              size={20}
              color="#151618"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/**Filter 
         <TouchableOpacity style={[tw`absolute right-3 justify-center items-center 
         p-3 w-12 h-12 rounded-full bottom-5 z-10 shadow-md`,{backgroundColor:"#fdcc97"}]}
         onPress={() => setShowFilterModal(true)}>
         <Icon
            type="font-awesome-5"
              name="sliders-h"
              size={18}
              color="#151618"
            />
         </TouchableOpacity>*/}

      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      <View style={tw`pb-17`}>{renderEvents()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  shadow: {
    backgroundColor: "#fff",
    width: 300,
    height: 60,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default ExploreScreen;
