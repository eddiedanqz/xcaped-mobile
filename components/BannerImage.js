import React, { Fragment, useState } from "react"
import { StyleSheet, TouchableOpacity, Text, Image,View,Input } from "react-native"
import tw from "tailwind-react-native-classnames";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const uploadIcon = require("../assets/banner-placeholder.png")
//const { uri: uploadIconUrl } = RNIImage.resolveAssetSource(uploadIcon)

const InputField = ({ url, onPress }) => {
  const [name, setName] = useState("")
  const [focus, setFocus] = useState(false)

  return (
    <Fragment>
     
      <TouchableOpacity activeOpacity={0.7} 
      style={tw`justify-center items-center bg-gray-200 rounded-t-lg w-full h-32 overflow-hidden`} onPress={onPress}>
        {url ? (
          <Image source={url} resizeMode="cover" />
        ) : (
          // Don't use this, instead use an svg icon please.
          <Image source={uploadIcon} resizeMode="contain" />
        )}
      </TouchableOpacity>
         {/*Label*/}
      <View style={tw`mt-1 flex-row items-center`}>
      <MaterialCommunityIcons name="image" size={26} color="gray" />
      <Text style={tw`mx-1 text-lg text-gray-600`}>Upload Image</Text>
      </View>
    </Fragment>
  )
}

export default InputField

const BG_COLOR = "rgba(240, 242, 245, 1)"
const BORDER_COLOR = "rgba(22, 42, 76, 0.7)"
const FOCUSED_COLOR = "rgba(55, 107, 251, 1)"
const ICON_SIZE = 50

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    backgroundColor: BG_COLOR,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 120,
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
  },
  focused: { borderBottomColor: FOCUSED_COLOR, borderBottomWidth: 3 },
  input: {
    backgroundColor: BG_COLOR,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 2,
    height: 32,
    paddingHorizontal: 5,
    width: "100%",
  },
  uploadIcon: { height: ICON_SIZE, width: ICON_SIZE },
})