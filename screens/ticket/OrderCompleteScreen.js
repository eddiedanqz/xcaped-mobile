import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Icon, Text } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { StatusBar } from "expo-status-bar";
import SafeAreaView from "react-native-safe-area-view";
import Section from "../../components/content/Section";
import TextButton from "../../components/buttons/TextButton";

const bgImage = require("../../assets/background-png-transparent.png");


const OrderCompleteScreen = ({navigation}) => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <View
        style={[
          tw` flex-1 justify-center items-center mt-6`,
        ]}
      >
        <Image
        source={bgImage}
        style={tw`w-full h-full`}
        blurRadius={10}
        />
       
 <View
          style={[
            tw` w-full  shadow-lg py-2 px-3 absolute`,
          ]}
        >
      <View style={tw`bg-white justify-center items-center rounded-lg px-1`}>

          {/**Top Card */}
          <View style={tw`flex-col justify-center items-center p-3`}>
            <View
              style={tw`bg-white items-center justify-center w-28 h-20 p-3 rounded -bottom-8`}
            >
                <Icon
                  type="feather"
                  name="check-circle"
                  size={50}
                  color="#34d399"
                />
            </View>
            <Section
              title="Payment Complete"
              titleStyle={tw`font-bold text-green-400 text-center pt-10`}
            >
              <Text style={tw`text-base text-gray-500 text-center mt-2`}>
                Thank  you, your payment has been successful.
              </Text>
              <Text style={tw`text-base text-gray-500 text-center`}>
              Your Tickets has been sent to your email.
              </Text>
            </Section>
          </View>

          {/**Order Details */}
          <View style={tw`flex-row justify-center items-center p-3`}>
            <Section
              title="Order Details"
              titleStyle={tw`text-lg font-bold text-gray-700 border-b border-gray-300`}
            >
              {/** */}
              <View style={tw`flex-row justify-between bg-white `}>
                {/**left */}
                  <Text style={tw`text-base font-bold text-gray-600`}>
                    Order No.
                  </Text>
                {/**right */}
                  <Text style={tw`text-base text-gray-500`}>#xcp123445</Text>
              </View>
              {/** */}
              <View style={tw`flex-row justify-between `}>
                {/**left */}
                  <Text style={tw`text-base font-bold text-gray-600`}>
                    Order Date
                  </Text>
                {/**right */}
                  <Text style={tw`text-base text-gray-500`}>1/05/2022</Text>
                </View>
              {/** */}
              <View style={tw`flex-row justify-between`}>
                {/**left */}
                  <Text style={tw`text-base font-bold text-gray-600`}>
                    Payment Type
                  </Text>
                {/**right */}
                  <Text style={tw`text-base text-gray-500`}>MOMO</Text>
              </View>
              <View style={tw`flex-row justify-between`}>
                {/**left */}
                  <Text style={tw`text-base font-bold text-gray-600`}>
                    Sent To
                  </Text>
                {/**right */}
                  <Text style={tw`text-base text-gray-500`}>123@gmail.com</Text>
              </View>

              <View style={tw`flex-row justify-between`}>
                {/**left */}
                  <Text style={tw`text-base font-bold text-gray-600`}>
                    No. Of Items
                  </Text>
                {/**right */}
                  <Text style={tw`text-base text-gray-500`}>6</Text>
              </View>

              <View style={tw`flex-row bg-white `}>
                {/**left */}
                <View style={[tw`justify-center w-4/12`]}>
                  <Text style={tw`text-base font-bold text-gray-600`}>
                    Total
                  </Text>
                </View>
                {/**right */}
                <View style={tw`justify-center items-end w-8/12`}>
                  <Text style={tw`text-base text-gray-500`}>$366</Text>
                </View>
              </View>
            </Section>
          </View>

          <TextButton
            label="Continue"
            buttonContainerStyle={[tw`bg-transparent rounded-lg p-3 w-48 mb-2`]}
            labelStyle={[tw` text-xl`, { color: "#ff8552" }]}
                onPress={() => navigation.navigate('Explore')}
          />
        </View>
        </View>

      </View>
    </View>
  );
};

export default OrderCompleteScreen;
