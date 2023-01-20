import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,Dimensions,
  Text,
} from "react-native";
import { Icon, BottomSheet, ListItem } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { LineChart } from 'react-native-chart-kit'


import { BASEURL } from "@env";
import SalesCard from "../../components/cards/SalesCard";

const ReportScreen = ({navigation,route}) => {
  const [data, setData] = useState([])
  const [sold, setSold] = useState(0)
  const [gross, setGross] = useState(0)
  const [net, setNet] = useState(0)
  const [amount, setAmount] = useState(0)
  const [paidOut, setPaid] = useState(0)
  const [labelPoints, setLabels] = useState([])
  const [points, setPoints] = useState([])


  const formatDate = (dateString) => {
    let dateObj = new Date(dateString)
    let month = dateObj.toLocaleString('default', { month: 'short' })
    let day = dateObj.getUTCDate()
    let newDate = month+" "+day
  
    return newDate
    }

  const setDataPoints = (data) => {
 let pointX = data.map((ele) => formatDate(ele.created_at));
      
  let pointY = data.map((ele) =>  ele.total);
    
    setLabels(pointX)
    setPoints(pointY)
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
        .get(`${BASEURL}/api/report/${id}`, config)
        .then((res) => {
          // console.log(res.data)
           setData(res.data.orders);
           setDataPoints(res.data.orders)
          setSold(res.data.sold);
          setNet(res.data.net);
          setAmount(res.data.net);
          setGross(res.data.sum);
          
          console.log(points,labelPoints)
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  useEffect(() => {
    let {id} = route.params
  
    getData(id)
    
  }, [])

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
     {/*Header*/}
     <View style={tw`overflow-hidden mt-2`}>
      <View
        style={[
          tw`flex-row w-full h-16 items-center justify-between px-4`,
        ]}
      >

        <TouchableOpacity
          style={tw`justify-center`}
          onPress={() => navigation.goBack()}
        >
          <Icon
            type="feather"
            name="arrow-left"
            size={20}
            color="#151618"
          />
        </TouchableOpacity>
        <Text style={tw`text-lg font-semibold`}>Dashboard</Text>
        <View
          style={tw`flex-row justify-center items-center`}
          onPress={() => navigation.goBack()}
        >
   
        </View>
      </View>
    </View>
    
    {/**Chart */}
    <View style={tw`flex mt-4 p-2 shadow-md`}>
      <Text style={tw`text-center text-gray-500`}>Total number of orders</Text>
    <LineChart
            data={{
              labels: labelPoints,
              datasets: [
                {
                  data: (points.length > 0) ? points : [0,0]
                }
              ]
            }}
            width= {Dimensions.get('window').width - 15}
            height={230}
            withInnerLines={false}         
            bezier={true}
            chartConfig={{
              decimalPlaces:0,
              backgroundGradientFrom: 'darkblue',
              backgroundGradientTo: 'blue',
              // fillShadowGradientFrom: "darkblue",
              // fillShadowGradientFromOpacity: 0.2,
              // fillShadowGradientTo: "blue",
              // backgroundGradientToOpacity: 0.5,
              color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`
            }}
          />
    </View>
    {/**Container */}
    <View style={tw`flex p-2`}>
    <View style={tw`flex-row items-center justify-center`}>
    {/**Card */}
      <SalesCard label='Ticket Sold' icon='users' amount={sold}
      labelStyle={tw`text-white`} containerStyle ={{ backgroundColor:'#ff8552' }} iconStyle='white' amountStyle={tw`text-white`}/>
      <SalesCard label='Commission' icon='info' amount='5%'
       labelStyle={tw`text-white`} containerStyle ={tw`bg-blue-400`} iconStyle='white' amountStyle={tw`text-white`}/>
    </View>
    <View style={tw`flex-row items-center justify-center`}>
    {/**Card */}
      <SalesCard label='Gross Revenue' icon='info' amount={'GHS '+gross}
       labelStyle={tw`text-white`} containerStyle ={tw`bg-green-400`} iconStyle='white' amountStyle={tw`text-white`}/>
      <SalesCard label='Net Revenue' icon='info' amount={'GHS '+net}
       labelStyle={tw`text-white`} containerStyle ={tw`bg-purple-400`} iconStyle='white' amountStyle={tw`text-white`}/>
    </View>
    <View style={tw`flex-row items-center justify-center`}>
    {/**Card */}
      <SalesCard label='Amount Expected' icon='info' amount={'GHS '+amount}
       labelStyle={tw`text-white`} containerStyle ={tw`bg-yellow-400`} iconStyle='white' amountStyle={tw`text-white`}/>
    </View>
    </View>

    </SafeAreaView>
  )
}

export default ReportScreen