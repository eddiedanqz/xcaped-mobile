import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import tw from "twrnc";

import { AuthContext } from "../../context/AuthContext";
import TopHeader from "../../components/TopHeader";
import { COLORS } from "../../constants/theme";

const List = ({ containerStyle, title, icon, onPress, iconColor }) => {
  return (
    <TouchableOpacity
      style={[
        tw`mb-2 p-3 flex-row items-center border-b border-gray-300`,
        containerStyle,
      ]}
      onPress={onPress}
    >
      <Icon type="font-awesome-5" name={icon} size={20} color="gray" />
      <Text style={tw`mx-4 font-bold text-lg text-gray-600`}>{title}</Text>
    </TouchableOpacity>
  );
};

const SettingsScreen = ({ navigation }) => {
  const { signOut, isLoading, setLoading } = React.useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center`}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center`}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`overflow-hidden`}>
        <TopHeader
          title="Settings"
          leftIcon={
            <Icon
              type="font-awesome-5"
              name="arrow-left"
              size={20}
              color="white"
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
        <List title="Password" icon="shield-alt" />
        <List title="Notifications" icon="bell" />
        <List title="About" icon="info-circle" />
        <List title="Help" icon="question-circle" />
        <List title="Log out" icon="sign-out-alt" onPress={() => signOut()} />

        <View style={tw`flex-1 items-center justify-center my-5`}>
          <Text style={tw`text-lg text-gray-500`}>xcaped</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
