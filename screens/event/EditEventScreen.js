import React, { Fragment, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Icon, Input, BottomSheet, ListItem } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { BASEURL } from "@env";
import TextButton from "../../components/buttons/TextButton";
import BannerImage from "../../components/BannerImage";
import MapModal from "../../components/modal/MapModal";
import RadioButton from "../../components/buttons/RadioButton";
import Validator from "../../components/errors/Validator";

const EditEventScreen = ({ navigation, route }) => {
  const [id, setId] = useState(0);
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
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLat] = useState('');
  const [longitude, setLon] = useState('');
  const [description, setDescription] = useState("");
  const [path, setPath] = useState("");
  const [image, setImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [option, setOption] = useState(null);
  const [errors, setError] = useState('')
  const [isError, setIsError] = useState(false)
  const [isOk, setIsOk] = useState(false)
  const [success, setSucess] = useState('')

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let dateValue = tempDate.toDateString().split("T")[0];
    let timeValue = tempDate.toLocaleTimeString().replace(/(.*)\D\d+/, "$1");
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

  //Load Image
  let openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    const sizeInMb = pickerResult.assets[0].fileSize / 1024 / 1024
    if ( sizeInMb > 1) {
      alert('File shuld be less than 1mb')
      //set error
      return
    }
    setPath(pickerResult.assets[0].uri);
    //console.log(path);
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
  const chooseCategory = (i, c) => {
    setIsVisible(false);
    setSelectedCategory(i);
    setCategoryId(c.id);
  };
  
  const renderTitle = () => {
    return (
      <View style={tw`justify-start`}>
        {/*Title*/}
        <View style={tw`mt-4 flex-row items-center justify-center`}>
          <Input
            placeholder="Title"
            textContentType="none"
            leftIcon={
              <Icon type="feather" name="type" size={20} color="gray" />
            }
            onChangeText={(newText) => setTitle(newText)}
            defaultValue={title}
          />
        </View>
      </View>
    );
  };

  const renderCategory = () => {
    return (
      <View style={tw`justify-start`}>
        {/*Category*/}
        <View style={tw`mb-2 ml-1 p-3 flex-row items-center`}>
          <Icon type="feather" name="tag" size={20} color="gray" />
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Text style={tw`mx-2 text-lg text-gray-600`}>
              {selectedCategory == -1
                ? category
                : categories[selectedCategory].name}
            </Text>
          </TouchableOpacity>

          {/**Category List */}
          <BottomSheet modalProps={{}} isVisible={isVisible}>
            {categories.map((c, i) => (
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
      </View>
    );
  };

  const renderBanner = () => {
    return (
      <Fragment>
        {/**Image */}
        <View
          style={tw`mb-3 mt-4 w-full h-52 flex-1 justify-center items-center`}
        >
          <BannerImage
            onPress={openImagePickerAsync}
            url={image && `${BASEURL}/storage/images/uploads/${image}`}
          />
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

  const renderDate = () => {
    return (
      <Fragment>
        {/*Date & Time*/}
        <View style={tw`mt-5 mb-3 ml-3 flex-row`}>
          <View style={tw`flex-col items-center`}>
            <Icon type="font-awesome-5" name="clock" size={22} color="gray" />
            {showDate ? (
              <TouchableOpacity
                style={tw`mt-2 p-1 rounded-full`}
                onPress={() => setShowDate(false)}
              >
                <Icon
                  type="font-awesome-5"
                  name="minus"
                  size={17}
                  color="#ff8552"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={tw`mt-2 p-1 rounded-full`}
                onPress={() => setShowDate(true)}
              >
                <Icon
                  type="font-awesome-5"
                  name="plus"
                  size={17}
                  color="#ff8552"
                />
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
                {start ? start.split("T")[0] : "D-MM-YY"}
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
                    {end != 'null' ? end.split("T")[0] : "D-MM-YY"}
                  </Text>
                  <Text
                    style={tw`text-base text-gray-600`}
                    onPress={endTimepicker}
                  >
                    {endTime != 'null' ? endTime : "00:00"}
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
      <View style={tw`justify-start`}>
        {/*Location*/}
        <View style={tw`flex-row items-center justify-center`}>
          <Input
            placeholder="Venue"
            textContentType="none"
            leftIcon={
              <Icon type="feather" name="map-pin" size={20} color="gray" />
            }
            onChangeText={(newLoc) => setLocation(newLoc)}
            defaultValue={location}
          />
        </View>
         {/*Address*/}
         <View style={tw`p-3 flex-row items-center justify-center`}
        >
          <Input
            placeholder="Address*"
            textContentType="none"
            leftIcon={
              <Icon
              type="feather"
                name="map"
                size={20}
                color="gray"
              />
            }
            onChangeText ={addr => setAddress(addr)}
            onFocus = {()=> Keyboard.dismiss()}
            onPressIn = { () => setShowModal(true)}
            defaultValue={address}
          />
        </View>
      </View>
    );
  };

  const renderDescription = () => {
    return (
      <View style={tw`justify-start`}>  
        {/*Description*/}
        <View style={tw`mx-1 mb-5 items-center justify-center`}>
          <Input
            placeholder="Description"
            textContentType="none"
            multiline={true}
            numberOfLines={5}
            leftIcon={
              <Icon type="feather" name="file-text" size={20} color="gray" />
            }
            onChangeText={(des) => setDescription(des)}
            defaultValue={description}
          />
        </View>
      </View>
    );
  };

  const sendGps = (values) => {
    setAddress(values.address)
    setLat(values.latitude)
    setLon(values.longitude)
    setShowModal(false)
   }

  // extract the filetype
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
    formData.append("lat", latitude);
    formData.append("lon", longitude);
    formData.append("description", description);
    formData.append('type', option)

  
 const checkFields = () => {
    //title
    if (title == "") {
       setError('Title is required')
       setIsError(true)
       return
    }
    //category
    if (categoryId == "") {
      setError('Select a category')
      setIsError(true)
      return
    }
    //startDate //StartTime
    if (start == "" || startTime == "") {
      setError('Date and Time are required')
      setIsError(true)
      return
    }
    //Venue
    if (location == "" || description =="" ) {
      setError(['Event venue and description are required'])
      setIsError(true)
      return
    }
    if (address == "") {
      setError(['Event Address is required'])
      setIsError(true)
      return
    }
    updateData()
     }

  const updateData = () => {
    console.log(formData)
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Authorization: `Bearer ${parsed}`,
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(`${BASEURL}/api/event/${id}`, formData, config)
        .then((res) => {
          console.log(res.data);
          setSucess(res.data)
          setIsOk(true)
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  const getData = (id) => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .get(`${BASEURL}/api/event/edit/${id}`, config)
        .then((res) => {
          let { data } = res.data;
          // console.log(data)
          setTitle(data.title);
          setCategoryId(data.category.id);
          setCategory(data.category.name)
          setStartDate(data.start_date);
          setStartTime(data.start_time);
          setEndDate(data.end_date);
          setEndTime(data.end_time);
          setImage(data.banner);
          setDescription(data.description);
          setLocation(data.venue);
          setAddress(data.address);
          setLat(data.lat);
          setLon(data.lon);
          setOption(data.type);
          if (data.end_date != "null") {
            setShowDate(true);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });
  };

  const getCategories = () => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .get(`${BASEURL}/api/categories`, config)
        .then((res) => {
          // console.log(res.data.data)
          setCategories(res.data.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  const clearError = () => {
    if (isOk) {
     setTimeout(() => {
       setIsOk(false)
        setSucess('')
     }, 5000);
    }
    
    }
 
  useEffect(() => {
    getCategories();
    let { id } = route.params;
    setId(id);
    getData(id);

    return () => {
      setTitle("");
      setCategoryId(0);
      setSelectedCategory("");
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
      setImage("");
      setDescription("");
      setLocation("");
      setId(0);
    };
  }, []);

  useEffect(() => {
    clearError()
  }, [isOk])

  return (
    <SafeAreaView style={tw`h-full bg-white`}>
      {/*Header*/}
      <View style={tw`overflow-hidden pb-1 mt-2`}>
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
            style={tw`justify-center ml-2 p-3`}
            onPress={() => navigation.goBack()}
          >
            <Icon type="feather" name="x" size={20} color="#ff8552" />
          </TouchableOpacity>
          <View>
            <Text style={tw`text-black text-gray-700 text-base mr-2`}>
              {" "}
              Edit Event
            </Text>
          </View>
          <TouchableOpacity onPress={checkFields}>
            <Text style={tw`text-black text-gray-700 text-base mr-2`}>
              {" "}
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAwareScrollView>
        {/**Stepper */}

        <View style={tw`justify-center p-3`}>
          {renderTitle()}
          {renderCategory()}
          {renderBanner()}
          {renderDate()}
             {/**Type */}
            <View  style={tw`items-start`}>
             <RadioButton data={['Private','Public']} onSelect={(value) => setOption(value)} 
             buttonStyle={tw`justify-between`} option={option} />
            </View>

          {renderVenue()}
          {renderDescription()}
        </View>
      </KeyboardAwareScrollView>
      {isError && 
      (<View style={tw`flex flex-row justify-between items-center bg-red-600 z-10 mx-4 p-2 bottom-20 rounded z-10`}>
        <Text style={tw`text-base text-white`}>{errors}</Text>
        <TouchableOpacity style={tw``} onPress={() => {
          setIsError(false)
          setError('')
        }
          }>
        <Icon type="feather" name="x" size={20} color="white" />
        </TouchableOpacity>
      </View>
      )}

    {isOk&&
      (    
      <Validator data={success} isVisible={isOk}
      viewStyle={tw`top-3/4 right-0 left-0 mx-28`}
       messageStyle={tw`bg-black p-3 rounded-full bg-opacity-70`}/>
      )
      }

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  textArea: {
    height: 200,
    textAlignVertical: "top",
  },
});

export default EditEventScreen;
