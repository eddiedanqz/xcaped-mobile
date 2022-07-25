import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator  } from '@react-navigation/stack';
import { set } from 'react-native-reanimated';

import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/auth/LoginScreen'
import SignUpScreen from './screens/auth/SignUpScreen';
import LoaderScreen from './screens/LoaderScreen';
import { AuthContext } from './context/AuthContext';
import  BottomNavScreen  from './screens/BottomNavScreen';
import SettingsScreen from './screens/settings/SettingsScreen'
import CreateScreen from './screens/event/CreateScreen';
import EditProfileScreen from './screens/profile/EditProfileScreen'
import SearchScreen from './screens/search/SearchScreen'
import EventScreen from './screens/event/EventScreen'
import MyEventScreen from './screens/profile/MyEventScreen'
import ReportScreen from './screens/profile/ReportScreen'
import SavedScreen from './screens/profile/SavedScreen'


const Stack = createStackNavigator()
const NavStack = createStackNavigator()

export default function App() {
const [isLoading,setLoading] = React.useState(true)
const [userToken, setuserToken] = React.useState('token')
React.useEffect(() =>{
setTimeout(() => {
  setLoading(false)
}, 1000);
},[])

const authContext =React.useMemo(()=> { 
  return {
    signIn: ()=> {
      setLoading(false)
      setuserToken('token')
    },
    signOut:  ()=> {
      setLoading(false)
      setuserToken()
    },
    signUp: ()=> {
      setLoading(false)
      setuserToken('token')
    }
  }
},[])

if (isLoading) {
  return <LoaderScreen/>
}

const BottomNav = () => (
  <BottomNavScreen/>
)

  return (
    <AuthContext.Provider value={authContext} >
    <NavigationContainer>
    <View style={styles.container}>
      {userToken ? (
       <NavStack.Navigator screenOptions={{ headerShown:false}}>
        <NavStack.Screen name="Main" component={BottomNav}/>
        <NavStack.Screen name="Create" component={CreateScreen}/>
        <NavStack.Screen name="Edit Profile" component={EditProfileScreen}/>
        <NavStack.Screen name="Settings" component={SettingsScreen}/>
        <NavStack.Screen name="Search" component={SearchScreen}/>
        <NavStack.Screen name="Event" component={EventScreen}/>
        <NavStack.Screen name="My Events" component={MyEventScreen}/>
        <NavStack.Screen name="Reports" component={ReportScreen}/>
        <NavStack.Screen name="Saved" component={SavedScreen}/>
      </NavStack.Navigator>
      ):(
        <Stack.Navigator screenOptions={{headerShown:false }}>
        <Stack.Screen name="LogIn" component={LoginScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
      </Stack.Navigator>
      )}
      <StatusBar style="auto" />
    </View>
    </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:"row",
  },
});
