import React,{useState,useEffect} from "react";
import { StyleSheet, View, Image, TouchableOpacity,SafeAreaView ,ScrollView} from "react-native";
import {Icon, Text } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import tw from "tailwind-react-native-classnames";

import Reactions from "../../components/Reactions";
import Section from "../../components/Section";

const WelcomeScreen = ({ navigation,route }) => {
const [event, setEvent] = useState(null);
const [showReaction, setShowReaction] = useState(false)

useEffect(() => {
  let {item} =  route.params
  setEvent(item)

});

  
  return (
    <SafeAreaView style={tw`flex-1 bg-white mt-6`}>
      <ScrollView>
      {/*Banner Image*/}
      <View style={tw`self-stretch h-72`}>
        <Image
          resizeMode="cover"
          style={tw`w-full h-full`}
          source={event?.banner}
          
        />
        {/*Header*/}
        <View
          style={tw`flex-row absolute w-full h-16 items-center justify-between px-3`}
        >
          <TouchableOpacity
            style={tw`bg-black bg-opacity-40 p-2 rounded-md`}
            onPress={() => navigation.goBack()}
          >
            <Icon type="font-awesome-5" name="arrow-left" size={17} color="white" />
          </TouchableOpacity>

         <View style={tw`flex-row`}>

          {/**Save/Favourite */}
          <TouchableOpacity
          style={tw`bg-black bg-opacity-40 p-2 rounded-md mr-2`}
        >
          <Icon type="font-awesome-5" name="heart" size={17} color="white" />
        </TouchableOpacity>
        
          {/**Share*/}
          <TouchableOpacity
          style={tw`bg-black bg-opacity-40 p-2 rounded-md`}
        >
          <Icon type="font-awesome-5" name="share" size={17} color="white" />
        </TouchableOpacity>
         </View>
        </View>

      </View>
      
      {/*Content*/}
      <View style={tw`flex-1 p-4 mb-5 bg-white -top-5 rounded-t-3xl`}>
       
        {/*Category*/}
        <View style={[tw`flex-row items-center mb-1`]}>
          <Icon type="font-awesome-5" name="crown" color="#fdcc97" size={13}/>
        <Text style={[tw`text-lg rounded-lg font-bold mx-1`,{color:'#fdcc97'}]}>
          {event?.category}
        </Text>
         {/*Mood*/}
        <View style={tw`flex-row absolute right-0`}>
        <TouchableOpacity style={tw`flex-row`} onPress={() => setShowReaction(!showReaction)}>
        <View style={tw`w-7 h-7 mr-1 `}>
              <Image
                style={tw`w-full h-full`}
                source={require("../../assets/cool.png")}
              />
            </View>
              <Text style={tw`mr-1 text-base`}>55%</Text>
        </TouchableOpacity>
            </View>
            
        </View>

        {/*Title */}
        <Text h4 style={tw`my-2`}>
         {event?.title}
        </Text>

        {/*Date & Time*/} 
        <Section containerStyle={tw`p-1`} title='Date & Time'>
        <View style={tw`flex-row items-center`}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={23}
              color="gray"
            />
            <Text h5 style={tw`ml-1 text-lg font-bold text-gray-600`}>
             {event?.startDate}
            </Text>
            
          </View>
         {/*Time*/}
         <View style={tw`flex-row items-center mx-2`}>        
            <Text h5 style={tw`ml-5 text-lg text-gray-600`}>
           {event?.startTime}
            </Text>
            <Text h5 style={tw`text-lg text-gray-600 mx-5`}>
            -
            </Text>
            <Text h5 style={tw` text-lg text-gray-600`}>
            {event?.endTime}
            </Text>
          </View>
        </Section>

         <Section containerStyle={tw`p-1`} title='Location'>
         {/*Location*/}
         <View style={tw`flex-row items-center`}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={23}
              color="gray"
            />
            <Text h5 style={tw`ml-1 text-lg font-bold text-gray-600 my-2`}>
            {event?.location}
            </Text>
          </View>
         </Section>

           {/*Description*/}
           <Section containerStyle={tw`p-1`} title='Description'>
             <Text style={tw`text-lg font-normal`}>
             Mirage Hotel, East Legon Mirage Hotel, East Legon Mirage Hotel, East 
             Mirage Hotel, East Legon Mirage Hotel, East Legon Lorem ipsum.
             </Text>
           </Section>

            {/**Reactions */}
            <Section containerStyle={tw`p-0`}>
           <Reactions containerStyle={tw`-mt-5`}/>
            </Section>
       
           {/**Author */}
           <Section containerStyle={tw`p-0`}>
           <View style={tw`flex-row`}>
            <View style={tw`pl-1.5`}>
              <Image
                style={tw`mr-1 w-16 h-16 rounded-xl`}
                source={require("../../assets/picture.jpg")}
              />
            </View>
            <View style={tw`flex-col p-1`}>
              <Text style={tw`text-gray-700 text-lg`}>By</Text>
              <Text h4 style={tw` text-lg`}>eddie danqz</Text>
            </View>
          </View>
           </Section>

      </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  divider: {
    borderBottomColor:'black',
    borderBottomWidth:0.2,
    margin:5
  },
});

export default WelcomeScreen;
