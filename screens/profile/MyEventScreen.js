import React ,{Fragment, useEffect,useState}from 'react'
import {
    View,
    Image,
    FlatList,
    SafeAreaView,
    TouchableOpacity,Platform
  } from "react-native";
  import {
    Icon,
    Text,
  } from "react-native-elements";
  import tw from "tailwind-react-native-classnames";

  import TopHeader from "../../components/TopHeader";

const MyEventScreen = ({navigation}) => {
    const [events, setEvents] = useState([
        {
          id: 1,
          banner: require("../../assets/sosket.jpg"),
          title: "Event 11 Pool Party",
          category: "party",
          location: "Mirage Hotel, East Legon",
          startDate:'May 11 2021',startTime:'04:00',
          endDate:'May 12 2021',endTime:'06:00',
          distance:3.75,
          desription:'',
        },
        {
          id: 2,
          banner: require("../../assets/awards.jpg"),
          title: "VG Music Awarrds",
          category: "award",
          location: "Amasaman, Accra",
          startDate:'Feb 8 2022',startTime:'05:59',
          endDate:'', endTime:'12:00',
          desription:'',
          distance:5.55,
        },
        {
          id: 4,
          banner: require("../../assets/salaFest.jpg"),
          title: "Street Festival",
          category: "carnival",
          location: "Poolside Hotel, Accra,Ghana",
          startDate:'Jan 8 2022',startTime:'08:30',
          endDate:'Jan 31 2022',endTime:'12:00',
          desription:'',
          distance:15
        },
        
      ]);

      //
      const renderEvents = () => {
     
        //
         const renderItem = ({ item }) => (
             <View style={tw`mb-6 `}>
      <TouchableOpacity style={tw`justify-center`} onPress={() => navigation.navigate("Event",{item})}>
          <Image
            source={item.banner}
            resizeMode="cover"
            style={tw`w-full h-52 rounded-lg`}
          />
         
          <View style={tw`mt-1 flex-row`}>
            <View style={tw`pl-1.5`}>
              <Text h5 style={tw`text-base text-gray-600`}>
                #{item.category}
              </Text>
            </View>
            {/*Reactions*/}
            <View style={tw`flex-row absolute right-0`}>
              <Image
                style={tw`mr-1 w-7 h-7`}
                source={require("../../assets/cool.png")}
              />
              <Text style={tw`mr-1 text-base`}>55%</Text>
              <Image
                style={tw`mr-1 w-7 h-7`}
                source={require("../../assets/party.png")}
              />
              <Text style={tw`mr-1 text-base`}>10%</Text>
            </View>
          </View>
          <Text h4 style={tw`ml-1`}>
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
            <Text h5 style={tw`ml-1 text-base text-gray-600`}>
              {item.location}
            </Text>
          <TouchableOpacity style={tw`absolute right-0 mr-2`}>
          <Icon type='font-awesome-5' name='share' size={17} color='gray'/>
          </TouchableOpacity>
          </View>
      </TouchableOpacity>
      
      </View>
    );

        
    return (
        <FlatList
          data={events}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={tw`py-5`}
        />
      );
      }

  return (
      <View style={tw`flex-1 bg-white mt-6`}>
            <TopHeader
        title="My Events"
        leftIcon={
          <Icon type="font-awesome-5" name="arrow-left" size={20} color="white"
          onPress={() => navigation.goBack()} />
        }
        
      />
         
         <View style={tw`p-2 pb-20`}>{renderEvents()}</View>
      </View>
  )
}

export default MyEventScreen