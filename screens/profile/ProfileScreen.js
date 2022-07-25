import React, { Fragment, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,StyleSheet
} from "react-native";
import tw from "tailwind-react-native-classnames";
import {Icon } from "react-native-elements";

import { AuthContext } from "../../context/AuthContext";
import Section from "../../components/Section";


function ProfileScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const { signOut } = React.useContext(AuthContext);

  const renderProfileArea = () => {
     return(
      <Fragment>
      {/**Profile Image */}
      <View style={tw`w-28 h-28 self-center mb-3 rounded-xl border-0 shadow-xl`}>
      <Image
        style={tw`w-full h-full rounded-xl`}
        source={require("../../assets/picture.jpg")}
      />
      </View>

      <Text style={tw`text-2xl font-bold text-center`}>John Doe</Text>
     {/* <TouchableOpacity style={tw`items-center`}>
         <Text style={tw`text-red-400 font-bold text-lg m-1`}>Follow</Text>
     </TouchableOpacity>*/}
      
      {/** */}
      <View style={tw`flex-1 mb-2 self-center`}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
           contentContainerStyle={tw` flex-row`}>
        <TouchableOpacity style={tw`items-center m-4`} onPress={() => navigation.navigate('My Events') }>
          <Text style={tw`text-base font-bold`}>10</Text>
          <Text style={tw`text-base`} >Events</Text>
        </TouchableOpacity>
       {/* <View style={tw`items-center m-4`}>
          <Text style={tw`text-base font-bold`}>100k</Text>
          <Text  style={tw`text-base`}>Following</Text>
        </View>
        <View style={tw`items-center m-4`}>
          <Text style={tw`text-base font-bold`}>100k</Text>
          <Text style={tw`text-base`}>Followers</Text>
        </View>
        */}
        <TouchableOpacity style={tw`items-center m-4`} onPress={() => navigation.navigate('Reports')}>
          <Icon type="font-awesome-5" name='chart-bar' size={20}/>
          <Text style={tw`text-base`}>Engagement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center m-4`} onPress={() => navigation.navigate('Saved') }>
          <Icon type="font-awesome-5" name='heart' size={20}/>
          <Text style={tw`text-base`}>Saved</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
      </Fragment>
     )
  }

  
  return (
    <SafeAreaView style={tw`flex-1 bg-white mt-6`}>
      <ScrollView>
      <View>
      {/*Cover Image*/}
      <View style={tw`self-stretch w-full h-52`}>
        <Image
          resizeMode="cover"
          style={tw`w-full h-52`}
          source={require("../../assets/picture.jpg")}
          blurRadius={10}
        />
        {/*Header*/}
        <View
          style={tw`flex-row absolute w-full h-16 items-center justify-end`}
        >

          <TouchableOpacity style={tw`justify-center pr-1.5`} onPress={() => navigation.navigate('Settings')}>
            <Icon
            type="font-awesome-5"
              name="cog"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/*Content*/}
      <View style={tw`flex-1 bg-white -top-8 rounded-t-3xl`}>
      <View style={tw`-top-14`}>

       {renderProfileArea()}
        {/**About */}
        <Section title='About'>
          <Text style={tw`font-bold text-gray-800 text-base`}>
          Mirage Hotel, East Legon Mirage Hotel, East Legon Lorem ipsum.
          </Text>
        </Section>

        {/** Contact*/}
        <Section title='Contact'>
          {/**Phone */}
          <View style={tw`flex-row mb-1`}>
          <Icon type="font-awesome-5" name='phone' size={20} color="gray" />
          <Text style={tw`mx-4 font-bold text-gray-800 text-base`}>
          02451234698
          </Text>
          </View>
           {/**Email */}
           <View style={tw`flex-row mb-1`}>
          <Icon type="font-awesome-5" name='envelope' size={20} color='gray' />
          <Text style={tw`mx-5 font-bold text-gray-800 text-base underline`}>
          jondoe123@gmail.com
          </Text>
          </View>
           {/**Location */}
           <View style={tw`flex-row mb-1`}>
          <Icon  type="font-awesome-5" name='map-marker-alt' size={20} color="gray" />
          <Text style={tw`mx-5 font-bold text-gray-800 text-base`}>
          Accra,Ghana
          </Text>
          </View>
        </Section>
        

      </View>
      </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  shadowWrapper:{
    //alignSelf:'center',
   // width:120,
   // height:120,
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

export default ProfileScreen;
