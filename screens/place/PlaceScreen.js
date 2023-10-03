import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { Icon, Input, BottomSheet, ListItem } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@react-native-community/datetimepicker";
import SafeAreaView from "react-native-safe-area-view";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import Reactions from "../../components/Reactions";
import Section from "../../components/content/Section";
import ReactionModal from "../../components/search/ReactionModal";
import TextButton from "../../components/buttons/TextButton";
import { BASEURL } from "../../config/config";
import { noBanner } from "../../utils/helpers";
import { render } from "react-dom";

const PlaceScreen = ({ navigation }) => {
  const [path, setPath] = useState("");
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [categoryId, setCategoryId] = useState(0);
  const [category, setCategories] = useState([
    { id: 1, name: "Dscount", type: "deals" },
    { id: 2, name: "Karoke Night", type: "entertainment" },
  ]);
  const [details, setDetail] = useState("");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [time, setTime] = useState("");

  const openModal = (type) => {
    setType(type);
    setShowModal(true);
  };

  const chooseCategory = (i, c) => {
    setIsVisible(false);
    setSelectedCategory(i);
    setCategoryId(c.id);
  };

  const closeSheet = () => {
    setIsVisible(false);
    setSelectedCategory(-1);
  };

  //Handle time
  const onChange = (event, newDate) => {
    const currentDate = newDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let dateValue = tempDate.toISOString().split("T")[0];
    let timeValue = tempDate.toLocaleTimeString().replace(/(.*)\D\d+/, "$1");
    //
    setSelectedDate(`${dateValue} @ ${timeValue}`);
    //setShow(false);
  };

  const showMode = () => {
    setShow(!show);
  };

  const renderCategory = () => {
    return (
      <View style={tw`mb-2 ml-1 p-3`}>
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          style={tw`flex-row items-center  justify-between border-b border-gray-400 py-1 w-4/6`}
        >
          <Text style={tw`text-lg text-gray-500 ml-1 `}>
            {selectedCategory == -1
              ? `Select ${type}`
              : category[selectedCategory].name}
          </Text>
          <Icon type="feather" name="chevron-down" size={20} color="gray" />
        </TouchableOpacity>

        {/**Category List */}
        <BottomSheet modalProps={{}} isVisible={isVisible}>
          {category.map((c, i) =>
            c.type == type ? (
              <ListItem key={i} onPress={() => chooseCategory(i, c)}>
                <ListItem.Content>
                  <ListItem.Title style={tw`text-lg`}>{c.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ) : (
              ""
            )
          )}
          <View style={tw`bg-white justify-center p-4`}>
            <TextButton
              label="Cancel"
              buttonContainerStyle={tw`rounded-lg p-3 w-80`}
              onPress={closeSheet}
            />
          </View>
        </BottomSheet>
      </View>
    );
  };

  const renderDetails = () => {
    return (
      <View style={tw`px-1 py-2 mb-3 items-center justify-center`}>
        <Input
          placeholder="Description"
          textContentType="none"
          multiline={true}
          numberOfLines={5}
          leftIcon={
            <Icon type="feather" name="file-text" size={20} color="gray" />
          }
          onChangeText={(val) => setDetail(val)}
        />
      </View>
    );
  };

  const renderType = () => {
    return (
      <View style={tw`p-1 flex-row items-center justify-center`}>
        <Input
          placeholder="Business Name"
          textContentType="none"
          leftIcon={<Icon type="feather" name="type" size={20} color="gray" />}
          onChangeText={(newText) => setName(newText)}
        />
      </View>
    );
  };

  const renderDate = () => {
    return (
      <View>
        <View style={tw`flex-row items-center ml-2 p-1 mb-3`}>
          <Icon
            type="feather"
            name="clock"
            size={20}
            iconStyle={tw`text-gray-500`}
          />
          <View style={tw`flex-1 mx-1 w-full`}>
            <Text
              style={tw`text-base text-gray-500`}
              onPress={() => showMode()}
            >
              {selectedDate ? selectedDate : "D-MM-YY @ 00:00"}
            </Text>
          </View>
        </View>

        {/*Picker*/}
        <View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="datetime"
              is24Hour={false}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </View>
    );
  };

  renderEvents = () => {};

  renderPromotions = () => {
    return (
      <View style={tw`bg-white py-4 px-3 mb-2`}>
        <View style={tw`flex-row items-center p-2 mb-2`}>
          <Text style={tw`font-bold text-gray-600 text-base ml-1`}>Promos</Text>
        </View>
        <View style={tw`border-t border-gray-200 p-2`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Icon type="feather" name="feather" size={17} color="#151618" />
            <Text style={tw`font-bold text-gray-600 text-base ml-1`}>
              Special name
            </Text>
          </View>
          <Text style={tw`font-bold text-gray-500 text-base px-3`}>
            Special detaisl kjij lkjn kjn kjjh khn ik khb khb mnhb
          </Text>
          <Text style={tw`font-bold text-gray-500 text-base px-3`}>00:00</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      {/*Header*/}
      <View style={tw`overflow-hidden border-b border-gray-200`}>
        <View
          style={[tw`flex-row w-full h-16 items-center justify-between px-3`]}
        >
          <TouchableOpacity
            style={tw`justify-center ml-2`}
            onPress={() => navigation.goBack()}
          >
            <Icon type="feather" name="arrow-left" size={20} color="#151618" />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`justify-center mr-2`}
            onPress={() => navigation.navigate("Edit Place")}
          >
            <Icon type="feather" name="edit-3" size={20} color="#151618" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={tw`bg-gray-100 pb-4`}>
        {/*Profile*/}
        <View style={tw`bg-white py-4 px-3 mb-2`}>
          <View style={tw`flex-row items-center justify-start my-4`}>
            {/**Profile Image */}
            <View style={tw`w-36 h-36 border-0 shadow-xl mr-3`}>
              <Image
                style={tw`w-full h-full rounded-full`}
                source={path ? { uri: noBanner } : noBanner}
                resizeMode="stretch"
              />
            </View>
          </View>
          {/**Basic Info */}
          <Text style={tw`text-2xl font-bold text-left text-gray-700 px-1`}>
            user.username
          </Text>

          <View style={tw`flex-row justify-start items-center my-2 px-1`}>
            <Text style={tw`font-semibold text-gray-600 text-sm`}>
              Night Club
            </Text>
            <Text style={tw`font-semibold text-gray-400 text-sm mx-1`}>|</Text>
            <Text style={tw`font-semibold text-green-500 text-sm`}>Open</Text>
          </View>
        </View>

        <View style={tw`bg-white p-3 mb-2`}>
          <View style={tw`flex-row justify-between my-2 px-1`}>
            <TouchableOpacity style={tw`flex-row items-center`}>
              <Icon
                type="feather"
                name="calendar"
                size={15}
                iconStyle={tw`text-red-500`}
              />
              <Text style={tw`font-semibold text-gray-600 text-base ml-1`}>
                Event
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-row items-center`}
              onPress={() => openModal("deals")}
            >
              <Icon
                type="feather"
                name="percent"
                size={15}
                iconStyle={tw`text-yellow-500`}
              />
              <Text style={tw`font-semibold text-gray-600 text-base ml-1`}>
                Deals
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-row items-center`}
              onPress={() => openModal("entertainment")}
            >
              <Icon
                type="feather"
                name="calendar"
                size={15}
                iconStyle={tw`text-purple-500`}
              />
              <Text style={tw`font-semibold text-gray-600 text-base ml-1`}>
                Entertainment
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`bg-white py-4 px-3 mb-2`}>
          <View style={tw`flex-row p-2 mb-2`}>
            <Icon
              type="feather"
              name="clock"
              size={17}
              color="#151618"
              style={tw`mt-1`}
            />
            <View>
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`font-bold text-gray-600 text-base ml-1`}>
                  Mon
                </Text>
                <Text style={tw`font-bold text-gray-600 text-base ml-1`}>
                  -
                </Text>
                <Text style={tw`font-bold text-gray-600 text-base ml-1`}>
                  Fri
                </Text>
              </View>
              {/**t */}
              <View style={tw`flex-row justify-between`}>
                <Text style={tw`font-bold text-gray-600 text-base ml-1`}>
                  1:00
                </Text>
                <Text style={tw`font-bold text-gray-600 text-base ml-1`}>
                  -
                </Text>
                <Text style={tw`font-bold text-gray-600 text-base ml-1`}>
                  4:00
                </Text>
              </View>
            </View>
          </View>
          <View style={tw`flex-row items-center p-2 mb-2`}>
            <Icon type="feather" name="map-pin" size={17} color="#151618" />
            <Text style={tw`font-bold text-gray-600 text-base ml-1`}>
              Night Club
            </Text>
          </View>
          <View style={tw`flex-row items-center p-2 mb-2`}>
            <Icon type="feather" name="phone" size={17} color="#151618" />
            <Text style={tw`font-bold text-gray-600 text-base ml-1`}>
              123456789
            </Text>
          </View>
        </View>

        {renderPromotions()}
      </ScrollView>

      <Modal
        visible={showModal}
        presentationStyle="pageSheet"
        animationType="slide"
      >
        {/**Header */}
        <View
          style={tw`flex-row w-full h-16 items-center justify-end border-b 
          border-gray-200 px-5 mb-3`}
        >
          <TouchableOpacity
            style={tw`justify-center p-3`}
            onPress={() => setShowModal(false)}
          >
            <Icon
              type="feather"
              name="x"
              size={20}
              iconStyle={tw`text-gray-500`}
            />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-1 px-2`}>
          {renderCategory()}
          {renderDetails()}
          {renderDate()}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PlaceScreen;
