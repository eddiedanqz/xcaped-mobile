import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Icon, Tab, TabView } from "@rneui/themed";

import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";

import { BASEURL } from "../../config/config";

import FilterModal from "../../components/search/FilterModal";
import { FilterContext } from "../../context/filterContext";
import { noImage, noBanner } from "../../utils/helpers";

const SearchScreen = ({ navigation, route }) => {
  const { filters } = useContext(FilterContext);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showFilterIcon, setShowFilterIcon] = useState(true);
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [venue, setVenue] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState("");
  const [results, setResults] = useState({});

  const isFocused = useIsFocused();

  const filterData = () => {
    //
    // handleSubmit();
    // setShowFilterModal(false);
    // setShowFilterIcon(false);
    console.log(showFilterIcon);
  };
  //
  const loadMore = () => {
    //param0
    SecureStore.getItemAsync("mytoken").then((token) => {
      fetch(
        `${BASEURL}/api/search?title=${title}&venue=${venue}&category=${category}
        &date=${date}&page=${offset}`,
        {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          }),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          let { data } = res;
          // setResults((results) => [...results, ...data]);
          // setOffset(offset + 1);
          console.log(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  };

  const renderEvents = () => {
    //
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={[tw`bg-white mb-4 mx-4 rounded-md shadow-md`]}
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
        <View style={tw`flex-row justify-between items-center p-1`}>
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
            <Text style={[tw`text-base font-semibold`, { color: "#151618" }]}>
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
        contentContainerStyle={tw`py-5`}
        // onEndReached={loadMore}
        onEndReachedThreshold={0.1}
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
              /*item.banner ? {uri:`${BASEURL}/storage/images/uploads/${item.banner}` } : */ noImage
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
        contentContainerStyle={tw`py-5`}
        // onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    );
  };

  const handleSubmit = () => {
    if (query == "") {
      setResults([]);
      return;
    }

    SecureStore.getItemAsync("mytoken").then((token) => {
      fetch(
        `${BASEURL}/api/search?query=${query}&venue=${venue}&category=${category}&date=${date}`,
        {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          }),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          // Create an empty object to store the grouped data
          const groupedData = {};
          // Iterate through the array and group objects by their "type" property
          res.forEach((item) => {
            const itemType = item.type;

            if (!groupedData[itemType]) {
              // If the type doesn't exist in the groupedData object, create a new array for it
              groupedData[itemType] = [item];
            } else {
              // If the type already exists, push the item to the existing array
              groupedData[itemType].push(item);
            }
          });

          // Now, groupedData contains the objects grouped by their "type" property
          setResults(groupedData);
          // console.log(groupedData);
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  };

  const getCategories = () => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      fetch(`${BASEURL}/api/categories`, {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          //  console.log(res.data);
          setCategories(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    //  console.log(filters)
    setVenue(filters.venue);
    setCategory(filters.category);
    setDate(filters.date);
    setQuery("");

    return () => {
      setResults([]);
    };
  }, [filters, isFocused]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/**Search Header*/}
      <View style={tw`overflow-hidden pb-2 `}>
        <View
          style={[
            tw`flex-row items-center justify-center px-5 mx-auto`,
            {
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 1,
            },
          ]}
        >
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon type="feather" name="arrow-left" size={20} />
          </TouchableOpacity> */}

          <View
            style={tw`flex-row items-center bg-gray-300 ml-3 my-1 p-1.5 rounded-lg`}
          >
            <TextInput
              style={tw`flex-1 text-lg `}
              placeholderTextColor="black"
              placeholder="Search..."
              onChangeText={(val) => setQuery(val)}
              returnKeyType="search"
              // onChange={handleSubmit}
              onSubmitEditing={handleSubmit}
            />

            {showFilterIcon && (
              <TouchableOpacity onPress={() => setShowFilterModal(true)}>
                <Icon name="sliders" type="feather" size={20} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/**Search Results */}
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
          onPressIn={() => setShowFilterIcon(true)}
        >
          Events
        </Tab.Item>
        <Tab.Item
          titleStyle={tw`text-black text-sm`}
          onPressIn={() => setShowFilterIcon(false)}
        >
          People
        </Tab.Item>
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={tw`w-full`}>{renderEvents()}</TabView.Item>
        <TabView.Item style={tw`w-full`}>{renderPeople()}</TabView.Item>
      </TabView>

      {/**Filter */}
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          filterData={filterData}
          categories={categories}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
