import React, { useState, useEffect, useContext } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Modal,
} from "react-native";
import { Text, Icon } from "@rneui/themed";
import tw, { useDeviceContext } from "twrnc";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";

import { FilterContext } from "../../context/filterContext";
import VerticalCard from "../../components/cards/VerticalCard";
import ImageCard from "../../components/cards/ImageCard";
import { BASEURL } from "../../config/config";
import FilterModal from "../../components/search/FilterModal";
import SearchModal from "../../components/search/SearchModal";
import List from "../../components/content/List";

const ExploreScreen = ({ navigation }) => {
  const { filters } = useContext(FilterContext);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showFilterIcon, setShowFilterIcon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [venue, setVenue] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState("");
  const [results, setResults] = useState({});
  const [page, setPage] = useState(1);
  const isFocused = useIsFocused();

  const filterData = () => {
    //
    // handleSubmit();
    // setShowFilterModal(false);
    // setShowFilterIcon(false);
    console.log(showFilterIcon);
  };

  function renderCategories() {
    //
    const renderItem = ({ item }) => (
      <List
        onPress={() => navigation.navigate("Event", { id: item.id })}
        title={item.name}
        titleStyle={tw`text-blue-400`}
        icon="anchor"
        iconColor="white"
        iconContentStyle={tw`bg-blue-400 rounded-sm p-5`}
        containerStyle={tw` px-4`}
      />
    );

    return (
      <FlatList
        data={categories}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        ListHeaderComponent={
          <Text style={tw`text-base text-gray-700 px-4 py-5 font-bold`}>
            BROWSE BY CATEGORY
          </Text>
        }
        contentContainerStyle={tw`flex-1 bg-white`}
      />
    );
  }

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

  const showIcon = (val) => {
    setShowFilterIcon(val);
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
      {/*Header*/}
      <View style={tw`overflow-hidden border-b border-gray-200 z-50`}>
        <View style={[tw`flex-row items-center justify-center px-3 py-1`]}>
          {showModal && (
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={tw`py-1 px-2`}
            >
              <Icon name="arrow-left" type="feather" size={20} />
            </TouchableOpacity>
          )}
          <TextInput
            style={tw`flex-1 text-lg bg-gray-300 p-1.5 rounded-lg`}
            placeholderTextColor="black"
            placeholder="Search..."
            onChangeText={(val) => setQuery(val)}
            returnKeyType="search"
            //onChange={handleSubmit}
            onSubmitEditing={handleSubmit}
            onFocus={() => setShowModal(true)}
          />

          {showFilterIcon && (
            <TouchableOpacity
              onPress={() => setShowFilterModal(true)}
              style={tw`py-1 px-2`}
            >
              <Icon name="sliders" type="feather" size={20} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={tw`flex-1 bg-gray-100`}>
        {renderCategories()}

        {/**Search */}
        {showModal && (
          <SearchModal
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            results={results}
            showIcon={showIcon}
          />
        )}
      </View>

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

export default ExploreScreen;
