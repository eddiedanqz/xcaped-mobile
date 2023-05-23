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
//import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import base64 from "react-native-base64";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { BASEURL } from "@env";
import TextButton from "../../components/buttons/TextButton";
import BannerImage from "../../components/BannerImage";
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
  const [contact, setContact] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLat] = useState("");
  const [longitude, setLon] = useState("");
  const [startDay, setStartDay] = useState("Choose Day");
  const [closeDay, setCloseDay] = useState("");
  const [days, setDays] = useState([
    { day: "Monday", value: "Mon" },
    { day: "Tuseday", value: "Tue" },
    { day: "Wednesday", value: "Wed" },
    { day: "Thursday", value: "Thu" },
    { day: "Friday", value: "Fri" },
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

  const sendGps = (values) => {
    setAddress(values.address);
    setLat(values.latitude);
    setLon(values.longitude);
    setShowModal(false);
  };

  const renderLogo = () => {
    return (
      <View style={tw`p-3 mb-5 w-36 h-36`}>
        <TouchableOpacity onPress={openImagePickerAsync}>
          <Image
            source={path ? { uri: path } : noBanner}
            resizeMode="cover"
            style={tw`w-full h-full rounded-xl`}
          />
        </TouchableOpacity>
        <Text style={tw`text-sm mt-3 ml-2`}>Add logo</Text>
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
    );
  };

  const renderName = () => {
    return (
      <View style={tw`p-1 flex-row items-center justify-center`}>
        <Input
          placeholder="Name "
          textContentType="none"
          leftIcon={<Icon type="feather" name="type" size={20} color="gray" />}
          onChangeText={(newText) => setName(newText)}
        />
      </View>
    );
  };

  const renderType = () => {
    return (
      <View style={tw`flex-row items-center mb-2 ml-2 p-1 `}>
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
      <View style={tw`flex-row ml-2 p-1`}>
        <Icon type="feather" name="clock" size={20} color="gray" />
        <View style={tw`flex-1`}>
          <View style={tw`flex-row justify-between mx-4`}>
            {/* <Picker
              testID="picker"
              selectedValue={startDay}
              onValueChange={(itemValue, itemIndex) => setStartDay(itemValue)}
              mode="dropdown"
            >
              {days.map((ele, i) => {
                <Picker.Item key={i} label={ele.label} value={ele.value} />;
              })}
            </Picker> */}

            <Text>FRi</Text>
          </View>
          <Text>oiuhgiuh</Text>
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
        <View style={tw`py-2 px-1 flex-row items-center justify-center`}>
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
          onChangeText={(newText) => setContact(newText)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View style={tw`overflow-hidden pb-1 mt-1`}>
        <View
          style={[
            tw`flex-row w-full h-16 items-center justify-between px-3 shadow `,
          ]}
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
        <View style={tw`p-2 mt-0`}>
          {renderLogo()}
          {renderName()}
          {renderType()}
          {renderOpenDays()}
          {renderLocation()}
          {renderContact()}
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
