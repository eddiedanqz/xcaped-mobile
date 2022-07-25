import React from 'react'
import { StyleSheet, View,Text,TouchableOpacity } from 'react-native'

const RadioButton = ({ onPress, selected, children }) => {
    
    return (
        <View style={styles.radioButtonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.radioButtonText}>{children}</Text>
      </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    radioButtonContainer: {
      flex:1,
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
        alignSelf:'stretch',
        padding:6
      },
      radioButton: {
        height: 20,
        width: 20,
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E6E6E6",
        alignItems: "center",
        justifyContent: "center"
      },
      radioButtonIcon: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: "cornflowerblue"
      },
      radioButtonText: {
        fontSize: 16,
        marginLeft: 16
      }
  });

  
export default RadioButton
