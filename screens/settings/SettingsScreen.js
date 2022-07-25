import React from 'react'
import { View,TouchableOpacity,ScrollView,Text} from 'react-native'
import { Button,Icon} from "react-native-elements";
import tw from "tailwind-react-native-classnames";

import { AuthContext } from "../../context/AuthContext";
import TopHeader from "../../components/TopHeader";

const List =  ({containerStyle,title, icon,onPress,iconColor}) => {
  return (
  <TouchableOpacity style={[tw `mb-2 p-3 flex-row items-center border-b border-gray-300`,containerStyle]}
   onPress={onPress}>
    <Icon type='font-awesome-5' name={icon} size={20} color="gray" />
      <Text style={tw `mx-4 font-bold text-lg text-gray-600`}>{title}</Text>
  </TouchableOpacity>
  )}

const SettingsScreen = ({ navigation }) => {
    const { signOut } = React.useContext(AuthContext);

    return (
        <View style={tw `flex-1 bg-white mt-6`}>
          <TopHeader title="Settings"
        leftIcon={
          <Icon type='font-awesome-5' name="arrow-left" size={20} color="white"
          onPress={() => navigation.goBack() } />
        }
        
      />
      <ScrollView showsVerticalScrollIndicator={false} style={tw `p-5`}>
      <List title='Edit profile' icon='edit'/>
      <List title='Accout' icon='key'/>
      <List title='Privacy & Security' icon='shield-alt'/>
      <List title='Notifications' icon='bell'/>
      <List title='About' icon='info-circle'/>
      <List title='Help' icon='question-circle'/>
      <List title='Log out' icon='sign-out-alt' onPress={() => signOut()}/>

    <View style={tw `flex-1 items-center justify-center my-5`}>
      <Text style={tw`text-lg text-gray-500`}>xcaped</Text>
      </View>
      </ScrollView>

        </View>
    )
}

export default SettingsScreen;
