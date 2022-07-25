import React from 'react'
import {Icon} from "react-native-elements";
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';

import ProfileScreen from './profile/ProfileScreen';
import HomeScreen from './HomeScreen';
import ListingScreen from './event/ListingScreen';
import NotificationScreen from './notification/NotificationScreen'
import CreateScreen from './event/CreateScreen'
import SearchScreen from './search/SearchScreen';

const Tabs = createBottomTabNavigator();

const BottomNavScreen = () => {
    return (
        <Tabs.Navigator screenOptions={{ headerShown:false,tabBarActiveTintColor:'#fdcc97',
        tabBarInactiveTintColor:'#151618'}} initialRouteName='Explore'>
           {/*  <Tabs.Screen name="Home" component={HomeScreen}  options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}/>*/}
               <Tabs.Screen name="Explore" component={ListingScreen}   options={{
                  tabBarIcon: ({ color, size }) => (
                   <Icon type='font-awesome-5' name="compass" color={color} size={20} />
                 ),
                 tabBarLabel:() => {return null}
               }}/>
             <Tabs.Screen name="Search" component={SearchScreen}  options={{
               tabBarIcon: ({ color, size }) => (
                 <Icon type='font-awesome-5' name="search" color={color} size={20} />
                 ),
                 tabBarLabel:() => {return null}
                }}/>
            <Tabs.Screen name="Notification" component={NotificationScreen}   options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon type='font-awesome-5' name="bell" color={color} size={20} />
                ),
                tabBarBadge: 3,
                tabBarBadgeStyle:{ color:'#fdcc97',backgroundColor:'#151618' },
                tabBarLabel:() => {return null}
              }}/>
        <Tabs.Screen name="Profile" component={ProfileScreen}   options={{
              tabBarIcon: ({ color, size }) => (
                <Icon type='font-awesome-5' name="user" color={color} size={20} />
              ),
              tabBarLabel:() => {return null}
            }}/>
           </Tabs.Navigator>
        
    )
}

export default BottomNavScreen
