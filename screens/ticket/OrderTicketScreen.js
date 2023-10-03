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
import * as SecureStore from "expo-secure-store";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import axios from "axios";

import TextButton from "../../components/buttons/TextButton";
import { BASEURL } from "../../config/config";

const OrderTicketScreen = ({ navigation, route }) => {
  const [ticketData, setTicket] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [order, setOrder] = useState({});
  const [disabled, setDisabled] = useState(false);
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);

  function editOrder(action, ticketId, eventId, price) {
    let orderList = orderItems.slice();
    let item = orderList.filter((a) => a.ticketId == ticketId);
    if (action == "+") {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          ticketId: ticketId,
          eventId: eventId,
          qty: 1,
          price: price,
          total: price,
        };
        orderList.push(newItem);
      }

      console.log(item);
      setOrderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty * price;
        }
      }

      setOrderItems(orderList);
    }
  }

  //
  function getOrderQty(ticketId) {
    let orderItem = orderItems.filter((a) => a.ticketId == ticketId);
    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }

    return 0;
  }

  //
  function getBasketItemCount() {
    let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);

    return itemCount;
  }

  function sumOrder() {
    let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);
    return total.toFixed(2);
  }

  const submitOrder = () => {
    // console.log(orderItems)
    setDisabled(true);
    let formData = new FormData();
    formData.append("tickets", JSON.stringify(orderItems));

    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Authorization: `Bearer ${parsed}`,
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(`${BASEURL}/api/order`, formData, config)
        .then((res) => {
          console.log(res.data.order);
          setOrder(res.data.order);
          //  navigation.navigate('Order', {orderItems})
          paystackWebViewRef.current.startTransaction();
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setDisabled(false);
        });
    });
  };

  const updateOrder = () => {
    SecureStore.getItemAsync("mytoken").then((token) => {
      let parsed = JSON.parse(token);
      const config = {
        headers: {
          Authorization: `Bearer ${parsed}`,
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(
          `${BASEURL}/api/update/order/${order.id}`,
          { id: order.id },
          config
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    });
  };

  const renderTickets = () => {
    const renderItem = ({ item }) => (
      <View style={tw`flex-row bg-white w-full shadow rounded-lg h-28 my-3`}>
        <View
          style={[
            tw`bg-gray-100 absolute rounded-full p-2.5`,
            { left: 132.3, top: -12 },
          ]}
        ></View>
        <View
          style={[
            tw`bg-gray-100 absolute rounded-full p-2.5`,
            { left: 132.3, bottom: -12 },
          ]}
        ></View>
        {/**left */}
        <View
          style={[
            tw`justify-center items-center w-5/12 border-r border-gray-100`,
          ]}
        >
          <Text style={tw`text-base text-gray-600 `}>{item.title}</Text>
          <Text
            style={[
              tw`text-xl text-gray-700 font-bold m-2`,
              { color: "#ff8552" },
            ]}
          >
            ${item.price}
          </Text>
          <Text style={tw`text-sm text-gray-500`}>/</Text>
        </View>
        {/**right */}
        <View style={tw`justify-center items-center w-7/12`}>
          <Text style={tw`text-base m-2`}>Available: {item.capacity}</Text>
          {/**Day tickects */}
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text>{item.available_from}</Text>
            <Text style={tw`mx-2`}>-</Text>
            <Text>{item.available_to}</Text>
          </View>

          {/**Add Order */}
          <View style={tw`flex-row justify-between items-center mt-2`}>
            <TouchableOpacity
              style={tw`mr-5`}
              onPress={() => editOrder("-", item.id, item.eventId, item.price)}
            >
              <Icon type="feather" name="minus" size={20} color="#ff8552" />
            </TouchableOpacity>
            <Text style={tw`text-base mx-5`}>{getOrderQty(item.id)}</Text>
            <TouchableOpacity
              style={tw`ml-5`}
              onPress={() => editOrder("+", item.id, item.eventId, item.price)}
            >
              <Icon type="feather" name="plus" size={20} color="#ff8552" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );

    return (
      <FlatList
        data={ticketData}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={tw`mx-2 p-2`}
      />
    );
  };

  useEffect(() => {
    let { tickets } = route.params;
    setTicket(tickets);
    // console.log(tickets)
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/*Header*/}
      <View style={tw`overflow-hidden mt-2`}>
        <View
          style={[
            tw`flex-row w-full h-16 items-center justify-between px-4`,
            {
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 1,
            },
          ]}
        >
          <TouchableOpacity
            style={tw`justify-center`}
            onPress={() => navigation.goBack()}
          >
            <Icon type="feather" name="arrow-left" size={20} color="#151618" />
          </TouchableOpacity>
          <Text style={tw`text-lg font-semibold`}>Tickets</Text>
          <View
            style={tw`flex-row justify-center items-center`}
            onPress={() => navigation.goBack()}
          >
            <Icon type="font-awesome" name="ticket" size={20} color="#151618" />
            <Text style={tw`ml-1`}>{getBasketItemCount()}</Text>
          </View>
        </View>
      </View>

      <View style={tw`flex-1 mb-3 bg-gray-100`}>
        {/**Tickets */}
        {renderTickets()}
      </View>
      {/*Order*/}
      <View style={tw`flex-row bg-white w-full bottom-0`}>
        {/**left */}
        <View style={[tw`justify-center items-center w-5/12`]}>
          <Text style={tw`text-2xl font-bold`}>${sumOrder()}</Text>
        </View>
        {/**right */}
        <View style={tw`justify-center items-center w-7/12`}>
          <Paystack
            paystackKey="pk_test_ea56daae18789f1cdf60d1e3efeddd18a412b9d8"
            billingEmail={order.user_email}
            amount={order.grand_total}
            onCancel={(e) => {
              // handle response here
              console.log(e);
              setDisabled(false);
            }}
            onSuccess={(res) => {
              // handle response here
              console.log(res);
              if (res.status === "success") {
                updateOrder();
              }
            }}
            ref={paystackWebViewRef}
            currency="GHS"
            channels={["card", "bank", "mobile_money"]}
          />
          <TextButton
            label="Buy"
            buttonContainerStyle={[
              tw`rounded-lg p-3 w-48`,
              { backgroundColor: "#ff8552" },
            ]}
            onPress={() => submitOrder()}
            disabled={disabled}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderTicketScreen;
