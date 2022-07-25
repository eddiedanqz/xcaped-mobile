import React from 'react'
import { View,TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from "../../context/AuthContext";

const EditProfileScreen = ({ navigation }) => {
    const { signOut } = React.useContext(AuthContext);

    return (
        <View>
             <View style={{ flexDirection: "row", height: 50,marginBottom:10 }}>
        <TouchableOpacity
          style={{ justifyContent: "center", width: 50, paddingLeft: 5 }}
        >
          <View  style={{ width: 30, height: 30 }}>
           <MaterialCommunityIcons name="arrow-left" size={25} onPress={() => navigation.goBack()} />
          </View>
        </TouchableOpacity>
        
      </View>


        </View>
    )
}

export default EditProfileScreen;
