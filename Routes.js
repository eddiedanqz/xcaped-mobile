import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import tw from "twrnc";

import WelcomeScreen from "./screens/WelcomeScreen";
import { AuthContext } from "./context/AuthContext";
import LoginScreen from "./screens/auth/LoginScreen";
import SignUpScreen from "./screens/auth/SignUpScreen";
import PasswordResetScreen from "./screens/auth/PasswordResetScreen";
import BottomNavScreen from "./screens/BottomNavScreen";
import SettingsScreen from "./screens/settings/SettingsScreen";
import PasswordScreen from "./screens/settings/PasswordScreen";
import AboutScreen from "./screens/settings/AboutScreen";
import HelpScreen from "./screens/settings/HelpScreen";
import CreateScreen from "./screens/event/CreateScreen";
import EditEventScreen from "./screens/event/EditEventScreen";
import EditProfileScreen from "./screens/profile/EditProfileScreen";
import SearchScreen from "./screens/search/SearchScreen";
import EventScreen from "./screens/event/EventScreen";
import SavedScreen from "./screens/profile/SavedScreen";
import OrderTicketScreen from "./screens/ticket/OrderTicketScreen";
import EditTicketScreen from "./screens/ticket/EditTicketScreen";
import ShowTicketScreen from "./screens/ticket/ShowTicketScreen";
import OrderCompleteScreen from "./screens/ticket/OrderCompleteScreen";
import AttendeeScreen from "./screens/report/AttendeeScreen";
import ReportScreen from "./screens/report/ReportScreen";
import QrScannerScreen from "./screens/report/QrScannerScreen";
import AddPlaceScreen from "./screens/place/AddScreen";
import EditPlaceScreen from "./screens/place/EditPlaceScreen";
import PlaceScreen from "./screens/place/PlaceScreen";
import InvitationScreen from "./screens/profile/InvitationScreen";
import FansScreen from "./screens/profile/FansScreen";
import { COLORS } from "./constants/theme";

const Stack = createStackNavigator();
const NavStack = createStackNavigator();

export default function App() {
  const { authUser, setUser } = useContext(AuthContext);

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      let parsed = JSON.parse(result);
      console.log(parsed);
      setUser(parsed);
    }
  }

  useEffect(() => {
    getValueFor("user");
  }, []);

  const BottomNav = () => <BottomNavScreen />;

  return (
    <NavigationContainer>
      <View style={styles.container}>
        {authUser ? (
          <NavStack.Navigator screenOptions={{ headerShown: false }}>
            <NavStack.Screen name="Main" component={BottomNav} />
            <NavStack.Screen name="Edit Event" component={EditEventScreen} />
            <NavStack.Screen
              name="Edit Profile"
              component={EditProfileScreen}
            />
            <NavStack.Screen name="Settings" component={SettingsScreen} />
            <NavStack.Screen name="Password" component={PasswordScreen} />
            <NavStack.Screen name="About" component={AboutScreen} />
            <NavStack.Screen name="Help" component={HelpScreen} />
            <NavStack.Screen name="Create" component={CreateScreen} />
            <NavStack.Screen name="Event" component={EventScreen} />
            <NavStack.Screen name="Saved" component={SavedScreen} />
            {/* <NavStack.Screen name="Add Ticket" component={AddTicketScreen}/> */}
            <NavStack.Screen name="Edit Ticket" component={EditTicketScreen} />
            <NavStack.Screen name="Show Ticket" component={ShowTicketScreen} />
            <NavStack.Screen
              name="Order Tickets"
              component={OrderTicketScreen}
            />
            <NavStack.Screen name="Order" component={OrderCompleteScreen} />
            <NavStack.Screen name="Report" component={ReportScreen} />
            <NavStack.Screen name="Attendee" component={AttendeeScreen} />
            <NavStack.Screen name="Scanner" component={QrScannerScreen} />
            <NavStack.Screen name="Add Place" component={AddPlaceScreen} />
            <NavStack.Screen name="Edit Place" component={EditPlaceScreen} />
            <NavStack.Screen name="Place" component={PlaceScreen} />
            <NavStack.Screen name="Invitations" component={InvitationScreen} />
            <NavStack.Screen name="Fans" component={FansScreen} />
          </NavStack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LogIn" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen
              name="PasswordReset"
              component={PasswordResetScreen}
            />
          </Stack.Navigator>
        )}
        <StatusBar style="dark" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
});
