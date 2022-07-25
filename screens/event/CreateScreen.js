import React, { Fragment, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Icon, Input, BottomSheet, ListItem } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import TopHeader from "../../components/TopHeader";
import BannerImage from "../../components/BannerImage";
import StepHeader from "../../components/stepper/StepHeader";
import StepFooter from "../../components/stepper/StepFooter";

const CreateScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [start, setStartDate] = useState("00/00/0000");
  const [end, setEndDate] = useState("00/00/0000");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [showDate, setShowDate] = useState(false);
  const [type, setType] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [category, setCategory] = useState([
    { title: "Ceremony" },
    { title: "Corporate" },
    { title: "Classes & Workshop" },
    { title: "Festival & Fairs" },
    { title: "Hangout" },
    { title: "Party" },
    { title: "Virtual" },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(["Review", "Payment", "Finish"]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let dateValue = tempDate.toDateString();
    let timeValue = tempDate.toLocaleTimeString();
    //
    type == "start"
      ? setStartDate(`${dateValue}`)
      : type == "end"
      ? setEndDate(`${dateValue}`)
      : "";
    type == "startTime"
      ? setStartTime(`${timeValue}`)
      : type == "endTime"
      ? setEndTime(`${timeValue}`)
      : "";
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const startDatepicker = () => {
    showMode("date");
    setType("start");
  };

  const endDatepicker = () => {
    showMode("date");
    setType("end");
  };
  const startTimepicker = () => {
    showMode("time");
    setType("startTime");
  };
  const endTimepicker = () => {
    showMode("time");
    setType("endTime");
  };

  const closeSheet = () => {
    setIsVisible(false);
    setSelectedCategory(-1);
  };
  const chooseCategory = (i) => {
    setIsVisible(false);
    setSelectedCategory(i);
  };

  const renderTitleAndCat = () => {
    return (
      <Fragment>
        {/*Title*/}
        <View style={tw`mt-4 p-3 flex-row items-center justify-center`}>
          <Input
            placeholder="Title"
            textContentType="none"
            leftIcon={
              <MaterialCommunityIcons name="text" size={26} color="gray" />
            }
          />
        </View>
        {/*Category*/}
        <View style={tw`mb-2 p-3 flex-row items-center`}>
          <MaterialCommunityIcons name="crown-outline" size={26} color="gray" />
          <TouchableOpacity   onPress={() => setIsVisible(true)}>
          <Text
            style={tw`mx-2 text-lg text-gray-600`}
         
          >
            {selectedCategory == -1
              ? "Choose Category"
              : category[selectedCategory].title}
          </Text>
          </TouchableOpacity>

          {/**Category List */}
          <BottomSheet modalProps={{}} isVisible={isVisible} 
           >
            {category.map((c, i) => (
              <ListItem key={i} onPress={() => chooseCategory(i)}>
                <ListItem.Content>
                  <ListItem.Title style={tw`text-lg`}>{c.title}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
            <View style={tw`bg-white`}>
            <TouchableOpacity onPress={closeSheet} style={[tw`rounded-lg p-4 m-2`,
            {backgroundColor:'#151618'}]}>
              <Text style={[tw`text-base`,{color:'#fdcc97'}]}>Cancel</Text>
            </TouchableOpacity>

            </View>
          </BottomSheet>
        </View>
      </Fragment>
    );
  };

  const renderBannerAndDate = () => {
    return (
      <Fragment>
        {/**Image */}
        <View style={tw`mb-1 p-3`}>
          <BannerImage />
        </View>

        {/*Date & Time*/}
        <View style={tw`mb-1 mx-1 p-3 flex-row`}>
          <MaterialCommunityIcons name="clock-outline" size={26} color="gray" />
          <Text style={tw`mx-2 text-lg text-gray-600`}>Date</Text>
          {/**Start Date */}
          <View>
            <View style={tw`flex-row mx-3`}>
              <Text
                style={tw`mx-2 text-lg text-gray-600`}
                onPress={startDatepicker}
              >
                {start}
              </Text>
              <Text
                style={tw`mx-2 text-lg text-gray-600`}
                onPress={startTimepicker}
              >
                {startTime}
              </Text>
            </View>
            {/**End Date */}
            {showDate && (
              <View style={tw`flex-row items-center`}>
                <TouchableOpacity onPress={() => setShowDate(false)}>
                  <Icon
                    type="font-awesome-5"
                    name="minus"
                    size={17}
                    color="red"
                  />
                </TouchableOpacity>
                <Text
                  style={tw`mx-2 text-lg text-gray-600`}
                  onPress={endDatepicker}
                >
                  {end}
                </Text>
                <Text
                  style={tw`mx-2 text-lg text-gray-600`}
                  onPress={endTimepicker}
                >
                  {endTime}
                </Text>
              </View>
            )}

            {/**Toggle End Date */}
            {!showDate && (
              <TouchableOpacity
                style={tw`flex-row items-center`}
                onPress={() => setShowDate(true)}
              >
                <Icon
                  type="font-awesome-5"
                  name="plus"
                  size={17}
                  color="blue"
                />
                <Text style={tw`text-lg text-blue-800 mx-2`}>Add End Date</Text>
              </TouchableOpacity>
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

  const renderVenueAndDetails = () => {
    return (
      <Fragment>
        {/*Location*/}
        <View style={tw`p-3 flex-row items-center justify-center`}>
          <Input
            placeholder="Location"
            textContentType="none"
            leftIcon={
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={26}
                color="gray"
              />
            }
          />
        </View>

        {/*Description*/}
        <View style={tw`mx-1 p-3 mb-5 items-center justify-center`}>
          <Input
            placeholder="Description"
            textContentType="none"
            multiline={true}
            numberOfLines={5}
            leftIcon={
              <MaterialCommunityIcons
                name="note-outline"
                size={26}
                color="gray"
              />
            }
          />
        </View>
      </Fragment>
    );
  };

  return (
    <View style={tw`h-full bg-white mb-5 mt-6`}>
      {/*Header*/}
      <View style={tw`overflow-hidden pb-1 mb-2`}>
      <View
        style={[tw`flex-row w-full h-16 items-center justify-between px-3 `,
        {backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 1,}
      ]}
      >
        <TouchableOpacity style={tw`justify-center`}  onPress={() => navigation.goBack()}>
          <Icon type="font-awesome-5" name="arrow-left" size={18} />
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`justify-center`}
          onPress={() => navigation.navigate("Create")}
        >
          <Text style={tw`text-lg text-black`}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </View>

      <KeyboardAwareScrollView>
        {/**Stepper */}
        <StepHeader steps={steps} currentStep={currentStep} />

        <View style={tw`mb-3`}>
          {currentStep == 0 && (
            <View style={tw`h-80 self-center justify-center`}>
              {renderTitleAndCat()}
            </View>
          )}
          {currentStep == 1 && (
            <View style={tw`h-80 self-center justify-center`}>
              {renderBannerAndDate()}
            </View>
          )}
          {currentStep == 2 && (
            <View style={tw`h-80 self-center justify-center`}>
              {renderVenueAndDetails()}
            </View>
          )}
        </View>
        <StepFooter
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  textArea: {
    height: 200,
    textAlignVertical: "top",
  },
});

export default CreateScreen;
