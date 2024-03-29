import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from "react-native";
import { Button, Icon } from "@rneui/themed";
import tw from "twrnc";

import { AuthContext } from "../../context/AuthContext";
import TopHeader from "../../components/TopHeader";
import { COLORS } from "../../constants/theme";
import { BASEURL } from "../../config/config";

const List = ({ containerStyle, title, icon, onPress, iconColor }) => {
  return (
    <TouchableOpacity
      style={[
        tw`mb-2 p-3 flex-row items-center border-b border-gray-300`,
        containerStyle,
      ]}
      onPress={onPress}
    >
      <Icon type="feather" name={icon} size={20} color="gray" />
      <Text style={tw`mx-4 font-bold text-lg text-gray-600`}>{title}</Text>
    </TouchableOpacity>
  );
};

const SettingsScreen = ({ navigation }) => {
  const { signOut, isLoading, setLoading } = React.useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center`}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`overflow-hidden`}>
        <TopHeader
          title="Settings"
          leftIcon={
            <Icon
              type="feather"
              name="arrow-left"
              size={20}
              color="black"
              onPress={() => navigation.goBack()}
            />
          }
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={tw`p-5`}>
        <List
          title="Edit profile"
          icon="edit"
          onPress={() => navigation.navigate("Edit Profile")}
        />
        {/* <List title='Accout' icon='key'/> */}
        <List
          title="Password"
          icon="lock"
          onPress={() => navigation.navigate("Password")}
        />
        <List title="Notifications" icon="bell" />
        <List
          title="About"
          icon="info"
          onPress={() => navigation.navigate("About")}
        />
        <List
          title="Help"
          icon="help-circle"
          onPress={() => navigation.navigate("Help")}
        />
        <List title="Log out" icon="log-out" onPress={() => signOut()} />

        <View style={tw`flex-1 items-center justify-center my-5`}>
          <Text style={tw`text-lg text-gray-500`}>xcaped</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
