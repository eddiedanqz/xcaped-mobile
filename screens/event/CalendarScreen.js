import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Text, Icon } from "@rneui/themed";
import tw from "twrnc";
import * as SecureStore from "expo-secure-store";
import { Calendar } from "react-native-calendars";
import moment from "moment";

import HorizontalCard from "../../components/cards/HorizontalCard";
import { BASEURL } from "../../config/config";
import { COLORS } from "../../constants/theme";

const CalendarScreen = ({ navigation, route }) => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(date);
  const [filteredData, setFilteredData] = useState([]);

  function extractKeysFromArray(arr, key) {
    return arr.reduce((result, item) => {
      if (item[key] !== undefined) {
        result[item[key]] = {
          selected: selected === item[key] && true,
          marked: selected !== item[key] && true,
          selectedColor: "white",
          selectedTextColor: COLORS.primary,
          dotColor: "white",
        };
      }
      return result;
    }, {});
  }

  const marks = extractKeysFromArray(events, "start_date");

  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: "white",
        selectedTextColor: COLORS.primary,
      },
      ...marks,
    }),
    [selected, marks]
  );

  const filterDataBy = (day) => {
    const filteredData = events.filter((item) => item.start_date === day);
    setFilteredData(filteredData);
  };

  const renderEvents = () => {
    //
    const renderItem = ({ item }) => (
      <HorizontalCard
        item={item}
        onPress={() => navigation.navigate("Event", { id: item.id })}
        containerStyle={tw`border-b border-gray-200`}
      />
    );

    return (
      <FlatList
        data={filteredData}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={tw`flex-1 bg-white py-4`}
      />
    );
  };

  const getEvent = (id) => {
    // console.log(id);
    SecureStore.getItemAsync("mytoken").then((token) => {
      fetch(`${BASEURL}/api/events/following/${id}`, {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          //  console.log(res.data);
          setEvents(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  };

  useEffect(() => {
    let { id } = route.params;
    let now = moment().format().split("T")[0];
    getEvent(id);
    setSelected(now);
  }, [navigation]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white `}>
      {/*Header*/}
      <View style={tw`overflow-hidden mt-1 bg-[${COLORS.primary}]`}>
        <View
          style={[
            tw`flex-row w-full h-15 items-center justify-between px-5 pt-2`,
          ]}
        >
          <TouchableOpacity
            style={tw`justify-center`}
            onPress={() => navigation.goBack()}
          >
            <Icon type="feather" name="arrow-left" size={20} color="#ffffff" />
          </TouchableOpacity>

          <Text style={[tw`text-black text-white text-lg font-bold`]}>
            Events Calendar
          </Text>

          <TouchableOpacity
            style={tw`justify-center`}
            onPress={() => navigation.navigate("Search")}
          >
            <Icon type="feather" name="search" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`flex-1 bg-gray-200`}>
        <View>
          <Calendar
            //  initialDate={date}
            markedDates={marked}
            // Define callback functions for date selection
            onDayPress={(day) => {
              setSelected(day.dateString);
              filterDataBy(day.dateString);
            }}
            theme={{
              backgroundColor: COLORS.primary,
              calendarBackground: COLORS.primary,
              textSectionTitleColor: "#ffffff",
              selectedDotColor: "#ffffff",
              todayTextColor: "#ffffff",
              dayTextColor: "white",
              textDisabledColor: "#a3b7ca",
              arrowColor: "#ffffff",
              monthTextColor: "#ffffff",
              dotColor: "yellow",
            }}
          />
        </View>
        {renderEvents()}
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
