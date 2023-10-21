import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import tw from "twrnc";
import { Icon, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import { BASEURL } from "../../config/config";
import { requestValidator } from "../../utils/utils";
import Section from "../../components/content/Section";
import Validator from "../../components/errors/Validator";
import { COLORS } from "../../constants/theme";

const noImage = require("../../assets/Profile_avatar_placeholder_large.png");

const EditProfileScreen = ({ navigation }) => {
  const [fullname, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [validation, setValidator] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [path, setPath] = useState("");
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);

  //Load Image
  let openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    // console.log(pickerResult.assets[0]);
    const sizeInMb = pickerResult.assets[0].fileSize / 1024 / 1024;
    if (sizeInMb > 1) {
      alert("File shuld be less than 1mb");
      //set error
      return;
    }
    setPath(pickerResult.assets[0].uri);
    setShowModal(true);
  };

  // extract the filetype
  let fileType = path.substring(path.lastIndexOf(".") + 1);

  let formData = new FormData();
  formData.append("image", {
    uri: Platform.OS === "ios" ? path.replace("file://", "") : path,
    name: path.split("/").pop(),
    type: `image/${fileType}`,
  });

  const updateProfile = () => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Authorization: `Bearer ${parsed}`,
        },
      };

      axios
        .post(
          `${BASEURL}/api/profile/update`,
          {
            fullname,
            username,
            email,
            bio,
            location,
          },
          config
        )
        .then((res) => {
          let data = res.data.data;
          console.log(data);
          save("user", data);
          getValueFor("user");
          if (data) {
            setValidator({ message: "Profile updated" });
            setIsVisible(true);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          setValidator(err.response.data);
          setIsVisible(true);
        });
    });
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

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      let parsed = JSON.parse(result);
      console.log(parsed);
      setName(parsed.fullname);
      setUsername(parsed.username);
      setEmail(parsed.email);
      setLocation(parsed.profile.location);
      setImage(parsed.profile.profilePhoto);
      setBio(parsed.profile.bio);
    }
  }

  async function save(key, value) {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  }

  const clearError = () => {
    if (isVisible) {
      setTimeout(() => {
        setIsVisible(false);
        setValidator([]);
      }, 5000);
    }
  };

  let error = {};
  if (isVisible) {
    let first = requestValidator(validation);

    error = first;
    console.log(error);
  }

  useEffect(() => {
    clearError();
  }, [isVisible]);

  useEffect(() => {
    getValueFor("user");

    return () => {
      setName("");
      setUsername("");
      setEmail("");
      setLocation("");
      setBio("");
    };
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View
        style={tw`flex-row w-full h-16 items-center justify-between px-3 z-20 border-b border-gray-200`}
      >
        <TouchableOpacity
          style={tw`justify-center`}
          onPress={() => navigation.goBack()}
        >
          <Icon type="feather" name="x" size={20} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={tw`text-black text-gray-700 text-base`}>
            {" "}
            Edit Profile
          </Text>
        </View>
        <TouchableOpacity onPress={updateProfile}>
          <Text style={[tw`text-base`, { color: "#ff8552" }]}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={tw`pb-2`}>
        <KeyboardAwareScrollView keyboardDismissMode="interactive">
          <Section containerStyle={tw`mb-4 mt-4 p-2 z-0`}>
            {/**Profile Image */}
            <View
              style={tw`w-28 h-28 self-center rounded-xl border-0 shadow-xl mb-3`}
            >
              <Image
                style={tw`w-full h-full rounded-xl z-0`}
                source={
                  image
                    ? { uri: `${BASEURL}/storage/images/uploads/${image}` }
                    : noImage
                }
                resizeMode="stretch"
              />
              {/**Camera Icon */}
              <TouchableOpacity
                style={tw`absolute -right-4 -bottom-3 bg-[${COLORS.primary}] p-3 rounded-full`}
                onPress={openImagePickerAsync}
              >
                <Icon
                  type="font-awesome-5"
                  name="camera"
                  size={18}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </Section>

          <Section containerStyle={tw`mb-3 p-3`}>
            {isVisible && (
              <View
                style={tw`flex flex-row justify-center items-center p-2 mb-2`}
              >
                <Text style={tw`text-base text-green-500`}>
                  {error.message}
                </Text>
              </View>
            )}
            <View style={tw`p-1 items-center justify-center`}>
              <Input
                placeholder="Name"
                textContentType="none"
                onChangeText={(newText) => setName(newText)}
                defaultValue={fullname}
                errorMessage={error.fullname}
              />
            </View>
            {/**Username */}
            <View style={tw`p-1 items-center justify-center`}>
              <Input
                placeholder="Username"
                textContentType="none"
                onChangeText={(newText) => setUsername(newText)}
                defaultValue={username}
                errorMessage={error.username}
              />
            </View>

            {/**Email */}
            <View style={tw` p-1 items-center justify-center`}>
              <Input
                placeholder="Email"
                textContentType="emailAddress"
                onChangeText={(newText) => setEmail(newText)}
                defaultValue={email}
                errorMessage={error.email}
              />
            </View>

            {/**Location */}
            <View style={tw`p-1 items-center justify-center`}>
              <Input
                placeholder="Location"
                textContentType="none"
                onChangeText={(newText) => setLocation(newText)}
                defaultValue={location}
              />
            </View>

            {/**Bio */}
            <View style={tw`p-1 mb-2 items-center justify-center`}>
              <Input
                placeholder="Bio"
                textContentType="none"
                multiline={true}
                numberOfLines={5}
                onChangeText={(newText) => setBio(newText)}
                defaultValue={bio}
              />
            </View>
          </Section>
        </KeyboardAwareScrollView>
      </ScrollView>
      {/**Modal */}
      <Modal
        visible={showModal}
        presentationStyle="pageSheet"
        animationType="slide"
      >
        {/**Content */}
        <View style={tw` h-full`}>
          <View
            style={tw`flex-row w-full h-16 items-center justify-between px-5 z-10`}
          >
            <TouchableOpacity
              style={tw`justify-center`}
              onPress={() => setShowModal(false)}
            >
              <Text style={tw`text-base`}>Cancel</Text>
            </TouchableOpacity>
            <View></View>
          </View>
          <View style={tw`flex-1 w-full h-52 self-center border-0 px-1 my-10`}>
            <Image
              style={tw`w-full h-full`}
              source={{ uri: path }}
              resizeMode="contain"
            />
          </View>

          <View
            style={tw`flex-row w-full h-16 items-center justify-center bottom-8  px-5 z-10`}
          >
            <View></View>
            <TouchableOpacity onPress={() => updatePhoto()}>
              <Text style={[tw`text-base`, { color: "#ff8552" }]}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
