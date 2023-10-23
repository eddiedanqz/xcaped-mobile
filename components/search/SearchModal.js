import React, { useEffect, useState, useRef, Fragment } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
  Text,
  Image,
  FlatList,
  FR,
} from "react-native";
import { Icon, TabView, Tab } from "@rneui/themed";
import tw from "twrnc";
import { BASEURL } from "../../config/config";
import TwoPointSlider from "./TwoPointSlider";
import { noImage } from "../../utils/helpers";

const SearchModal = ({ isVisible, onClose, results, showIcon, navigation }) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [showSearchModal, setShowSearchModal] = useState(isVisible);
  const [showFilterIcon, setShowFilterIcon] = useState(false);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);

  const renderEvents = () => {
    //
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={[tw`bg-white mb-3 border-b border-gray-200`]}
        onPress={() => navigation.navigate("Event", { id: item.searchable.id })}
      >
        <View style={tw`flex-row items-center border-b border-gray-300 p-1`}>
          <Image
            source={
              item.searchable.banner
                ? {
                    uri: `${BASEURL}/storage/images/uploads/${item.searchable.banner}`,
                  }
                : noBanner
            }
            resizeMode="stretch"
            style={tw`w-20 h-20 rounded`}
          />
          <View style={tw`flex-1 justify-center ml-2 `}>
            {/**Title */}
            <Text style={tw`text-lg font-bold`}> {item.searchable.title} </Text>
            {/**Location */}
            <View style={tw`flex-row items-center`}>
              <Icon type="feather" name="map-pin" color="#4b5563db" size={16} />
              <Text style={tw`text-base text-gray-600`}>
                {" "}
                {item.searchable.venue}{" "}
              </Text>
            </View>
          </View>
        </View>
        {/**Extra Content */}
        <View style={tw`flex-row justify-between items-center py-1 px-3`}>
          {/**Category */}
          <View
            style={[
              tw`rounded-xl px-2 py-1 items-center`,
              { backgroundColor: "#ff8552", color: "white" },
            ]}
          >
            <Text
              style={[
                tw`text-sm font-semibold`,
                { backgroundColor: "#ff8552", color: "white" },
              ]}
            >
              {item.searchable.category?.name}
            </Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <Text style={[tw`text-sm font-semibold`, { color: "#151618" }]}>
              {new Date(item.searchable.start_date).toDateString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={results.events}
        keyExtractor={(item) => `${item.searchable.id}`}
        renderItem={renderItem}
        contentContainerStyle={tw`bg-white`}
      />
    );
  };

  const renderPeople = () => {
    //
    const renderItem = ({ item }) => (
      <View style={[tw`flex justify-start items-center mb-3 px-3 py-2`]}>
        <TouchableOpacity
          style={tw`flex-row items-center w-full`}
          onPress={() =>
            navigation.navigate("User Profile", { id: item.searchable.id })
          }
        >
          <Image
            source={
              item.searchable.profile.profilePhoto
                ? {
                    uri: `${BASEURL}/storage/images/uploads/${item.searchable.profile.profilePhoto}`,
                  }
                : noImage
            }
            resizeMode="stretch"
            style={tw`w-16 h-16 rounded`}
          />
          <View style={tw`px-3`}>
            <Text style={tw`text-base font-semibold`} numberOfLines={1}>
              {" "}
              {item.searchable.username}{" "}
            </Text>
            <Text numberOfLines={1} style={tw`text-gray-600 text-base`}>
              {item.searchable.fullname}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );

    return (
      <FlatList
        data={results.users}
        keyExtractor={(item) => `${item.searchable.id}`}
        renderItem={renderItem}
        contentContainerStyle={tw`bg-white`}
      />
    );
  };

  useEffect(() => {
    if (showSearchModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showSearchModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  });

  useEffect(() => {
    //console.log(results);
  }, [results]);

  return (
    <View style={tw`absolute inset-0 `}>
      {/* <View style={tw`flex-1 bg-black bg-opacity-60`}></View> */}
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          top: modalY,
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        {Object.entries(results).length > 0 && (
          <Fragment>
            <Tab
              value={index}
              onChange={(e) => setIndex(e)}
              indicatorStyle={{
                backgroundColor: "black",
                height: 2,
              }}
              dense
            >
              <Tab.Item
                titleStyle={tw`text-black text-sm`}
                onPressIn={() => {
                  setShowFilterIcon(true);
                  showIcon(true);
                }}
              >
                Events
              </Tab.Item>
              <Tab.Item
                titleStyle={tw`text-black text-sm`}
                onPressIn={() => {
                  setShowFilterIcon(false);
                  showIcon(false);
                }}
              >
                People
              </Tab.Item>
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
              <TabView.Item style={tw`w-full px-2 py-1`}>
                {renderEvents()}
              </TabView.Item>
              <TabView.Item style={tw`w-full px-2 py-1`}>
                {renderPeople()}
              </TabView.Item>
            </TabView>
          </Fragment>
        )}
      </Animated.View>
    </View>
  );
};

export default SearchModal;
