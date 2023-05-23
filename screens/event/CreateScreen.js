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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import base64 from "react-native-base64";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { BASEURL } from "@env";
import TextButton from "../../components/buttons/TextButton";
import RadioButton from "../../components/buttons/RadioButton";
import BannerImage from "../../components/BannerImage";
import StepHeader from "../../components/stepper/StepHeader";
import StepFooter from "../../components/stepper/StepFooter";
import MapModal from "../../components/modal/MapModal";
import AddTicket from "../../components/modal/AddTicket";

const CreateScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [start, setStartDate] = useState("");
  const [end, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [type, setType] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLat] = useState("");
  const [longitude, setLon] = useState("");
  const [description, setDescription] = useState("");
  const [path, setPath] = useState("");
  const [image, setImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [categoryId, setCategoryId] = useState(0);
  const [category, setCategories] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(["Review", "Payment", "Finish"]);
  const [showModal, setShowModal] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [option, setOption] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let dateValue = tempDate.toISOString().split("T")[0];
    let timeValue = tempDate.toLocaleTimeString().replace(/(.*)\D\d+/, "$1");
    //
    type == "start" ? setStartDate(`${dateValue}`) : "";
    type == "startTime" ? setStartTime(`${timeValue}`) : "";
    type == "end" ? setEndDate(`${dateValue}`) : "";
    type == "endTime" ? setEndTime(`${timeValue}`) : "";
  };

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

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const startDatepicker = () => {
    showMode("date");
    setType("start");
  };

  const startTimepicker = () => {
    showMode("time");
    setType("startTime");
  };

  const endDatepicker = () => {
    showMode("date");
    setType("end");
  };
  const endTimepicker = () => {
    showMode("time");
    setType("endTime");
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

  const renderBanner = () => {
    return (
      <Fragment>
        {/**Image */}
        <View style={tw`mt-5 mb-3 w-80 h-52 flex justify-center self-center`}>
          <BannerImage onPress={openImagePickerAsync} url={path} />
          {/**Button */}
          <View
            style={tw`bg-transparent w-12 h-12 absolute bottom-0 right-2 items-center justify-end`}
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
      </Fragment>
    );
  };

  const renderTitle = () => {
    return (
      <Fragment>
        {/*Title*/}
        <View style={tw`p-3 flex-row items-center justify-center`}>
          <Input
            placeholder="Title"
            textContentType="none"
            leftIcon={
              <Icon type="feather" name="type" size={20} color="gray" />
            }
            onChangeText={(newText) => setTitle(newText)}
          />
        </View>
      </Fragment>
    );
  };

  const renderCat = () => {
    return (
      <Fragment>
        {/*Category*/}
        <View style={tw`mb-2 ml-1 p-3 flex-row items-center`}>
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
      </Fragment>
    );
  };

  const renderDateAndTime = () => {
    return (
      <Fragment>
        {/*Date & Time*/}
        <View style={tw`mt-5 flex-row py-2 px-3`}>
          <View style={tw`flex-col items-center`}>
            <Icon type="feather" name="clock" size={20} color="gray" />
            {showDate ? (
              <TouchableOpacity
                style={tw`mt-3`}
                onPress={() => setShowDate(false)}
              >
                <Icon type="feather" name="minus" size={20} color="#ff8552" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={tw`mt-3`}
                onPress={() => setShowDate(true)}
              >
                <Icon type="feather" name="plus" size={20} color="#ff8552" />
              </TouchableOpacity>
            )}
          </View>
          {/**Start Date */}
          <View style={tw`flex-1`}>
            <View style={tw`flex-row justify-between mx-4`}>
              <Text
                style={tw`text-base text-gray-600`}
                onPress={startDatepicker}
              >
                {start ? start : "D-MM-YY"}
              </Text>
              <Text
                style={tw` text-base text-gray-600`}
                onPress={startTimepicker}
              >
                {startTime ? startTime : "00:00"}
              </Text>
            </View>
            {/**End Date */}
            {showDate && (
              <View style={tw`flex-row items-center mt-2`}>
                <View
                  style={tw`flex-1 flex-row justify-between items-center mx-4 `}
                >
                  <Text
                    style={tw`text-base text-gray-600`}
                    onPress={endDatepicker}
                  >
                    {end ? end : "D/MM/YY"}
                  </Text>
                  <Text
                    style={tw`text-base text-gray-600`}
                    onPress={endTimepicker}
                  >
                    {endTime ? endTime : "00:00"}
                  </Text>
                </View>
              </View>
            )}

            {/**Toggle End Date */}
            {!showDate && (
              <Text style={[tw`text-base mx-4 mt-2`, { color: "#ff8552" }]}>
                Add End Date
              </Text>
            )}
          </View>

          {/*Picker*/}
          <View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>
      </Fragment>
    );
  };

  const renderVenue = () => {
    return (
      <View>
        {/*Location*/}
        <View style={tw`py-2 px-1 flex-row items-center justify-center`}>
          <Input
            placeholder="Venue"
            textContentType="none"
            leftIcon={
              <Icon type="feather" name="map-pin" size={20} color="gray" />
            }
            onChangeText={(newLoc) => setLocation(newLoc)}
            //defaultValue={location}
          />
        </View>
        {/*Address*/}
        <View style={tw`py-2 px-1 flex-row items-center justify-center`}>
          <Input
            placeholder="Address*"
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

  const renderDescription = () => {
    return (
      <Fragment>
        {/*Description*/}
        <View style={tw`px-1 py-2 mb-5 items-center justify-center`}>
          <Input
            placeholder="Description"
            textContentType="none"
            multiline={true}
            numberOfLines={5}
            leftIcon={
              <Icon type="feather" name="file-text" size={20} color="gray" />
            }
            onChangeText={(des) => setDescription(des)}
          />
        </View>
      </Fragment>
    );
  };

  const renderTicket = () => {
    return (
      <TouchableOpacity
        style={tw`flex-row items-center m-1`}
        onPress={() => setShowTicket(true)}
      >
        {tickets.length < 1 ? (
          <View style={tw`flex-row items-center m-1`}>
            <Icon
              name="plus"
              type="feather"
              size={20}
              color="#ff8552"
              style={tw`p-2`}
            />
            <Text
              style={[tw`text-lg text-gray-700 mx-1`, { color: "#ff8552" }]}
            >
              Add Ticket
            </Text>
          </View>
        ) : (
          <Text style={tw`text-lg text-gray-700 mx-3`}>
            Tickets Added : {tickets.length}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  //     // console.log('slug')
  //       SecureStore.getItemAsync("mytoken").then((token) => {
  //     let parsed = JSON.parse(token)
  //   fetch(`${BASEURL}/api/verify/slug`, {
  //   method: "POST",
  //   headers: new Headers({
  //     "Accept": "application/json",
  //     "Content-Type": undefined,
  //     "Authorization": `Bearer ${parsed}`,
  //   }),
  //   body: JSON.stringify(title),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //       console.log(data.errors)
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // })
  //   }

  // extract the filetype

  const sendGps = (values) => {
    setAddress(values.address);
    setLat(values.latitude);
    setLon(values.longitude);
    setShowModal(false);
  };

  const addTicket = (values) => {
    setTickets(values);
    console.log(values);
  };

  const inputs = {
    title,
    categoryId,
    start,
    startTime,
    location,
    description,
  };

  let fileType = path.substring(path.lastIndexOf(".") + 1);
  let formData = new FormData();
  if (path) {
    formData.append("image", {
      uri: Platform.OS === "ios" ? path.replace("file://", "") : path,
      name: path.split("/").pop(),
      type: `image/${fileType}`,
    });
  }

  formData.append("title", title);
  formData.append("category_id", categoryId);
  formData.append("start_date", start);
  formData.append("start_time", startTime);
  formData.append("end_date", end);
  formData.append("end_time", endTime);
  formData.append("venue", location);
  formData.append("address", address);
  formData.append("lat", latitude);
  formData.append("lon", longitude);
  formData.append("description", description);
  formData.append("tickets", JSON.stringify(tickets));
  formData.append("type", option);

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

  return (
    <SafeAreaView style={tw`h-full bg-white`}>
      {/*Header*/}
      <View style={tw`overflow-hidden pb-1 mt-1`}>
        <View
          style={[
            tw`flex-row w-full h-16 items-center justify-between px-3 shadow `,
            // {backgroundColor: '#fff',
            //   shadowColor: '#000',
            //   shadowOffset: { width: 1, height: 1 },
            //   shadowOpacity: 0.1,
            //   shadowRadius: 2,
            //   elevation: 1,}
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
        {/**Stepper */}
        <StepHeader steps={steps} currentStep={currentStep} />
        <View style={tw`mb-5 w-full`}>
          {currentStep == 0 && (
            <View style={tw`h-80 self-center justify-center p-2 mt-4`}>
              {renderBanner()}
              {renderTitle()}
              {renderCat()}
            </View>
          )}
          {currentStep == 1 && (
            <View style={tw`h-80 self-center justify-center p-2 mt-4`}>
              {renderDateAndTime()}
              {renderVenue()}
              {renderDescription()}
            </View>
          )}
          {currentStep == 2 && (
            <View style={tw`h-80 p-2`}>
              {/**Type */}
              <RadioButton
                data={["Private", "Public"]}
                onSelect={(value) => setOption(value)}
              />
              {/**Ticket */}
              {renderTicket()}
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>

      <StepFooter
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        params={formData}
        navigation={navigation}
        inputs={inputs}
      />
      {/**Filter */}
      {showModal && (
        <MapModal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          sendGps={sendGps}
        />
      )}
      {/**Ticket */}
      {showTicket && (
        <AddTicket
          isVisible={showTicket}
          onClose={() => setShowTicket(false)}
          addTicket={addTicket}
        />
      )}
    </SafeAreaView>
  );
};

export default CreateScreen;
