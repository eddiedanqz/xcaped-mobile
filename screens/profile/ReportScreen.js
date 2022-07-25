import React ,{Fragment, useEffect,useState}from 'react'
import {
    View,
    Image,Text,
    FlatList,
    SafeAreaView,
    TouchableOpacity,Platform
  } from "react-native";
  import {Icon,} from "react-native-elements";
  import tw from "tailwind-react-native-classnames";
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  import TopHeader from "../../components/TopHeader";

const Reports = ({navigation}) => {
  return (
    <View style={tw`flex-1 bg-white mt-6`}>
            <TopHeader
        leftIcon={
          <MaterialCommunityIcons name="arrow-left" size={30} color="white"
          onPress={() => navigation.goBack()} />
        }
        title='Engagements'
      />
      <View style={tw`p-4`}>
          <Text style={tw`text-lg font-bold`}>Engagements</Text>
          <View style={tw`flex-row p-3 mt-4 justify-center`}>
          {/**Reactions % */}
          <View style={tw`items-center m-4`}>
            <View style={[tw`rounded-full shadow-xl p-1`,{backgroundColor:'#fdcc97'}]}>
          <Image
          style={tw`w-16 h-16`}
          source={require("../../assets/cool.png")}
        />
            </View>
          <Text style={tw`text-base font-bold`}>100%</Text>
        </View>
        
        {/**Saved */}
        <View style={tw`items-center m-4`}>
            <View style={[tw`rounded-full shadow-xl p-1`,{backgroundColor:'#fdcc97'}]}>
          <Image
          style={tw`w-16 h-16`}
          source={require("../../assets/love.png")}
        />
            </View>
          <Text style={tw`text-base font-bold`}>100%</Text>
        </View>
    
          </View>
          {/**Description */}
          <Text style={tw`text-base text-center text-gray-600 my-1`}>
            These results are based on the data we collected</Text>

          {/**Meter */}
          <View style={tw`w-full h-52 self-center my-3`}>
          {/**Indicators */}
          <View style={tw`flex-row justify-between p-2 pt-2`}>
            <View style={tw`flex-row items-center`}>
          <Icon type='font-awesome-5' name='dot-circle' color='red' size={20}/>
            <Text style={tw`text-base text-red-600`}> Negative</Text>
            </View>
            
            <View style={tw`flex-row items-center`}>
          <Icon type='font-awesome-5' name='dot-circle' color='gold' size={20}/>
            <Text style={tw`text-base text-yellow-300`}> Neutral</Text>
            </View>

            <View style={tw`flex-row items-center`}>
          <Icon type='font-awesome-5' name='dot-circle' color='green' size={20}/>
            <Text style={tw`text-base text-green-600`}> Positive</Text>
            </View>
          </View>

          {/**Image */}
            <Image
              style={tw`w-full h-full rounded`}
              source={require("../../assets/gauge-linear.png")}
            />
          </View>
      </View>
    </View>
  )
}

export default Reports