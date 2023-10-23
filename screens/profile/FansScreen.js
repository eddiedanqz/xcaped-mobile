import React, { useEffect, useState, useRef, Fragment } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Icon, TabView, Tab } from "@rneui/themed";
import tw from "twrnc";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { BASEURL } from "../../config/config";
import { COLORS } from "../../constants/theme";
import { noImage } from "../../utils/helpers";

const FansScreen = ({ navigation, route }) => {
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(0);

  function renderSearch() {
    return (
      <View
        style={tw`flex-row items-center justify-center bg-gray-200 mx-4 my-2 py-1.5 px-3 rounded-lg`}
      >
        <TextInput
          style={tw`flex-1 text-lg`}
          placeholder="Search..."
          placeholderTextColor="gray"
          onChangeText={(val) => setVal(val)}
          returnKeyType="search"
          value={value}
          onSubmitEditing={() => handleSubmit()}
        />
      </View>
    );
  }

  const renderFollowers = () => {
    const renderItem = ({ item }) => (
      <View style={[tw`flex justify-start items-center mb-3 px-3 py-2`]}>
        <TouchableOpacity
          style={tw`flex-row items-center w-full`}
          onPress={() => navigation.navigate("User Profile", { id: item.id })}
        >
          <Image
            source={
              item.profile.profilePhoto
                ? {
                    uri: `${BASEURL}/storage/images/uploads/${item.profile.profilePhoto}`,
                  }
                : noImage
            }
            resizeMode="stretch"
            style={tw`w-16 h-16 rounded`}
          />
          <View style={tw`px-3`}>
            <Text style={tw`text-base font-semibold`} numberOfLines={1}>
              {" "}
              {item.username}{" "}
            </Text>
            <Text numberOfLines={1} style={tw`text-gray-600 text-base`}>
              {item.fullname}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );

    return (
      <FlatList
        data={users.followers}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={tw`bg-white`}
      />
    );
  };

  const renderFollowing = () => {
    //
    const renderItem = ({ item }) => (
      <View style={[tw`flex justify-start items-center mb-3 px-3 py-2`]}>
        <TouchableOpacity
          style={tw`flex-row items-center w-full`}
          onPress={() => navigation.navigate("User Profile", { id: item.id })}
        >
          <Image
            source={
              item.profile.profilePhoto
                ? {
                    uri: `${BASEURL}/storage/images/uploads/${item.profile.profilePhoto}`,
                  }
                : noImage
            }
            resizeMode="stretch"
            style={tw`w-16 h-16 rounded`}
          />
          <View style={tw`px-3`}>
            <Text style={tw`text-base font-semibold`} numberOfLines={1}>
              {" "}
              {item.username}{" "}
            </Text>
            <Text numberOfLines={1} style={tw`text-gray-600 text-base`}>
              {item.fullname}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );

    return (
      <FlatList
        data={users.following}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={tw`bg-white`}
      />
    );
  };

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
        .get(`${BASEURL}/api/account/fans/${id}`, config)
        .then((res) => {
          //console.log(res.data);
          setUsers(res.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  //   const handleSubmit = () => {
  //     if (value == "") {
  //       getData();
  //       return;
  //     }

  //     SecureStore.getItemAsync("mytoken").then((token) => {
  //       fetch(`${BASEURL}/api/followers/search?query=${value}`, {
  //         method: "GET",
  //         headers: new Headers({
  //           Accept: "application/json",
  //           Authorization: `Bearer ${JSON.parse(token)}`,
  //         }),
  //       })
  //         .then((response) => response.json())
  //         .then((res) => {
  //           console.log(res.data);
  //           setResults(res.data);
  //         })
  //         .catch((err) => {
  //           console.log(err.response.data.message);
  //         });
  //     });
  //   };

  useEffect(() => {
    let active = route.params.index;
    let id = route.params.id;
    setIndex(active);
    getData(id);
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View
        style={[
          tw`flex-row items-center justify-between border-b border-gray-200 px-3 py-1`,
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`py-1 px-2`}
        >
          <Icon name="arrow-left" type="feather" size={20} />
        </TouchableOpacity>
        {/* <TextInput
            style={tw`flex-1 text-base bg-gray-300 p-1.5 rounded-lg items-center`}
            placeholderTextColor="black"
            defaultValue={query}
            placeholder="Search..."
            onChangeText={(val) => setQuery(val)}
            returnKeyType="search"
            //onChange={handleSubmit}
            onSubmitEditing={handleSubmit}
            onFocus={() => setShowModal(true)}
          /> */}

        <TouchableOpacity></TouchableOpacity>
      </View>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "black",
          height: 2,
        }}
        dense
      >
        <Tab.Item titleStyle={tw`text-black text-sm p-2`}>Followers</Tab.Item>
        <Tab.Item titleStyle={tw`text-black text-sm p-2`}>Following</Tab.Item>
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={tw`w-full px-2 py-1`}>
          {renderFollowers()}
        </TabView.Item>
        <TabView.Item style={tw`w-full px-2 py-1`}>
          {renderFollowing()}
        </TabView.Item>
      </TabView>
    </SafeAreaView>
  );
};

export default FansScreen;
