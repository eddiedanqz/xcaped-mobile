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
import tw from "tailwind-react-native-classnames";
import { Icon, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import { BASEURL } from "@env";
import { AuthContext } from "../../context/AuthContext";
import Section from "../../components/content/Section";
import Validator from "../../components/errors/Validator";

const noImage = require("../../assets/Profile_avatar_placeholder_large.png");

const EditProfileScreen = ({ navigation }) => {
  const [fullname, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setError] = useState([]);
  const [isError, setIsError] = useState(false);
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
            setError({ message: "Profile updated" });
            setIsError(true);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          setError(err.response.data);
          setIsError(true);
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
    if (isError) {
      setTimeout(() => {
        setIsError(false);
        setError([]);
      }, 5000);
    }
  };

  useEffect(() => {
    clearError();
  }, [isError]);

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
    <View style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View
        style={tw`flex-row w-full h-16 items-center justify-between mt-6 px-3 z-20`}
      >
        <TouchableOpacity
          style={tw`justify-center`}
          onPress={() => navigation.goBack()}
        >
          <Icon type="feather" name="x" size={20} color="#ff8552" />
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

      {isError && (
        <Validator
          data={errors}
          isVisible={isError}
          messageStyle={tw`bg-black p-3 rounded-lg bg-opacity-70 self-center`}
        />
      )}
      <ScrollView style={tw`pb-5`}>
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
                    ? { uri: `${BASEURL}/storage/images/user/${image}` }
                    : noImage
                }
                resizeMode="stretch"
              />
              {/**Camera Icon */}
              <TouchableOpacity
                style={tw`absolute -right-5 bottom-3 bg-green-400 p-3 rounded-full`}
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
            <View style={tw`p-1 items-center justify-center`}>
              <Input
                placeholder="Name"
                textContentType="none"
                onChangeText={(newText) => setName(newText)}
                defaultValue={fullname}
              />
            </View>
            {/**Username */}
            <View style={tw`p-1 items-center justify-center`}>
              <Input
                placeholder="Username"
                textContentType="none"
                onChangeText={(newText) => setUsername(newText)}
                defaultValue={username}
              />
            </View>

            {/**Email */}
            <View style={tw` p-1 items-center justify-center`}>
              <Input
                placeholder="Email"
                textContentType="emailAddress"
                onChangeText={(newText) => setEmail(newText)}
                defaultValue={email}
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
              onPress={() => setShowModal(false)}
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
    </View>
  );
};

export default EditProfileScreen;
