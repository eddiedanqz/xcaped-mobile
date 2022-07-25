import React from "react";
import { StyleSheet, View, Image } from "react-native";
import {  Text,Button } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

import appStyle from "../style/appStyle";

const PlaceProfileArea = () => {
  return (
    <View style={tw`absolute -top-14 items-center`}>
      {/**Image */}
      <View style={styles.shadowWrapper}>
      <Image
        style={tw`w-full h-full rounded-xl`}
        source={require("../assets/picture.jpg")}
      />
      </View>

      <Text style={tw`text-2xl font-bold`}>John Doe</Text>
      <Button title="Follow" type="clear" titleStyle={tw`text-red-400 text-lg`} />
      {/** */}
      <View style={tw`flex-1 flex-row `}>
        <View style={tw`items-center m-4`}>
          <Text style={tw`text-base font-bold`}>100k</Text>
          <Text style={tw`text-base`}>Events</Text>
        </View>
        <View style={tw`items-center m-4`}>
          <Text style={tw`text-base font-bold`}>100k</Text>
          <Text  style={tw`text-base`}>Following</Text>
        </View>
        <View style={tw`items-center m-4`}>
          <Text style={tw`text-base font-bold`}>100k</Text>
          <Text style={tw`text-base`}>Followers</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowWrapper:{
    alignSelf:'center',
    width:120,
    height:120,
    //bottom:-200,
   // position:'absolute',
    //backgroundColor:'red',
    shadowColor:'#000',
    shadowOffset:{
      width:0,
      height:5
      
    },
    shadowOpacity:0.36,
    shadowRadius:6.68,
    elevation:11,
    marginBottom:10
  },
});

export default PlaceProfileArea;
