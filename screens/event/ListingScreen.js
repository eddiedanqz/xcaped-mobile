import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Text, Icon } from "react-native-elements";
import tw ,{ useDeviceContext } from "twrnc";

import TopHeader from "../../components/TopHeader";
import VerticalEventCard from "../../components/VerticalEventCard";
import FilterModal from "../../components/search/FilterModal";

const ListingScreen = ({ navigation }) => {
  useDeviceContext(tw); 
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [events, setEvents] = useState([
    {
      id: 1,
      banner: require("../../assets/sosket-1.jpg"),
      title: "Event 11 Pool Party",
      category: "Party",
      location: "Mirage Hotel, East Legon",
      startDate: "May 11 2021",
      startTime: "04:00",
      endDate: "May 12 2021",
      endTime: "06:00",
      distance: 3.75,
      desription: "",
    },
    {
      id: 2,
      banner: require("../../assets/awards.jpg"),
      title: "VG Music Awarrds",
      category: "Award",
      location: "Amasaman, Accra",
      startDate: "Feb 8 2022",
      startTime: "05:59",
      endDate: "",
      endTime: "12:00",
      desription: "",
      distance: 5.55,
    },
    {
      id: 3,
      banner: require("../../assets/picture.jpg"),
      title: "Code Arena",
      category: "Live music",
      location: "Accra, Ghana",
      startDate: "Feb 8 2021",
      startTime: "05:59",
      endDate: "Feb 9 202",
      endTime: "12:00",
      desription: "",
      distance: 25,
    },
    {
      id: 4,
      banner: require("../../assets/salaFest.jpg"),
      title: "Street Festival",
      category: "Carnival",
      location: "Poolside Hotel, Accra,Ghana",
      startDate: "Jan 8 2022",
      startTime: "08:30",
      endDate: "Jan 31 2022",
      endTime: "12:00",
      desription: "",
      distance: 15,
    },
  ]);

  const renderEvents = () => {
    //
    const renderItem = ({ item }) => (
      <View style={tw`mb-2 p-1 rounded-lg`}>
        {/**Save Icon*/}
        <TouchableOpacity
          style={tw`flex-row absolute bg-white p-2 items-center right-3 top-0 z-10`}
          onPress={() => console.log("saved")}
        >
          <Icon type="font-awesome-5" name="heart" size={17}/>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`justify-center mb-5 `}
          onPress={() => navigation.navigate("Event", { item })}
        >
          <View style={tw`h-64 w-full rounded-lg`}>
          <Image
            source={item.banner}
            resizeMode="cover"
            style={tw`h-full w-full rounded-lg`}
          />
          {/**Distance */}
          <View
            style={[tw`flex-row bg-white absolute
          rounded-bl-md rounded-tr-lg p-2 items-center`,{bottom:0}
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
              <Text style={[tw`text-base text-gray-600 font-bold mx-1`,{color:'#fdcc97'}]}>
                {item.category}
              </Text>
            </View>
            {/*Reactions*/}
            <View style={tw`flex-row absolute right-0`}>
            <View style={tw`w-7 h-7 mr-1 `}>
              <Image
                style={tw`w-full h-full`}
                source={require("../../assets/cool.png")}
              />
              </View>
              <Text style={tw`mr-1 text-base`}>55%</Text>
            </View>
          </View>
          {/**Event Title */}
          <Text style={tw`text-lg font-bold ml-1`}  numberOfLines={1}>
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
            <Text style={tw`ml-1 text-base text-gray-600`}>
              {item.location}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );

   const renderLiveEvents = () => {
     return (
       <View>
         <View style={tw`flex-row my-4 p-1`}>
          <Text style={tw`flex-1 font-bold text-gray-900 text-lg text-left`}>Live Events</Text>
          
          <TouchableOpacity>
          <Text style={[tw`font-bold text-lg`,{color:'#fdcc97'}]}>See All</Text>
          </TouchableOpacity>
         </View>

          <FlatList
          data={events}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={ ({item,index}) => (
          <VerticalEventCard
            containerStyle={tw`mx-3`}
              item={item}
              onPress={() => navigation.navigate("Event", {item})}
           />

          )}
          />
        </View>
     )
   }


   const renderHeaderTitle = () => {
   return (
    <View style={tw`flex-row my-4 p-1`}>
    <Text style={tw`flex-1 font-bold text-gray-900 text-lg text-left`}>Nearby Events</Text>
    
    <TouchableOpacity>
    <Text style={[tw`font-bold text-lg`,{color:'#fdcc97'}]}>See All</Text>
    </TouchableOpacity>
   </View>
   )}


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

  return (
    <SafeAreaView style={tw`flex-1 bg-white dark:bg-black mt-6`}>
      {/*Header*/}
      <View style={tw`overflow-hidden pb-1`}>
      <View
          style={[tw`flex-row w-full h-16 items-center justify-between px-3`,
          {backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 1,}
        ]}
        >
         <Text h4 style={tw`text-black `}>
          xcaped
        </Text>

          <TouchableOpacity style={tw`justify-center`} onPress={() => navigation.navigate('Create')}>
            <Icon
            type="font-awesome-5"
              name="calendar-plus"
              size={20}
              color="#151618"
            />
          </TouchableOpacity>
        </View>

      </View>
       
       {/**Filter */}
         <TouchableOpacity style={[tw`absolute right-3 justify-center items-center 
         p-3 w-12 h-12 rounded-full bottom-5 z-10 shadow-md`,{backgroundColor:"#fdcc97"}]}
         onPress={() => setShowFilterModal(true)}>
         <Icon
            type="font-awesome-5"
              name="sliders-h"
              size={18}
              color="#151618"
            />
         </TouchableOpacity>

       {showFilterModal &&      
      <FilterModal isVisible={showFilterModal} onClose={() => setShowFilterModal(false)}/>
      }

      <View style={tw`px-2 pb-17`}>
        {renderEvents()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  shadow:{
    backgroundColor: '#fff',
          width: 300,
          height: 60,
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 5,
  }
});

export default ListingScreen;
