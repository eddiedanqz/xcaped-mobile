import React, { Fragment, useState, useEffect } from "react";
import {
  Pressable,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Keyboard,
} from "react-native";
import { Icon, Input, BottomSheet, ListItem } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import base64 from "react-native-base64";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { BASEURL } from "@env";
import TextButton from "../../components/buttons/TextButton";
import MapModal from "../../components/modal/MapModal";
import { noBanner } from "../../utils/helpers";

const AddScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [image, setImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [categoryId, setCategoryId] = useState(0);
  const [category, setCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLat] = useState("");
  const [longitude, setLon] = useState("");
  const [startDay, setStartDay] = useState("");
  const [closeDay, setCloseDay] = useState("");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [days, setDays] = useState([
    { day: "Monday", value: "Mon" },
    { day: "Tuseday", value: "Tue" },
    { day: "Wednesday", value: "Wed" },
    { day: "Thursday", value: "Thu" },
    { day: "Friday", value: "Fri" },
    { day: "Saturday", value: "Sat" },
    { day: "Sunday", value: "Sun" },
  ]);

  //Load Image
  let openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    // console.log(pickerResult.assets[0]);
    const sizeInMb = pickerResult.assets[0].fileSize / 1024 / 1024;
    if (sizeInMb > 1) {
      alert("File shuld be less than 1mb");
      //set error
      return;
    }
    setPath(pickerResult.assets[0].uri);
    setImage(base64.encode(pickerResult.assets[0].uri));
  };

  //Load Image
  let removeImage = async () => {
    setPath("");
    //console.log(path);
  };

  const closeSheet = () => {
    setIsVisible(false);
    setSelectedCategory(-1);
  };

  const chooseCategory = (i, c) => {
    setIsVisible(false);
    setSelectedCategory(i);
    setCategoryId(c.id);
  };

  //Handle time
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let timeValue = tempDate.toLocaleTimeString().replace(/(.*)\D\d+/, "$1");
    //
    type == "openTime" ? setOpenTime(`${timeValue}`) : "";
    type == "closeTime" ? setCloseTime(`${timeValue}`) : "";
    //setShow(false);
  };

  const showMode = (timeType) => {
    setShow(!show);
    setType(timeType);
  };

  const renderLogo = () => {
    return (
      <View style={tw`p-3 mb-4`}>
        <View style={tw`w-36 h-36 mb-2`}>
          <TouchableOpacity onPress={openImagePickerAsync}>
            <Image
              source={path ? { uri: path } : noBanner}
              resizeMode="cover"
              style={tw`w-full h-full rounded-full`}
            />
          </TouchableOpacity>
          {/**Button */}
          <View
            style={tw`bg-transparent w-10 h-10 absolute -bottom-5 -right-2 items-center justify-end`}
          >
            {path && (
              <TextButton
                buttonContainerStyle={tw`w-12 h-12 p-3 rounded-full shadow-lg mb-3`}
                iconName="trash"
                size={13}
                iconColor="white"
                onPress={removeImage}
              />
            )}
          </View>
        </View>
        <Text style={tw`text-lg text-gray-600 mt-2 ml-2`}>
          Add business logo
        </Text>
      </View>
    );
  };

  const renderName = () => {
    return (
      <View style={tw`flex-row items-center justify-center p-1`}>
        <Input
          placeholder="Business Name"
          textContentType="none"
          leftIcon={<Icon type="feather" name="type" size={20} color="gray" />}
          onChangeText={(newText) => setName(newText)}
        />
      </View>
    );
  };

  const renderType = () => {
    return (
      <View style={tw`flex-row items-center mb-3 ml-2 p-1 `}>
        <Icon type="feather" name="tag" size={20} color="gray" />
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Text style={tw`mx-2 text-lg text-gray-600`}>
            {selectedCategory == -1
              ? "Choose Category"
              : category[selectedCategory].name}
          </Text>
        </TouchableOpacity>

        {/**Category List */}
        <BottomSheet modalProps={{}} isVisible={isVisible}>
          {category.map((c, i) => (
            <ListItem key={i} onPress={() => chooseCategory(i, c)}>
              <ListItem.Content>
                <ListItem.Title style={tw`text-lg`}>{c.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
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

  const renderOpenDays = () => {
    return (
      <View style={tw`flex-row ml-2 p-1 mb-2`}>
        <Icon type="feather" name="clock" size={20} color="gray" />
        <View style={tw`flex-1 mx-1 w-full`}>
          <View style={tw`flex-row justify-between`}>
            <SelectDropdown
              data={days}
              onSelect={(selectedItem) => {
                setStartDay(selectedItem.value);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.day;
              }}
              rowTextForSelection={(item, index) => {
                return item.value;
              }}
              defaultButtonText="Opening Day"
              buttonStyle={tw`bg-white w-40 h-10 items-start m-0 p-1`}
              buttonTextStyle={tw`text-left m-0 text-gray-600`}
              rowStyle={tw`border-gray-200`}
              renderDropdownIcon={() => (
                <Icon
                  type="feather"
                  name="chevron-down"
                  size={20}
                  color="gray"
                />
              )}
            />
            <SelectDropdown
              data={days}
              onSelect={(selectedItem) => {
                setCloseDay(selectedItem.value);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.day;
              }}
              rowTextForSelection={(item, index) => {
                return item.value;
              }}
              defaultButtonText="Closing Day"
              buttonStyle={tw`bg-white w-40 h-10 items-start p-0`}
              buttonTextStyle={tw`text-gray-600`}
              rowStyle={tw`border-gray-200`}
              renderDropdownIcon={() => (
                <Icon
                  type="feather"
                  name="chevron-down"
                  size={20}
                  color="gray"
                />
              )}
            />
          </View>

          <View style={tw`flex-row justify-between ml-1 my-2`}>
            <Text
              style={tw`text-base text-gray-600`}
              onPress={() => showMode("openTime")}
            >
              {openTime ? openTime : "00:00"}
            </Text>
            <Text
              style={tw`text-base text-gray-600`}
              onPress={() => showMode("closeTime")}
            >
              {closeTime ? closeTime : "00:00"}
            </Text>
          </View>
          {/*Picker*/}
          <View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderLocation = () => {
    return (
      <View>
        {/*Location*/}
        {/*<View style={tw`py-2 px-1 flex-row items-center justify-center`}>
          <Input
            placeholder="Venue"
            textContentType="none"
            leftIcon={
              <Icon type="feather" name="map-pin" size={20} color="gray" />
            }
            onChangeText={(newLoc) => setLocation(newLoc)}
            //defaultValue={location}
          />
          </View>*/}
        {/*Address*/}
        <View style={tw`px-1 flex-row items-center justify-center`}>
          <Input
            placeholder="Address"
            textContentType="none"
            leftIcon={<Icon type="feather" name="map" size={20} color="gray" />}
            onChangeText={(addr) => setAddress(addr)}
            onFocus={() => Keyboard.dismiss()}
            onPressIn={() => setShowModal(true)}
            value={address}
          />
        </View>
      </View>
    );
  };

  const renderContact = () => {
    return (
      <View style={tw`p-1 flex-row items-center justify-center`}>
        <Input
          placeholder="Phone no."
          textContentType="telephoneNumber"
          leftIcon={<Icon type="feather" name="phone" size={20} color="gray" />}
          onChangeText={(newText) => setPhone(newText)}
        />
      </View>
    );
  };

  const sendGps = (values) => {
    setAddress(values.address);
    setLat(values.latitude);
    setLon(values.longitude);
    setShowModal(false);
  };

  const sendData = () => {
    const params = {
      name,
      path,
      typeId: categoryId,
      address,
      latitude,
      longitude,
      phone,
      startDay,
      closeDay,
      openTime,
      closeTime,
    };

    console.log(params);

    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Authorization: `Bearer ${parsed}`,
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(`${BASEURL}/api/place`, params, config)
        .then((res) => {
          if (res.data) {
            // console.log(res.data)
            navigation.navigate("Profile");
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View style={tw`overflow-hidden border-b border-gray-200`}>
        <View
          style={[tw`flex-row w-full h-16 items-center justify-between px-3`]}
        >
          <TouchableOpacity
            style={tw`justify-center ml-2`}
            onPress={() => navigation.goBack()}
          >
            <Icon type="feather" name="x" size={20} color="#151618" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAwareScrollView>
        <View style={tw`p-2 mt-1 mb-5`}>
          {renderLogo()}
          {renderName()}
          {renderType()}
          {renderOpenDays()}
          {renderLocation()}
          {renderContact()}
        </View>

        {/**Button */}
        <View
          style={tw`bg-white h-24 bottom-3 left-0 right-0 p-3 justify-center items-center`}
        >
          <TextButton
            label="Done"
            buttonContainerStyle={tw`h-12 w-64 rounded`}
            onPress={() => sendData()}
          />
        </View>
      </KeyboardAwareScrollView>

      {/**Filter */}
      {showModal && (
        <MapModal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          sendGps={sendGps}
        />
      )}
    </SafeAreaView>
  );
};

export default AddScreen;
