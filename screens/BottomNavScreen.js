import React, { useContext } from "react";
import { Icon } from "@rneui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./HomeScreen";
import ExploreScreen from "./event/ExploreScreen";
import NotificationScreen from "./notification/NotificationScreen";
import TicketScreen from "./ticket/TicketScreen";
import SearchScreen from "./search/SearchScreen";
import ListingScreen from "./event/ListingScreen";
import EventCategoryScreen from "./event/EventCategoryScreen";
import FollowEventScreen from "./event/FollowEventScreen";
import CalendarScreen from "./event/CalendarScreen";
import ProfileScreen from "./profile/ProfileScreen";
import UserProfileScreen from "./profile/UserProfileScreen";
import MyEventScreen from "./profile/MyEventScreen";

import { AuthContext } from "../context/AuthContext";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Listing" component={ListingScreen} />
      <Stack.Screen name="Follow Event" component={FollowEventScreen} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="User Profile" component={UserProfileScreen} />
      <Stack.Screen name="My Events" component={MyEventScreen} />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Event Category" component={EventCategoryScreen} />
    </Stack.Navigator>
  );
};

const BottomNavScreen = () => {
  const { count } = useContext(AuthContext);

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ff8552",
        tabBarInactiveTintColor: "#151618",
      }}
      initialRouteName="Explore"
    >
      {/*  <Tabs.Screen name="Home" component={HomeScreen}  options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}/>*/}
      <Tabs.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              type="font-awesome-5"
              name="compass"
              color={color}
              size={20}
            />
          ),
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tabs.Screen
        name="Find"
        component={SearchStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon type="font-awesome-5" name="search" color={color} size={20} />
          ),
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tabs.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon type="font-awesome-5" name="bell" color={color} size={20} />
          ),
          tabBarBadge: count > 0 ? count : null,
          tabBarBadgeStyle: { color: "white", backgroundColor: "#151618" },
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tabs.Screen
        name="Tickets"
        component={TicketScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon type="font-awesome" name="ticket" color={color} size={20} />
          ),
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tabs.Screen
        name="Account"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon type="font-awesome-5" name="user" color={color} size={20} />
          ),
          tabBarLabel: () => {
            return null;
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomNavScreen;
