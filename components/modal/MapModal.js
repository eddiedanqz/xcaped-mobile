import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { BASEURL } from "../../config/config";
import TwoPointSlider from "../search/TwoPointSlider";
import TextButton from "../buttons/TextButton";
import Section from "../content/Section";
import { FilterContext } from "../../context/filterContext";

// const Section = ({ containerStyle, title, children }) => {
//   return (
//     <View style={[tw`my-3`, containerStyle]}>
//       <Text style={tw`font-bold text-lg`}>{title}</Text>
//       {children}
//     </View>
//   );
// };

const MapModal = ({ isVisible, onClose, sendGps }) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = useState(isVisible);
  const [result, setResults] = useState("");
  const [address, setAddress] = useState("");
  const [coord, setCoord] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [isGranted, setGranted] = useState("");

  function renderLocation() {
    return (
      <View
        style={tw`flex-row items-center justify-center bg-gray-200 mx-3 my-2 py-1.5 px-2 rounded-lg`}
      >
        <TextInput
          style={tw`flex-1 text-lg mx-3`}
          placeholder="Type address here"
          placeholderTextColor="gray"
          onChangeText={(val) => setAddress(val)}
          returnKeyType="search"
          value={address}
          onSubmitEditing={() => geocode()}
        />
      </View>
    );
  }

  let values = {
    address,
    latitude: coord.latitude,
    longitude: coord.longitude,
  };

  const geocode = async () => {
    // let { status } = await Location.requestForegroundPermissionsAsync();
    if (isGranted !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.geocodeAsync(address);
    setCoord({
      latitude: location[0].latitude,
      longitude: location[0].longitude,
    });
    console.log(location);
  };

  const revGeocode = async () => {
    // let { status } = await Location.requestForegroundPermissionsAsync();
    if (isGranted !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.reverseGeocodeAsync(coord);
    setAddress(location[0].name);
    console.log(location);
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
    console.log(text);
  }
  // else if (coord) {
  //   text = JSON.stringify(coord);
  //   console.log(text)
  // }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCoord({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setGranted(status);
    })();
  }, []);

  useEffect(() => {
    if (showModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [550, 200],
  });

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={tw`flex-1 bg-black bg-opacity-50`}>
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={tw`absolute bottom-0 top-0 left-0 right-0 `} />
        </TouchableWithoutFeedback>
      </View>
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          top: modalY,
          width: "100%",
          height: "87%",
          backgroundColor: "white",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        {/**Header */}
        <View
          style={tw`flex-row justify-between items-center border-b border-gray-400 py-4 px-5`}
        >
          <TouchableOpacity
            style={tw`rounded-lg`}
            onPress={() => sendGps(values)}
          >
            <Text style={[tw`font-bold text-base`, { color: "#ff8552" }]}>
              Done
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`rounded-lg`}
            onPress={() => setShowModal(false)}
          >
            <Icon type="feather" name="x" size={20} color="gray" />
          </TouchableOpacity>
        </View>

        {/**Location */}
        {renderLocation()}
        <View style={tw`flex-1`}>
          <MapView style={tw`w-full h-full`} region={coord}>
            <Marker
              draggable={true}
              coordinate={coord}
              onDragEnd={(e) => {
                setCoord(e.nativeEvent.coordinate);
                revGeocode(e.nativeEvent.coordinate);
              }}
            />
          </MapView>
        </View>

        {/**Button */}
        {/* <View style={tw`absolute h-24 bottom-20 left-0 right-0 p-3 bg-white`}>
      <TextButton label='Done' buttonContainerStyle={tw`h-11 rounded`} onPress={() => {
         addFilters(values)
        filterData()
      }
        }/>
        </View> */}
      </Animated.View>
    </Modal>
  );
};

export default MapModal;
