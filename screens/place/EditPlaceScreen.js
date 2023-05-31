import React, { useState, useEffect } from "react";
import {
  Modal,
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
import * as SecureStore from "expo-secure-store";
import base64 from "react-native-base64";
import axios from "axios";

import { BASEURL } from "@env";
import TextButton from "../../components/buttons/TextButton";
import MapModal from "../../components/modal/MapModal";
import Validator from "../../components/errors/Validator";
import Section from "../../components/content/Section";
import { noBanner } from "../../utils/helpers";

const AddScreen = ({ navigation }) => {
  const [showImageModal, setShowImageModal] = useState(false);
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
    setShowImageModal(true);
  };

  //Load Image
  let removeImage = async () => {
    setPath("");
    //console.log(path);
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

  const closeSheet = () => {
    setIsVisible(false);
    setSelectedCategory(-1);
  };

  const updatePhoto = () => {
    setShowModal(false);
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Authorization: `Bearer ${parsed}`,
          // "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(`${BASEURL}/api/profile/photo/update`, formData, config)
        .then((res) => {
          let data = res.data.data;
          // console.log(res.data);
          setImage(data.profile.profilePhoto);
          save("user", data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });
  };

  const renderLogo = () => {
    return (
      <Section containerStyle={tw`mb-4 mt-4 p-3 z-0`}>
        {/**Image */}
        <View style={tw`w-36 h-36 border-0 shadow-xl mb-3`}>
          <Image
            style={tw`w-full h-full rounded-full z-0`}
            source={
              image
                ? { uri: `${BASEURL}/storage/images/user/${image}` }
                : noBanner
            }
            resizeMode="cover"
          />
          {/**Camera Icon */}
          <TouchableOpacity
            style={[
              tw`absolute -right-5 -bottom-3 bg-green-400 p-3 rounded-full`,
              { backgroundColor: "#151618" },
            ]}
            onPress={openImagePickerAsync}
          >
            <Icon type="font-awesome-5" name="camera" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </Section>
    );
  };

  const renderName = () => {
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

  const renderPhone = () => {
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

  const saveData = () => {
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
    <SafeAreaView style={tw`bg-white`}>
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
        </View>
      </View>

      <KeyboardAwareScrollView keyboardDismissMode="interactive">
        {renderLogo()}
        {renderName()}
        {renderType()}
        {renderOpenDays()}
        {renderLocation()}
        {renderPhone()}
        {/**Button */}
        <View
          style={tw`bg-white  h-24 bottom-0 left-0 right-0 p-3 justify-center items-center`}
        >
          <TextButton
            label="Save"
            buttonContainerStyle={tw`h-12 w-64 rounded`}
            onPress={saveData}
          />
        </View>
      </KeyboardAwareScrollView>

      {/**Modal */}
      <Modal
        visible={showImageModal}
        presentationStyle="fullScreen"
        animationType="fade"
      >
        {/**Content */}
        <View style={tw` h-full`}>
          <View style={tw`flex-1 w-full h-52 self-center border-0 px-1 my-10`}>
            <Image
              style={tw`w-full h-full`}
              source={{ uri: path }}
              resizeMode="contain"
            />
          </View>

          <View
            style={tw`flex-row w-full h-16 items-center justify-between bottom-8  px-5 z-10`}
          >
            <TouchableOpacity
              style={tw`justify-center`}
              onPress={() => setShowImageModal(false)}
            >
              <Icon type="feather" name="x" size={20} color="#ff8552" />
            </TouchableOpacity>
            <View></View>
            <TouchableOpacity onPress={() => updatePhoto()}>
              <Text style={[tw`text-base`, { color: "#ff8552" }]}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
