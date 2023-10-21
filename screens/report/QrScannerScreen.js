import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { Icon } from "@rneui/themed";
import tw from "twrnc";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { BarCodeScanner } from "expo-barcode-scanner";

import { BASEURL } from "../../config/config";
import TextButton from "../../components/buttons/TextButton";
import Validator from "../../components/errors/Validator";

const QrScannerScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [info, setInfo] = useState({});
  const [scanned, setScanned] = useState(false);
  const [checked, setChecked] = useState(false);
  const [errors, setError] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      console.log(hasPermission);
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    // alert(`Bar code with data ${data} has been scanned!`);
    setChecked(false);
    setScanned(true);
    // console.log(data);
    checkIn(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const checkIn = (data) => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${parsed}`,
        },
      };
      axios
        .post(`${BASEURL}/api/attendee/checkin`, { id: data }, config)
        .then((res) => {
          // console.log(res.data)
          setChecked(true);
          setInfo(res.data.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setError(err.response.data);
          setIsError(true);
        });
    });
  };

  return (
    <View style={tw`flex-1 h-28 justify-center items-center`}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <TextButton
          label="Tap to Scan Again"
          onPress={() => {
            setScanned(false);
            setChecked(false);
            setInfo({});
            setIsError(false);
          }}
          labelStyle={tw`text-sm`}
          buttonContainerStyle={tw`py-3 px-6 rounded-2xl bg-white bg-opacity-20`}
        />
      )}

      <View style={tw`flex w-full absolute top-10 h-28`}>
        <View
          style={[tw`flex-row w-full h-16 items-center justify-between px-5`]}
        >
          <TouchableOpacity
            style={tw`rounded-xl bg-white bg-opacity-20 p-3 justify-center`}
            onPress={() => navigation.goBack()}
          >
            <Icon type="feather" name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={tw`text-lg font-semibold text-white`}>Scan QR Code</Text>
          <View></View>
        </View>
      </View>

      {checked && (
        <View
          style={tw`flex bg-white w-10/12 mx-5 absolute bottom-20 rounded-2xl h-28`}
        >
          <View style={[tw`flex-row items-center justify-between p-4`]}>
            <View style={tw`justify-center p-2`}>
              <Text style={tw`text-base text-gray-500 font-semibold`}>
                {info.fullname}
              </Text>
              <Text style={tw`text-lg font-semibold text-gray-700`}>
                ID:{info.reference}
              </Text>
              <View style={tw`flex-row`}>
                <Text style={tw`text-base font-semibold text-gray-500`}>
                  {info.ticket?.title}
                </Text>
                <Text
                  style={tw`text-base font-semibold text-gray-500 mx-2 border-r border-gray-300`}
                >
                  |
                </Text>
                <Text style={tw`text-base font-semibold text-gray-500`}>
                  GHS{info.ticket?.price}
                </Text>
              </View>
            </View>
            <Icon
              type="feather"
              name={info.status == "checked" ? "check-circle" : "alert-octagon"}
              size={20}
              color="white"
              containerStyle={tw`${
                info.status == "checked" ? "bg-green-400" : "bg-yellow-400"
              } rounded-md p-3`}
            />
          </View>
        </View>
      )}

      {isError && (
        <Validator
          data={errors}
          isVisible={isError}
          viewStyle={tw`top-3/4 right-0 left-0 mx-10`}
          messageStyle={tw`bg-blue-500 p-4 rounded-full`}
          onPress={() => {
            setIsError(false);
            setError([]);
          }}
        />
      )}
    </View>
  );
};

export default QrScannerScreen;
