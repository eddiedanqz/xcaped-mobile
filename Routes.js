import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React,{useContext,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator  } from '@react-navigation/stack';
import { set } from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/auth/LoginScreen'
import SignUpScreen from './screens/auth/SignUpScreen';
import LoaderScreen from './screens/LoaderScreen';
import {AuthContext} from './context/AuthContext';
import  BottomNavScreen  from './screens/BottomNavScreen';
import SettingsScreen from './screens/settings/SettingsScreen'
import CreateScreen from './screens/event/CreateScreen';
import EditEventScreen from './screens/event/EditEventScreen';
import EditProfileScreen from './screens/profile/EditProfileScreen'
import SearchScreen from './screens/search/SearchScreen'
import EventScreen from './screens/event/EventScreen'
import MyEventScreen from './screens/profile/MyEventScreen'
import SavedScreen from './screens/profile/SavedScreen'
import OrderTicketScreen from './screens/ticket/OrderTicketScreen'
import AddTicketScreen from './screens/ticket/AddTicketScreen'
import EditTicketScreen from './screens/ticket/EditTicketScreen'
import ShowTicketScreen from './screens/ticket/ShowTicketScreen'
import OrderCompleteScreen from './screens/ticket/OrderCompleteScreen'
import AttendeeScreen from './screens/report/AttendeeScreen'
import ReportScreen from './screens/report/ReportScreen'
import QrScannerScreen from './screens/report/QrScannerScreen'



const Stack = createStackNavigator()
const NavStack = createStackNavigator()

export default function App() {
const [isLoading,setLoading] = useState(false)
const {authUser} = useContext(AuthContext)

React.useEffect(() =>{
setTimeout(() => {
  setLoading(false)
}, 1000);

///console.log(authUser)
},[])

if (isLoading) {
  return <LoaderScreen/>
}

const BottomNav = () => (
  <BottomNavScreen/>
)

  return (
    <NavigationContainer>
      
    <View style={styles.container}>
      {authUser ? (
       <NavStack.Navigator screenOptions={{ headerShown:false}}>
        <NavStack.Screen name="Main" component={BottomNav}/>
        <NavStack.Screen name="Edit Event" component={EditEventScreen}/>
        <NavStack.Screen name="Edit Profile" component={EditProfileScreen}/>
        <NavStack.Screen name="Settings" component={SettingsScreen}/>
        {/* <NavStack.Screen name="Search" component={SearchScreen}/> */}
        <NavStack.Screen name="Event" component={EventScreen}/>
        <NavStack.Screen name="My Events" component={MyEventScreen}/>
        <NavStack.Screen name="Saved" component={SavedScreen}/>
        {/* <NavStack.Screen name="Add Ticket" component={AddTicketScreen}/> */}
        <NavStack.Screen name="Edit Ticket" component={EditTicketScreen}/>
        <NavStack.Screen name="Show Ticket" component={ShowTicketScreen}/>
        <NavStack.Screen name="Order Tickets" component={OrderTicketScreen}/>
        <NavStack.Screen name="Order" component={OrderCompleteScreen}/>
        <NavStack.Screen name="Report" component={ReportScreen}/>
        <NavStack.Screen name="Attendee" component={AttendeeScreen}/>
        <NavStack.Screen name="Scanner" component={QrScannerScreen}/>
      </NavStack.Navigator>
      ):(
        <Stack.Navigator screenOptions={{headerShown:false }}>
        <Stack.Screen name="LogIn" component={LoginScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
      </Stack.Navigator>
      )}
      <StatusBar style="dark"/>
    </View>
    
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:"row",
  },
});
