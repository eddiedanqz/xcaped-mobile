import React, { Fragment, useState ,useEffect} from "react";
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
import { Icon,BottomSheet } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import Section from "../../components/content/Section";
import TextButton from "../../components/buttons/TextButton";
import ListCard from "../../components/cards/ListCard";
import { BASEURL } from "@env";
import List from "../../components/content/List";
import { noImage } from "../../utils/helpers";


function UserProfileScreen({ navigation,route}) {
  const [authUser, setAuth] = useState({})
  const [user, setUser] = useState({})
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [events, setEvents] = useState([]);
  const [saved, setSaved] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [passedId, setPassedId] = useState(0);
  const [status, setStatus] = useState(null);
  const [routeId, setRouteId] = useState(route.params.id);


  const openSheet = (id) => {
    setPassedId(id)
    setShowModal(true)
  }

  //
  const closeSheet = () => {
    setPassedId(0)
    setShowModal(false);
  };

  //

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setAuth(JSON.parse(result))
    //   console.log(result)
    } else {
      alert('No values stored under that key.');
    }
  }

  const getProfile = (id) => {
    SecureStore.getItemAsync("mytoken").then((token) => {
  let parsed = JSON.parse(token)
const config = {
  headers: {
    Accept: "application/json", Authorization: `Bearer ${parsed}`,}
}
  axios.get(`${BASEURL}/api/profile/${id}`,config)
    .then((res) => {
      console.log('User Profile')
       setUser(res.data.user)
       setEvents(res.data.events)
       setSaved(res.data.savedCount)
       setFollowers(res.data.followers)
       setFollowing(res.data.following)
       setStatus(res.data.follows)
      } )
      .catch((err) => {
            console.log(err.response.data);
          });
        })
  }

  const toggleFollow = () => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token)
    const config = {
      headers: {
        Accept: "application/json", Authorization: `Bearer ${parsed}`,}
    }
      axios.post(`${BASEURL}/api/follow/${user.id}`,{id:''},config)
        .then((res) => {
          console.log(res.data)
          setStatus(!status)
          } )
          .catch((err) => {
                console.log(err.response.data);
              });
            })
  } 

  useEffect(() => {
   getValueFor('user')

   getProfile(route.params.id)
   

  }, [navigation,routeId])
  
  const renderProfileArea = () => {
    return (
      <View
          style={tw`absolute -top-16 w-28 h-28 self-center rounded-xl border-0 shadow-xl mb-3`}
        >
          <Image
            style={tw`w-full h-full bg-white rounded-xl`}
            source={user.profile?.profilePhoto ?
               {uri:`${BASEURL}/storage/images/user/${user.profile.profilePhoto}`} : noImage}
            resizeMode="center"
          />
        </View>

    );
  };

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <ScrollView style={tw`bg-gray-100 pb-4`}>
        {/*Header*/}
        <View
          style={tw`flex-row absolute w-full h-16 items-center justify-between mt-6 px-3 z-20`}
        >
          <TouchableOpacity
            style={tw`justify-center`}
            onPress={() => navigation.goBack()}
          >
            <Icon type="feather" name="arrow-left" size={20} color="white" />
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={tw`justify-center`}
            onPress={() => navigation.navigate("Settings")}
          >
            <Icon type="feather" name="more-vertical" size={20} color="white" />
          </TouchableOpacity> */}
        </View>
        <View>
          {/*Cover Image*/}
          <View style={tw`w-full h-48`}>
            <Image
              resizeMode="cover"
              style={tw`w-full h-52`}
              source={user.profile?.profilePhoto ?
                {uri:`${BASEURL}/storage/images/user/${user.profile.profilePhoto}`} : noImage}
              blurRadius={10}
            />
          </View>

          {/*Content*/}
          <View style={tw`rounded-t-3xl bg-white`}>
            {renderProfileArea()}
              <View style={tw`mt-14`}>

        <Text style={tw`text-2xl font-bold text-center text-gray-700`}>
          {user.username}
        </Text>
        {/**Location */}
        <View style={tw`flex-row mb-1 justify-center items-center`}>
          <Icon
            type="font-awesome-5"
            name="map-marker-alt"
            size={15}
            color="gray"
          />
          <Text style={tw`ml-1 text-gray-500 text-base`}>{user.profile?.location?
          user.profile?.location : 'N/A'}</Text>
        </View>

          {/*  Follow  */}
          <View style={tw`items-center bg-white my-3`}>
          {/* <Text style={tw`text-red-400 font-bold text-lg`}>Follow</Text> */}
         {authUser.id != user.id && ( <TextButton
            label={status ? 'Unfollow' : 'Follow'}
            buttonContainerStyle={[
              tw`bg-red-400 rounded-full shadow-xl p-1.5 w-28`,
            ]}
            onPress={() => toggleFollow()}
          />)}
          </View>
        {/**About */}
        {user.profile?.bio&& (
        <Text style={tw`font-bold text-gray-600 text-base text-center mt-3`}>
        {user.profile?.bio}
        </Text>
        )}
        {/** */}
        <View style={tw`justify-center items-center pb-4`}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`flex-row items-center`}
          >
            {/* <TouchableOpacity style={tw`items-center m-3`} onPress={() => navigation.navigate('My Events') }>
          <Text style={tw`text-base font-bold text-gray-700`}>10</Text>
          <Text style={tw`text-base text-gray-500`} >Events</Text>
        </TouchableOpacity> */}
            <View style={tw`items-center m-3`}>
              <Text style={tw`text-base font-bold text-gray-700`}>{following}</Text>
              <Text style={tw`text-base text-gray-500`}>Following</Text>
            </View>
            <View style={tw`items-center m-3`}>
              <Text style={tw`text-base font-bold text-gray-700`}>{followers}</Text>
              <Text style={tw`text-base text-gray-500`}>Followers</Text>
            </View>

            <TouchableOpacity
              style={tw`items-center m-3`}
              onPress={() => navigation.navigate("Saved")}
            >
              <Text style={tw`text-base font-bold text-gray-700`}>{saved}</Text>
              <Text style={tw`text-base text-gray-500`}>Saved</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        </View>

          </View>

          {/** My Events*/}
          <Section containerStyle={tw`bg-white px-4 pt-4 mb-5`}>
            <View style={tw`flex-row px-1`}>
              <Text
                style={tw`flex-1 font-bold text-gray-600 text-base  text-left`}
              >
                Events
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("My Events")}
              >
                <Text style={[tw`font-bold text-base `, { color: "#ff8552" }]}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            {events.map((item, i) => (
            <View key={item.id}>
            <ListCard
                       item={item}
                       onPress={() => navigation.navigate("Event", { item })}
                       iconName="more-vertical"
                       iconMethod={() =>  openSheet(item.id)}
                     />
               <BottomSheet isVisible={showModal}>
                  <View style={tw`bg-white p-3`}>
                  {/**Header */}
               <View style={tw`flex-row justify-end items-center pt-3 px-4`}>
                 <TouchableOpacity
                   style={tw`rounded-lg z-10`}
                  onPress={() => closeSheet()}
                 >
                   <Icon type="feather" name="x-circle" size={20} color="gray" />
                 </TouchableOpacity>
               </View>
               <List
                     icon="edit"
                     iconColor="#374e51"
                     title="Edit Event"
                     containerStyle={tw`border-0 mb-0`}
                     onPress={() => {
                       closeSheet();
                       
                        navigation.navigate("Edit Event", { id:passedId});
                     }}
                   />
                   <List
                     icon="edit"
                     iconColor="#374e51"
                     title="Edit Ticket"
                     containerStyle={tw`border-0 mb-2 pt-0`}
                     onPress={() => {
                       closeSheet();
                        navigation.navigate("Edit Ticket", { id:passedId ,count:item.ticket});
                     }}
                   />
                   </View>
               </BottomSheet>
               </View>
            ))}
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


export default UserProfileScreen;
