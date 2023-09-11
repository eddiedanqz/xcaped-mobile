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
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

import { BASEURL } from "@env";
import FilterModal from "../../components/search/FilterModal";
import HorizontalCard from "../../components/cards/HorizontalCard";
import ListCard from "../../components/cards/ListCard";
import { FilterContext } from "../../context/filterContext";

const SearchScreen = ({ navigation, route }) => {
  const { filters } = useContext(FilterContext);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(2);
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState("");

  const filterData = () => {
    //
    handleSubmit();
    setShowFilterModal(false);
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
          setResults((results) => [...results, ...data]);
          setOffset(offset + 1);
          console.log(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  };

  const renderData = () => {
    //
    const renderItem = ({ item }) => (
      <HorizontalCard
        item={item}
        onPress={() => navigation.navigate("Event", { id: item.id })}
      />
    );

    return (
      <FlatList
        data={results}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={tw`py-5`}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    );
  };

  const handleSubmit = () => {
    if (title == "") {
      setResults([]);
      return;
    }

    SecureStore.getItemAsync("mytoken").then((token) => {
      fetch(
        `${BASEURL}/api/search?title=${title}&venue=${venue}&category=${category}
      &date=${date}`,
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
          console.log(res.meta);
          setResults(res.data);
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

    return () => {
      setResults([]);
      setOffset(2);
    };
  }, [filters]);

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
              onChangeText={(val) => setTitle(val)}
              returnKeyType="search"
              // onChange={handleSubmit}
              onSubmitEditing={handleSubmit}
            />

            <TouchableOpacity onPress={() => setShowFilterModal(true)}>
              <Icon name="sliders" type="feather" size={20} />
            </TouchableOpacity>
          </View>
        </View>
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
      {/**Search Results */}
      <View style={tw`pb-10`}>{renderData()}</View>
    </SafeAreaView>
  );
};

export default SearchScreen;
