import React from "react";
import { StyleSheet, Text, View ,Image} from "react-native";
import { Button } from "react-native-elements";

import appStyles from '../style/appStyle'

const WelcomeScreen = () => {
  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
      <Image style={styles.logo} source={require('../assets/logo.png')}/>
      <Text style={styles.brandText}>Xcaped</Text>
      </View>
      <Button title="Log In" type="outline" containerStyle={styles.button}/>
      <Button title="Sign Up" type="solid" containerStyle={[styles.button,appStyles.mb_max]}/>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems:"center"
  },
  button: {
    width:"100%",
    marginBottom:5,
    padding:5,
  },
  logo:{
  width:100,
  height:100,
  marginBottom:5
  },
  logoContainer:{
    position:"absolute",
  top:200,
  alignItems:"center",
  },
  brandText:{
   textTransform:"uppercase",
  },
  primary:{
   backgroundColor:"#F16346",
   color:"#fff"
  },
 
});

export default WelcomeScreen;
