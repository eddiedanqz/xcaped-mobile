import React,{useState} from 'react'
import {StyleSheet,View,TextInput,Image,Text,ScrollView,
       TouchableWithoutFeedback , TouchableOpacity,
       FlatList,} from "react-native";
import {Icon} from "react-native-elements";
import tw from "tailwind-react-native-classnames";

import FilterModal from "../../components/search/FilterModal";


const SearchScreen = ({navigation}) => {
const [showFilterModal, setShowFilterModal] = useState(false)
const [events, setEvents] = useState([
  {
    id: 1,
    banner: require("../../assets/sosket.jpg"),
    title: "Event 11 Pool Party",
    category: "party",
    location: "Mirage Hotel, East Legon",
    startDate:'May 11 2021',startTime:'04:00',
    endDate:'May 12 2021',endTime:'06:00',
    desription:''
  },
  {
    id: 2,
    banner: require("../../assets/awards.jpg"),
    title: "VG Music Awarrds",
    category: "award",
    location: "Amasaman, Accra",
    startDate:'Feb 8 2022',startTime:'05:59',
    endDate:'', endTime:'12:00',
    desription:''
  },
  {
    id: 3,
    banner: require("../../assets/picture.jpg"),
    title: "Code Arena",
    category: "live music",
    location: "Accra, Ghana",
    startDate:'Feb 8 2021',startTime:'05:59',
    endDate:'Feb 9 202',endTime:'12:00',
    desription:''
  },
  {
    id: 4,
    banner: require("../../assets/salaFest.jpg"),
    title: "Street Festival",
    category: "carnival",
    location: "Poolside Hotel,Accra,Ghana",
    startDate:'Jan 8 2022',startTime:'08:30',
    endDate:'Jan 31 2022',endTime:'12:00',
    desription:''
  },
]);

 // 
const renderItem = ({item}) => (
  <TouchableOpacity style={tw`bg-white mb-3 mx-4 p-2 rounded-md shadow-lg`} onPress={() => navigation.navigate("Event",{item})}>
          <View style={tw`flex-row  h-32  items-center  border-b border-gray-300`}>
        <Image
            source={item.banner}
            resizeMode="cover"
            style={tw`w-28 h-28 rounded`}
          />
            <View style={tw`flex-1 justify-center ml-2 `}>
          {/**Title */}
              <Text style={tw`text-lg font-bold`}> {item.title} </Text>
              {/**Location */}
              <Text style={tw`text-base text-gray-600`}> {item.location} </Text>

              </View>
          </View>
          {/**Extra Content */}
            <View style={tw`flex-row justify-between p-1`}>
               {/**Category */}
              <Text style={[tw`text-base font-semibold rounded-lg px-2`,
              {backgroundColor:'#fdcc97',color:'#151618'}]}>
                {item.category}
              </Text>
               {/**Date */}
              <Text style={[tw`text-base font-semibold`,{color:'#151618'}]}>
                {item.startDate}
              </Text>
            </View>
        </TouchableOpacity>

)


    return (
      <View style={tw`flex-1 mt-6 bg-white`}>
        {/**Search */}
        <View style={tw`overflow-hidden pb-1`}>
        <View style={[tw`flex-row items-center justify-center px-5`,
        {backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 1,}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <Icon type='font-awesome-5' name='arrow-left' size={20} />
        </TouchableOpacity>
     
      <View style={tw`flex-row items-center bg-gray-300 ml-3 my-1 p-2 rounded-lg`} >
        <TextInput  style={tw`flex-1 text-lg`} placeholder='Search...'/>

        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Icon name='sliders-h' type='font-awesome-5' size={20}/>
        </TouchableOpacity>
      </View>

      </View>
      </View>

      {/**Filter */}
      {showFilterModal &&      
      <FilterModal isVisible={showFilterModal} onClose={() => setShowFilterModal(false)}/>
      }
       {/**Search Results */}
        <FlatList 
         data={events}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={tw`py-5`}/>
      </View>
    )
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
  },
});

export default SearchScreen
