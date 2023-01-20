import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

import { AuthProvider } from "./context/AuthContext";
import { FilterProvider } from "./context/filterContext";

import Routes from "./Routes";

// const Stack = createStackNavigator()
// const NavStack = createStackNavigator()

export default function App() {
  // const [isLoading,setLoading] = useState(false)
  // const {user} = useContext(AuthContext)

  // React.useEffect(() =>{
  // setTimeout(() => {
  //   setLoading(false)
  // }, 1000);

  // console.log(user)
  // },[])

  // if (isLoading) {
  //   return <LoaderScreen/>
  // }

  // const BottomNav = () => (
  //   <BottomNavScreen/>
  // )

  return (
    <AuthProvider>
      <FilterProvider>
        <Routes />
      </FilterProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
});
